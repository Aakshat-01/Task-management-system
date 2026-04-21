# Productivity Task Manager

A full-stack productivity web application built with Next.js, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Authentication**: Secure JWT-based login and signup.
- **Task Management**: Create, edit, and delete tasks.
- **Priorities & Deadlines**: Set task priority (Low, Medium, High) and select a deadline.
- **Overdue Indicator**: Visual reminder for overdue tasks.
- **Visual Dashboard**: View task statistics (Total, In Progress, Completed).
- **Filtering**: Filter tasks by status and priority.
- **Responsive UI**: Clean, modern, dark-mode design optimized for mobile and desktop.

## Folder Structure

\`\`\`
task-manager/
├── client/          # Next.js Frontend
├── server/          # Node.js + Express Backend
└── database/        # Mongoose Config and Models
\`\`\`

## Getting Started

### Prerequisites

- Node.js (v18+)
- Local MongoDB running on \`mongodb://127.0.0.1:27017/task-manager\`

### Setup Backend

1. Navigate to the \`server\` directory:
   \`\`\`bash
   cd server
   \`\`\`
2. Install dependencies (if not already installed):
   \`\`\`bash
   npm install
   \`\`\`
3. Start the dev server:
   \`\`\`bash
   npm run dev
   \`\`\`
   *(Note: ensure you have set up a \`dev\` script using nodemon in \`package.json\`, e.g., \`"dev": "nodemon index.js"\`)*

### Setup Frontend

1. Navigate to the \`client\` directory:
   \`\`\`bash
   cd client
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Next.js development server:
   \`\`\`bash
   npm run dev
   \`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack
- Frontend: Next.js (App Router), Tailwind CSS V4, Lucide Icons, Axios.
- Backend: Node.js, Express, Mongoose, Built-in JWT Auth, BcryptJS.
