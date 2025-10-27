# Quickstart: Web-based Chat Application

## Prerequisites

- Node.js 18+
- MongoDB running locally or connection string
- npm or yarn

## Setup

1. Clone the repo and checkout branch 1-chat-app.
2. cd chat-app
3. npm install in both frontend/ and backend/
4. Set environment variables: MONGODB_URI, JWT_SECRET, PORT=3000
5. Start backend: cd backend && npm run dev
6. Start frontend: cd frontend && npm run dev
7. Open http://localhost:5173

## Usage

1. Register/login at the app.
2. View sidebar with contacts/groups.
3. Click a contact/group to open chat.
4. Send text messages, add reactions, @mention, pin messages.
5. Upload images/files.

## Testing

- Frontend: npm test (Jest + RTL)
- Backend: npm run test (Jest + Supertest)

## Deployment

- Frontend: Deploy to Vercel with build command 'npm run build'
- Backend: Deploy to Render with start command 'node server.js'
