import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeSocket } from './src/services/socket.js';
import userRoutes from './src/routes/users.js';
import groupRoutes from './src/routes/groups.js';
import messageRoutes from './src/routes/messages.js';
import fileRoutes from './src/routes/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      process.env.PRODUCTION_FRONTEND_URL,
      'https://chatter-nine-tau.vercel.app',
      'https://chatter-*.vercel.app' // Allow any chatter vercel app
    ].filter(Boolean),
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Serve static files from uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/files', fileRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Chat App Backend');
});

// Initialize Socket.io
initializeSocket(io);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on connection failure
  });