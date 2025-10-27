# Quickstart: Chat App

## Prerequisites

- Node.js 18+
- MongoDB running locally or connection string
- npm or yarn

## Setup

1. Clone the repo.
2. cd chat-app
3. npm install (for both frontend and backend)
4. Set environment variables: MONGODB_URI, PORT=3000
5. npm run dev (starts both frontend on 5173, backend on 3000)

## Usage

1. Open http://localhost:5173
2. Register/login (assume auth implemented)
3. Select a contact or group from sidebar
4. Type message in input bar, add emoji or upload file
5. Send and see real-time updates

## Testing

- npm test (frontend unit/integration)
- For backend: npm run test:backend (Jest + Supertest)

## Deployment

- Build frontend: npm run build
- Start backend: npm start
- For production, use PM2 or Docker
