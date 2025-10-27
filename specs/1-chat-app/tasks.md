# Tasks: Web-based Chat Application

**Input**: Design documents from `/specs/1-chat-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are mandatory per constitution. Include unit and integration tests for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan (backend/, frontend/, etc.)
- [x] T002 Initialize backend project with Node.js + Express + Socket.io + Mongoose (backend/package.json, server.js)
- [ ] T003 [P] Frontend setup: Initialize React + Vite + TailwindCSS + ShadCN UI (frontend/package.json, vite.config.js)
- [ ] T004 [P] Configure linting and formatting: ESLint + Prettier for both frontend and backend
- [x] T005 [P] Configure test runners: Jest + React Testing Library for frontend, Jest + Supertest for backend
- [ ] T006 [P] Add CI pipeline skeleton that runs lint, format, and test jobs on PRs (.github/workflows/ci.yml)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Setup MongoDB connection and Mongoose schemas (backend/src/models/)
- [x] T008 [P] Implement JWT authentication middleware (backend/src/middleware/auth.js)
- [x] T009 [P] Setup Socket.io server with JWT auth (backend/src/services/socket.js)
- [x] T010 [P] Configure environment variables and config management (backend/.env, config/)
- [x] T011 [P] Setup error handling and logging infrastructure (backend/src/utils/logger.js)
- [x] T012 [P] Create base User model with validation (backend/src/models/User.js)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Contacts and Groups in Sidebar (Priority: P1) 🎯 MVP

**Goal**: Display sidebar with user contacts and groups for navigation

**Independent Test**: Render sidebar component with mock data and verify contacts/groups are displayed and clickable

### Tests for User Story 1 ⚠️

- [ ] T013 [P] [US1] Unit test for sidebar component in frontend/tests/unit/Sidebar.test.js
- [ ] T014 [P] [US1] Integration test for sidebar navigation in frontend/tests/integration/SidebarNavigation.test.js

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create Group model (backend/src/models/Group.js) - Goal: Define group schema, Effort: S, Dependencies: T012
- [x] T016 [US1] Implement API endpoints for contacts and groups (backend/src/routes/users.js, groups.js) - Goal: GET /api/users/contacts, GET /api/groups, Effort: M, Dependencies: T008, T015
- [x] T017 [US1] Create sidebar React component (frontend/src/components/Sidebar.jsx) - Goal: Display contacts and groups list, Effort: M, Dependencies: None
- [x] T018 [US1] Add API service for fetching contacts/groups (frontend/src/services/api.js) - Goal: HTTP client for sidebar data, Effort: S, Dependencies: T017
- [x] T019 [US1] Integrate sidebar into main app layout (frontend/src/App.jsx) - Goal: Add sidebar to app structure, Effort: S, Dependencies: T017

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Chat Messages with Timestamps (Priority: P1)

**Goal**: Display chat messages in main window with timestamps

**Independent Test**: Render chat window with mock messages and verify timestamps and message display

### Tests for User Story 2 ⚠️

- [ ] T020 [P] [US2] Unit test for chat window component in frontend/tests/unit/ChatWindow.test.js
- [ ] T021 [P] [US2] Integration test for message display in frontend/tests/integration/MessageDisplay.test.js

### Implementation for User Story 2

- [x] T022 [P] [US2] Create Message model (backend/src/models/Message.js) - Goal: Define message schema with timestamps, Effort: S, Dependencies: T012, T015
- [x] T023 [US2] Implement API endpoint for fetching messages (backend/src/routes/messages.js) - Goal: GET /api/messages with recipient filter, Effort: M, Dependencies: T008, T022
- [x] T024 [US2] Create chat window React component (frontend/src/components/ChatWindow.jsx) - Goal: Display messages with timestamps, Effort: M, Dependencies: None
- [x] T025 [US2] Add API service for messages (frontend/src/services/api.js) - Goal: Extend API client for messages, Effort: S, Dependencies: T024
- [x] T026 [US2] Integrate chat window with sidebar selection (frontend/src/App.jsx) - Goal: Switch chat on sidebar click, Effort: S, Dependencies: T019, T024

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Send Text Messages (Priority: P1)

**Goal**: Allow sending text messages in chat

**Independent Test**: Type message in input bar and verify it appears in chat window

### Tests for User Story 3 ⚠️

- [x] T027 [P] [US3] Unit test for message input component in frontend/tests/unit/MessageInput.test.js
- [x] T028 [P] [US3] Integration test for sending messages in frontend/tests/integration/SendMessage.test.js

### Implementation for User Story 3

- [x] T029 [US3] Implement API endpoint for sending messages (backend/src/routes/messages.js) - Goal: POST /api/messages, Effort: M, Dependencies: T023, T009
  - [x] T030 [US3] Create message input React component (frontend/src/components/MessageInput.jsx) - Goal: Text input with send button, Effort: M, Dependencies: None
- [x] T031 [US3] Add real-time message updates via Socket.io (backend/src/services/socket.js, frontend/src/services/socket.js) - Goal: Emit/receive new messages, Effort: M, Dependencies: T029
  - [x] T032 [US3] Integrate message input into chat window (frontend/src/components/ChatWindow.jsx) - Goal: Add input to chat UI, Effort: S, Dependencies: T024, T030

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should work independently

---

## Phase 6: User Story 4 - Send Image and File Messages (Priority: P2)

**Goal**: Support sending images and files in messages

**Independent Test**: Upload image/file and verify it appears as message with preview/download

### Tests for User Story 4 ⚠️

- [ ] T033 [P] [US4] Unit test for file upload component in frontend/tests/unit/FileUpload.test.js
- [ ] T034 [P] [US4] Integration test for file messaging in frontend/tests/integration/FileMessage.test.js

### Implementation for User Story 4

- [x] T035 [P] [US4] Create File model (backend/src/models/File.js) - Goal: Define file schema, Effort: S, Dependencies: T012
- [x] T036 [US4] Implement file upload endpoint (backend/src/routes/files.js) - Goal: POST /api/files with Multer, Effort: M, Dependencies: T008, T035
- [x] T037 [US4] Extend message input for file uploads (frontend/src/components/MessageInput.jsx) - Goal: Add file picker, Effort: M, Dependencies: T030
- [x] T038 [US4] Add file display in chat window (frontend/src/components/ChatWindow.jsx) - Goal: Show images/previews, Effort: S, Dependencies: T024

**Checkpoint**: User Story 4 complete

---

## Phase 7: User Story 5 - Add Reactions to Messages (Priority: P2)

**Goal**: Allow adding emoji reactions to messages

**Independent Test**: Click reaction on message and verify it appears

### Tests for User Story 5 ⚠️

- [ ] T039 [P] [US5] Unit test for reaction component in frontend/tests/unit/Reaction.test.js
- [ ] T040 [P] [US5] Integration test for adding reactions in frontend/tests/integration/AddReaction.test.js

### Implementation for User Story 5

- [ ] T041 [P] [US5] Create Reaction model (backend/src/models/Reaction.js) - Goal: Define reaction schema, Effort: S, Dependencies: T022
- [ ] T042 [US5] Implement reaction endpoints (backend/src/routes/messages.js) - Goal: POST /api/messages/:id/reactions, Effort: M, Dependencies: T029, T041
- [ ] T043 [US5] Add reaction UI to messages (frontend/src/components/Message.jsx) - Goal: Reaction buttons and display, Effort: M, Dependencies: T024
- [ ] T044 [US5] Update message model to include reactions (backend/src/models/Message.js) - Goal: Add reactions array, Effort: S, Dependencies: T022

**Checkpoint**: User Story 5 complete

---

## Phase 8: User Story 6 - Use @Mentions (Priority: P2)

**Goal**: Support @mentioning users in messages

**Independent Test**: Type @username and verify mention is highlighted

### Tests for User Story 6 ⚠️

- [ ] T045 [P] [US6] Unit test for mention functionality in frontend/tests/unit/Mention.test.js
- [ ] T046 [P] [US6] Integration test for mentions in frontend/tests/integration/Mention.test.js

### Implementation for User Story 6

- [ ] T047 [US6] Extend message input for mentions (frontend/src/components/MessageInput.jsx) - Goal: Autocomplete @users, Effort: M, Dependencies: T030
- [ ] T048 [US6] Add mention highlighting in messages (frontend/src/components/Message.jsx) - Goal: Highlight @mentions, Effort: S, Dependencies: T024
- [ ] T049 [US6] Store mentions in message (backend/src/models/Message.js) - Goal: Track mentioned users, Effort: S, Dependencies: T022

**Checkpoint**: User Story 6 complete

---

## Phase 9: User Story 7 - Pin Messages (Priority: P3)

**Goal**: Allow pinning important messages

**Independent Test**: Pin message and verify it appears in pinned section

### Tests for User Story 7 ⚠️

- [ ] T050 [P] [US7] Unit test for pin functionality in frontend/tests/unit/Pin.test.js
- [ ] T051 [P] [US7] Integration test for pinning messages in frontend/tests/integration/PinMessage.test.js

### Implementation for User Story 7

- [ ] T052 [US7] Implement pin endpoint (backend/src/routes/messages.js) - Goal: POST /api/messages/:id/pin, Effort: M, Dependencies: T029
- [ ] T053 [US7] Add pin UI to messages (frontend/src/components/Message.jsx) - Goal: Pin button and pinned display, Effort: M, Dependencies: T024
- [ ] T054 [US7] Create pinned messages section (frontend/src/components/PinnedMessages.jsx) - Goal: Show pinned messages, Effort: S, Dependencies: T053

**Checkpoint**: User Story 7 complete

---

## Phase 10: User Story 8 - Responsive Layout (Priority: P3)

**Goal**: Ensure app works on mobile and desktop

**Independent Test**: Resize browser and verify layout adapts

### Tests for User Story 8 ⚠️

- [ ] T055 [P] [US8] Unit test for responsive components in frontend/tests/unit/Responsive.test.js
- [ ] T056 [P] [US8] Integration test for mobile/desktop layout in frontend/tests/integration/Responsive.test.js

### Implementation for User Story 8

- [ ] T057 [US8] Update sidebar for mobile (frontend/src/components/Sidebar.jsx) - Goal: Collapsible on mobile, Effort: M, Dependencies: T017
- [ ] T058 [US8] Make chat window responsive (frontend/src/components/ChatWindow.jsx) - Goal: Adapt to screen sizes, Effort: M, Dependencies: T024
- [ ] T059 [US8] Configure Tailwind responsive breakpoints (frontend/tailwind.config.js) - Goal: Mobile-first design, Effort: S, Dependencies: None

**Checkpoint**: All user stories complete

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T060 [P] Documentation updates in README.md
- [ ] T061 Code cleanup and refactoring across frontend/backend
- [ ] T062 Performance optimization (lazy loading, caching)
- [ ] T063 [P] Additional unit tests for edge cases
- [ ] T064 Security hardening (input validation, rate limiting)
- [ ] T065 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-10)**: All depend on Foundational phase completion
  - P1 stories (US1-US3) can proceed in parallel
  - P2 stories (US4-US6) depend on P1 completion
  - P3 stories (US7-US8) depend on P2 completion
- **Polish (Phase 11)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: No dependencies
- **US2 (P1)**: No dependencies
- **US3 (P1)**: No dependencies
- **US4 (P2)**: Depends on US3 (sending messages)
- **US5 (P2)**: Depends on US2 (message display)
- **US6 (P2)**: Depends on US3 (message sending)
- **US7 (P3)**: Depends on US2 (message display)
- **US8 (P3)**: Depends on US1, US2 (layout components)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel
- P1 stories can run in parallel
- Within each story, tests and models can run in parallel

---

## Implementation Strategy

### MVP First (P1 Stories Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phases 3-5: P1 stories
4. **STOP and VALIDATE**: Test P1 independently
5. Deploy/demo MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add P1 stories → Test independently → Deploy
3. Add P2 stories → Test independently → Deploy
4. Add P3 stories → Test independently → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. P1: Developer A: US1, B: US2, C: US3
3. P2: Developer A: US4, B: US5, C: US6
4. P3: Developer A: US7, B: US8

---

## Notes

- Each task includes goal, effort (S/M/L), dependencies
- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Tests mandatory per constitution
- Commit after each task or logical group</content>
  <parameter name="filePath">c:\Users\Fuad\Documents\chat-app\specs\1-chat-app\tasks.md
