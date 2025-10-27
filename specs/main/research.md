# Research: Chat App

## Backend Testing Framework

**Decision**: Use Jest with Supertest for backend testing. Jest for unit tests of models/services, Supertest for integration tests of API endpoints and Socket.io events.

**Rationale**: Jest is widely used in Node.js ecosystem, supports async/await, and Supertest integrates well for HTTP testing. For Socket.io, use socket.io-client in tests to simulate connections and emit events.

**Alternatives considered**: Mocha + Chai (more flexible but requires more setup), Ava (concurrent but less ecosystem support).

## Scale/Scope Assumptions

**Decision**: Target 100 concurrent users, 10,000 messages/day initially. Scale vertically first (single server), plan for horizontal scaling later with Redis for sessions and MongoDB sharding.

**Rationale**: Realistic for MVP chat app; allows simple architecture while planning for growth. Performance SLO of 500ms p95 feasible with this scale on modern hardware.

**Alternatives considered**: Start with microservices (overkill for MVP), use PostgreSQL instead of MongoDB (better for relations but more complex for chat schema).

## Frontend Best Practices

**Decision**: Use Vite for build tool, React with hooks, TailwindCSS for styling with ShadCN UI components. Structure components in /components, pages in /pages, services in /services.

**Rationale**: Vite provides fast dev server and build. Tailwind + ShadCN ensures consistent, accessible UI matching UX standards (rounded corners, shadows). React hooks for state management.

**Alternatives considered**: Create React App (slower, less modern), styled-components (more flexible but heavier), custom CSS (less maintainable).

## Database Best Practices

**Decision**: Use Mongoose for MongoDB ODM. Schema for User, Group, Message, File. Index on timestamps and sender for queries.

**Rationale**: Mongoose provides validation and middleware. MongoDB suits chat's document structure (messages with attachments). Indexes ensure fast queries for chat history.

**Alternatives considered**: Raw MongoDB driver (more boilerplate), PostgreSQL with Sequelize (better ACID but overkill for chat).

## Real-Time Messaging Patterns

**Decision**: Use Socket.io for WebSocket connections. Rooms for groups, private messages via direct emit. Handle connection/disconnection, message queuing on disconnect.

**Rationale**: Socket.io handles fallbacks and reconnection. Rooms scale for groups. Simple for MVP, extensible to Redis adapter for multi-server.

**Alternatives considered**: Raw WebSocket (more low-level, no fallbacks), Pusher or similar service (external dependency, cost).
