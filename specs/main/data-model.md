# Data Model: Chat App

## Entities

### User

Represents a chat user.

**Attributes**:

- id: ObjectId (primary key)
- username: String (required, unique, 3-20 chars)
- email: String (required, unique, valid email)
- avatar: String (optional, URL to image)
- createdAt: Date (default now)
- updatedAt: Date (default now)

**Relationships**:

- Member of Groups (many-to-many via Group.members)
- Sends Messages (one-to-many to Message.sender)

**Validation Rules**:

- Username: alphanumeric + underscore, no spaces
- Email: standard email regex

**State Transitions**: None (static entity)

### Group

Represents a chat group.

**Attributes**:

- id: ObjectId (primary key)
- name: String (required, 1-50 chars)
- members: Array of ObjectId (references User, required, min 2)
- createdBy: ObjectId (references User, required)
- createdAt: Date (default now)
- updatedAt: Date (default now)

**Relationships**:

- Has Members (many-to-many to User)
- Receives Messages (one-to-many to Message.recipient if group)

**Validation Rules**:

- Name: non-empty, no special chars except spaces
- Members: at least 2 users

**State Transitions**: None

### Message

Represents a chat message.

**Attributes**:

- id: ObjectId (primary key)
- sender: ObjectId (references User, required)
- recipient: ObjectId (references User or Group, required)
- recipientType: String (enum: 'user', 'group', required)
- content: String (optional if attachments, max 1000 chars)
- attachments: Array of ObjectId (references File, optional)
- timestamp: Date (default now)
- type: String (enum: 'text', 'file', default 'text')

**Relationships**:

- Sent by User (many-to-one to User)
- Sent to User/Group (many-to-one to User or Group)
- Has Attachments (one-to-many to File)

**Validation Rules**:

- Content or attachments required
- Timestamp not in future

**State Transitions**: None (immutable after send)

### File

Represents an uploaded file.

**Attributes**:

- id: ObjectId (primary key)
- filename: String (required)
- url: String (required, local path or S3 URL)
- uploadedBy: ObjectId (references User, required)
- uploadedAt: Date (default now)
- size: Number (bytes, required)
- mimeType: String (required)

**Relationships**:

- Uploaded by User (many-to-one to User)
- Attached to Messages (many-to-one to Message.attachments)

**Validation Rules**:

- Size < 10MB
- Allowed mime types: images, docs, etc.

**State Transitions**: None
