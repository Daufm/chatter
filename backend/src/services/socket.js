import jwt from 'jsonwebtoken';

const connectedUsers = new Map(); // userId -> socketId

export const initializeSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    // Store user connection
    connectedUsers.set(socket.userId, socket.id);

    // Join user's room for private messages
    socket.join(socket.userId);

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      try {
        // Save message to database (assuming it's already saved in the API)
        // For real-time, we can emit the message data

        // Emit to recipient for private messages
        if (data.recipient) {
          io.to(data.recipient).emit('newMessage', data);
        }

        // Emit to group for group messages
        if (data.group) {
          socket.to(data.group).emit('newMessage', data);
        }

        // Also emit back to sender for consistency
        socket.emit('messageSent', data);
      } catch (error) {
        socket.emit('messageError', { error: 'Failed to send message' });
      }
    });

    // Handle joining groups
    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
    });

    // Handle leaving groups
    socket.on('leaveGroup', (groupId) => {
      socket.leave(groupId);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.userId);
      connectedUsers.delete(socket.userId);
    });
  });

  return io;
};

export const getConnectedUsers = () => {
  return Array.from(connectedUsers.keys());
};

export const isUserOnline = (userId) => {
  return connectedUsers.has(userId);
};