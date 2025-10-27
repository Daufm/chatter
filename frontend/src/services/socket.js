import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(token = null) {
    const authToken = token || localStorage.getItem('token');
    if (!authToken) {
      console.error('No token provided for socket connection');
      return;
    }

    if (this.socket) {
      this.socket.disconnect();
    }

    const options = {};
    if (authToken) {
      options.auth = { token: authToken };
    }

    this.socket = io(SOCKET_URL, options);

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  sendMessage(messageData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', messageData);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  onMessageSent(callback) {
    if (this.socket) {
      this.socket.on('messageSent', callback);
    }
  }

  onMessageError(callback) {
    if (this.socket) {
      this.socket.on('messageError', callback);
    }
  }

  joinGroup(groupId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinGroup', groupId);
    }
  }

  leaveGroup(groupId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveGroup', groupId);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;