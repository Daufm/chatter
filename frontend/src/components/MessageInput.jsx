import React, { useState, useRef } from 'react';
import { Paperclip, X } from 'lucide-react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/files`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const fileData = await response.json();
        setSelectedFile(fileData);
      } else {
        alert('File upload failed');
      }
    } catch {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && !selectedFile) return;

    const message = {
      id: Date.now(),
      text: trimmed,
      sender: 'You',
      timestamp: new Date().toLocaleString(),
      file: selectedFile,
    };
    onSend && onSend(message);
    setText('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white">
      {selectedFile && (
        <div className="mb-2 flex items-center space-x-2 p-2 bg-gray-100 rounded">
          <span className="text-sm">{selectedFile.originalName}</span>
          <button onClick={removeFile} className="text-red-500 hover:text-red-700">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <Paperclip size={20} />
        </button>
        <textarea
          className="flex-1 resize-none rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows={2}
          placeholder="Type a message... (Enter to send, Shift+Enter for newline)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
