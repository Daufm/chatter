import express from 'express';
import Group from '../models/Group.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's groups
router.get('/', authenticateToken, async (req, res) => {
  try {
    const groups = await Group.find({
      'members.user': req.user._id,
    })
      .populate('creator', 'username')
      .populate('members.user', 'username avatar')
      .sort({ updatedAt: -1 });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new group
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    const group = new Group({
      name,
      description,
      creator: req.user._id,
      members: [{
        user: req.user._id,
        role: 'admin',
      }],
      isPrivate: isPrivate || false,
    });
    await group.save();
    await group.populate('creator', 'username');
    res.status(201).json(group);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Group name already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Join a group
router.post('/:id/join', authenticateToken, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if already a member
    const isMember = group.members.some(member =>
      member.user.toString() === req.user._id.toString()
    );
    if (isMember) {
      return res.status(400).json({ message: 'Already a member' });
    }

    group.members.push({
      user: req.user._id,
      role: 'member',
    });
    await group.save();
    res.json({ message: 'Joined group successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;