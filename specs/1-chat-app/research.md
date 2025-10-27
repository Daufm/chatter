# Research: Web-based Chat Application

## Scale/Scope Assumptions

**Decision**: Target 100 concurrent users, 10,000 messages/day initially. Scale vertically first, plan for horizontal with Redis sessions and MongoDB sharding.

**Rationale**: Realistic for MVP; 500ms p95 feasible with this scale on standard hosting.

**Alternatives considered**: Start with microservices (overkill), use PostgreSQL (better ACID but complex for chat).

## JWT Authentication with Socket.io

**Decision**: Use JWT in cookies for session auth, validate on Socket.io connection with middleware.

**Rationale**: Secure, stateless; Socket.io supports custom auth middleware.

**Alternatives considered**: Token in query params (less secure), session-based with Redis (more complex).

## Deploying React + Vite to Vercel

**Decision**: Use Vercel CLI for deployment, configure build command as 'npm run build', output to 'dist'.

**Rationale**: Vercel optimized for React/Vite, automatic HTTPS, CDN.

**Alternatives considered**: Netlify (similar), manual build/deploy (more work).

## Deploying Node.js + Express + Socket.io to Render

**Decision**: Use Render's Web Service for backend, set start command to 'node server.js', enable persistent connections.

**Rationale**: Render supports Node.js, auto-scaling, free tier for small apps.

**Alternatives considered**: Heroku (similar), AWS EC2 (more config).

## MongoDB with Mongoose for Chat Data

**Decision**: Use Mongoose for schemas, index on timestamps/sender for queries, use aggregation for chat history.

**Rationale**: Mongoose provides validation, MongoDB suits flexible chat data.

**Alternatives considered**: Raw MongoDB driver (boilerplate), PostgreSQL with Prisma (stricter schema).

## Local File Storage with S3 Migration

**Decision**: Store files in local 'uploads/' folder, use Multer for handling, plan migration script to S3.

**Rationale**: Simple for MVP, easy to migrate later with AWS SDK.

**Alternatives considered**: Direct S3 from start (more setup), Cloudinary (external service).
