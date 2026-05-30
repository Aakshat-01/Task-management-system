# Task Manager — Internship Assignment

A full-stack task management application built with Next.js, Node.js/Express, and MongoDB. Users can register, log in, and manage tasks across three workflow stages: **Todo**, **In Progress**, and **Done**.

🔗 **Live Demo:** [https://aakshat-task-management-system.netlify.app](https://aakshat-task-management-system.netlify.app)

---

## Features

- **Authentication** — Register and log in with email/password. Sessions are managed via JWT stored in browser localStorage.
- **Task Management** — Create, update, and delete tasks. Each task carries a title, optional description, deadline, priority, and stage.
- **Three-Stage Workflow** — Tasks move through Todo → In Progress → Done.
- **Dashboard** — Visual overview of pending vs. completed tasks with overdue highlighting.
- **Responsive UI** — Works across desktop and mobile viewports.
- **Loading & Error States** — All async operations show loading indicators and surface error messages to the user.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Netlify (frontend) |

---

## Project Structure

```
├── client/            # Next.js app (Frontend)
│   ├── app/           # App router pages (login, register, dashboard)
│   ├── components/    # Reusable UI components
│   └── lib/           # API client, helpers
│
├── server/            # Express API (Backend)
│   ├── routes/        # Auth and task routes
│   ├── controllers/   # Route handlers
│   └── middleware/    # JWT auth middleware
│
└── database/          # Mongoose database models & configuration
    ├── models/        # Mongoose schemas (User, Task)
    └── db.js          # MongoDB database connection
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create a `.env.local` file inside the `client` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in, returns JWT |

### Tasks *(requires Authorization header)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Fetch all tasks for the logged-in user |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task (title, stage, deadline, etc.) |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Assumptions & Tradeoffs

- **JWT over sessions** — JWTs are stateless, which makes them straightforward to implement without a session store. The tradeoff is that tokens cannot be invalidated server-side before expiry (e.g., on logout). For a production app, a token blacklist or short expiry with refresh tokens would address this.

- **No drag-and-drop** — Stage changes are handled via a dropdown/button rather than a Kanban drag-and-drop board. This kept scope manageable within the time limit while still meeting the core requirement.

- **Data per user** — All tasks are scoped to the authenticated user. There is no concept of shared tasks or teams.

- **Frontend deployed, backend optional** — The Express API is included as a bonus; the frontend is the primary deployable artifact as per the assignment requirements.

- **No email verification** — Registration accepts any valid email format without a confirmation step. Adding this would require an email service (SendGrid, Resend, etc.), which was out of scope.

---

## Known Limitations

- Tokens expire but there is no silent refresh flow — users are redirected to login when a token expires.
- No pagination on the task list; performance may degrade with very large numbers of tasks.

---

## Time Spent

Approximately 3–4 hours, in line with the expected effort for this assignment.
