import express from 'express';
import Message from '../models/Message.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get messages for a conversation
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { recipient, group, limit = 50, offset = 0 } = req.query;

    let query = {};
    if (recipient) {
      // Private messages between two users
      query = {
        $or: [
          { sender: req.user._id, recipient },
          { sender: recipient, recipient: req.user._id },
        ],
      };
    } else if (group) {
      // Group messages
      query = { group };
      // TODO: Check if user is member of the group
    } else {
      return res.status(400).json({ message: 'recipient or group parameter required' });
    }

    const messages = await Message.find(query)
      .populate('sender', 'username avatar')
      .populate('reactions.user', 'username')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    res.json(messages.reverse()); // Reverse to show oldest first
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send a message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { recipient, group, content, messageType, fileUrl, fileName } = req.body;

    if (!content && !fileUrl) {
      return res.status(400).json({ message: 'Message content or file required' });
    }

    const message = new Message({
      sender: req.user._id,
      recipient,
      group,
      content,
      messageType: messageType || 'text',
      fileUrl,
      fileName,
    });

    await message.save();
    await message.populate('sender', 'username avatar');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add reaction to message
router.post('/:id/reactions', authenticateToken, async (req, res) => {
  try {
    const { emoji } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user already reacted with this emoji
    const existingReaction = message.reactions.find(
      reaction => reaction.user.toString() === req.user._id.toString() && reaction.emoji === emoji
    );

    if (existingReaction) {
      // Remove reaction
      message.reactions = message.reactions.filter(
        reaction => !(reaction.user.toString() === req.user._id.toString() && reaction.emoji === emoji)
      );
    } else {
      // Add reaction
      message.reactions.push({
        user: req.user._id,
        emoji,
      });
    }

    await message.save();
    await message.populate('reactions.user', 'username');

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Pin/unpin message
router.post('/:id/pin', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // TODO: Check permissions (group admin or message sender)

    message.isPinned = !message.isPinned;
    if (message.isPinned) {
      message.pinnedBy = req.user._id;
      message.pinnedAt = new Date();
    } else {
      message.pinnedBy = undefined;
      message.pinnedAt = undefined;
    }

    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;