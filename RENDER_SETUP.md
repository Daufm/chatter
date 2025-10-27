# Render Environment Variables Setup

## Required Environment Variables for Render

Go to your Render dashboard → Your Backend Service → Environment

Add these environment variables:

### Required Variables

```
MONGODB_URI=mongodb+srv://fuadmohammed:fuadkoko@cluster0.ueqsxsa.mongodb.net/chatsapp?retryWrites=true&w=majority
JWT_SECRET=chatapp-production-jwt-secret-2025-very-secure-key-change-this
FRONTEND_URL=https://chatter-nine-tau.vercel.app
PRODUCTION_FRONTEND_URL=https://chatter-nine-tau.vercel.app
PORT=10000
```

### Optional Variables (with defaults)

```
NODE_ENV=production
```

## Steps to Add Environment Variables on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your backend service**
3. **Go to "Environment" tab**
4. **Click "Add Environment Variable"**
5. **Add each variable one by one**

## Verify Your MongoDB Atlas Connection

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Go to "Network Access"**
3. **Make sure "0.0.0.0/0" is allowed (Allow access from anywhere)**
4. **Go to "Database Access"**
5. **Make sure your user has read/write permissions**

## Test the Connection

After setting environment variables, **trigger a new deploy** on Render to apply the changes.

The logs should show:

```
Connected to MongoDB
Server running on port 10000
```

Instead of the localhost connection error.
