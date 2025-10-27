import React, { useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import socketService from '../services/socket';
import { MessageCircle } from 'lucide-react';

const ChatWindow = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    // Clear messages when recipient changes
    setMessages([]);
    
    // Fetch messages from API
    const fetchMessages = async () => {
      if (!recipient?.id) return;
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/messages?recipient=${recipient.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const messagesData = await response.json();
          setMessages(messagesData.map(msg => ({
            id: msg._id,
            text: msg.content,
            sender: msg.sender.username,
            timestamp: new Date(msg.createdAt).toLocaleString(),
            file: msg.fileUrl ? {
              url: msg.fileUrl,
              originalName: msg.fileName,
              mimetype: msg.messageType === 'image' ? 'image/jpeg' : 'application/octet-stream', // Adjust as needed
            } : null,
          })));
        }
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [recipient]);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, recipient]);

  useEffect(() => {
    // Connect to socket on mount
    socketService.connect();

    // Listen for new messages
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, {
        id: message._id,
        text: message.content,
        sender: message.sender.username,
        timestamp: new Date(message.createdAt).toLocaleString(),
        file: message.fileUrl ? {
          url: message.fileUrl,
          originalName: message.fileName,
          mimetype: message.messageType === 'image' ? 'image/jpeg' : 'application/octet-stream',
        } : null,
      }]);
    };

    socketService.onNewMessage(handleNewMessage);

    // Cleanup on unmount
    return () => {
      socketService.off('newMessage', handleNewMessage);
      socketService.disconnect();
    };
  }, []);

  const handleSend = async (message) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          recipient: recipient?.id,
          content: message.text,
          messageType: message.file ? (message.file.mimetype.startsWith('image/') ? 'image' : 'file') : 'text',
          fileUrl: message.file?.url,
          fileName: message.file?.originalName,
        }),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        // Emit via socket
        socketService.sendMessage(sentMessage);
        // Add to local state
        setMessages((prev) => [...prev, {
          id: sentMessage._id,
          text: sentMessage.content,
          sender: 'You', // Current user
          timestamp: new Date(sentMessage.createdAt).toLocaleString(),
          file: sentMessage.fileUrl ? {
            url: sentMessage.fileUrl,
            originalName: sentMessage.fileName,
            mimetype: sentMessage.messageType === 'image' ? 'image/jpeg' : 'application/octet-stream',
          } : null,
        }]);
      } else {
        alert('Failed to send message');
      }
    } catch {
      alert('Error sending message');
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">
          {recipient?.name || 'Chat'}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col px-4">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold">{message.sender}</span>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <div className="bg-white p-2 rounded-lg shadow-sm w-full">
                {message.text && <div>{message.text}</div>}
                {message.file && (
                  <div className="mt-2">
                    {message.file.mimetype.startsWith('image/') ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${message.file.url}`}
                        alt={message.file.originalName}
                        className="max-w-full h-auto rounded"
                      />
                    ) : (
                      <a
                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}${message.file.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        📎 {message.file.originalName}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;