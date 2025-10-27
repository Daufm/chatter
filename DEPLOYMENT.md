# ChatApp Deployment Guide

## Frontend Deployment (Vercel)

### Option 1: Deploy from GitHub (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Vercel will auto-detect the React app
4. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Option 2: Deploy from CLI

```bash
npm i -g vercel
cd frontend
vercel --prod
```

## Backend Deployment (Separate Service)

Since Vercel doesn't support WebSockets well, deploy the backend separately:

### Recommended: Railway

1. Go to [Railway](https://railway.app)
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Add environment variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://fuadmohammed:fuadkoko@cluster0.ueqsxsa.mongodb.net/chatsapp?retryWrites=true&w=majority
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PRODUCTION_FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

### Alternative: Render

1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set build settings:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

## Environment Variables

### Frontend (.env.local for local development)

```
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### Backend (.env)

```
PORT=3000
MONGODB_URI=mongodb+srv://fuadmohammed:fuadkoko@cluster0.ueqsxsa.mongodb.net/chatsapp?retryWrites=true&w=majority
JWT_SECRET=your-production-jwt-secret-here
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## Post-Deployment Steps

1. Update frontend API URLs to point to deployed backend
2. Test user registration, login, messaging
3. Verify file uploads work
4. Check Socket.io real-time features

## Important Notes

- **WebSockets**: Real-time chat requires a backend that supports persistent connections
- **File Uploads**: Ensure your backend deployment supports file storage
- **CORS**: Update CORS settings for production domain
- **Security**: Use strong JWT secrets and consider HTTPS-only cookies
