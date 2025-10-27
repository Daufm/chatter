# Data Model: Web-based Chat Application

## Entities

### User

Represents a chat user.

**Attributes**:

- id: ObjectId (primary key)
- username: String (required, unique, 3-20 chars)
- email: String (required, unique, valid email)
- passwordHash: String (required, hashed)
- avatar: String (optional, URL)
- createdAt: Date (default now)
- updatedAt: Date (default now)

**Relationships**:

- Member of Groups (many-to-many)
- Sends Messages (one-to-many)
- Has Reactions (one-to-many)

**Validation Rules**:

- Username: alphanumeric + underscore
- Email: standard regex

**State Transitions**: None

### Group

Represents a chat group.

**Attributes**:

- id: ObjectId (primary key)
- name: String (required, 1-50 chars)
- members: Array of ObjectId (references User, min 2)
- createdBy: ObjectId (references User, required)
- createdAt: Date (default now)
- updatedAt: Date (default now)

**Relationships**:

- Has Members (many-to-many to User)
- Receives Messages (one-to-many to Message)

**Validation Rules**:

- Name: non-empty
- Members: at least 2

**State Transitions**: None

### Message

Represents a message.

**Attributes**:

- id: ObjectId (primary key)
- sender: ObjectId (references User, required)
- recipient: ObjectId (references User or Group, required)
- recipientType: String (enum: 'user', 'group', required)
- content: String (optional if attachments)
- attachments: Array of ObjectId (references File)
- timestamp: Date (default now)
- reactions: Array of ObjectId (references Reaction)
- pinned: Boolean (default false)

**Relationships**:

- Sent by User
- To User/Group
- Has Attachments
- Has Reactions

**Validation Rules**:

- Content or attachments required

**State Transitions**: None (immutable)

### Reaction

Represents a reaction.

**Attributes**:

- id: ObjectId (primary key)
- messageId: ObjectId (references Message, required)
- userId: ObjectId (references User, required)
- emoji: String (required, e.g., 👍)
- createdAt: Date (default now)

**Relationships**:

- Belongs to Message
- By User

**Validation Rules**:

- Unique per user per message per emoji

**State Transitions**: None

### File

Represents an uploaded file.

**Attributes**:

- id: ObjectId (primary key)
- filename: String (required)
- url: String (required, local path)
- uploadedBy: ObjectId (references User, required)
- size: Number (bytes, required)
- mimeType: String (required)
- uploadedAt: Date (default now)

**Relationships**:

- Uploaded by User
- Attached to Messages

**Validation Rules**:

- Size < 10MB
- Allowed types: images, docs

**State Transitions**: None
