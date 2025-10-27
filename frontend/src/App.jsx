import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

function ChatApp() {
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar onSelectRecipient={setSelectedRecipient} />
      <div className="flex-1">
        {selectedRecipient ? (
          <ChatWindow recipient={selectedRecipient} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <p className="text-lg text-gray-600">Select a contact or group to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route
        path="/chat"
        element={isAuthenticated ? <ChatApp /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
