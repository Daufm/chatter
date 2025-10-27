import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MessageCircle, Users, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageCircle className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to ChatApp
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with friends and colleagues in real-time. Experience seamless messaging with modern features and intuitive design.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Zap className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Real-time Messaging</h3>
            <p className="text-gray-600">
              Instant message delivery with real-time updates and notifications.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Group Chats</h3>
            <p className="text-gray-600">
              Create and manage group conversations with multiple participants.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MessageCircle className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Modern UI</h3>
            <p className="text-gray-600">
              Clean, responsive design that works perfectly on all devices.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start chatting?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who are already connected.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;