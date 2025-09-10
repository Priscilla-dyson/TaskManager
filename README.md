# Task Manager Web Application

This is a Task Manager Web Application developed for the Cool Enterprises internship assessment. It allows users to sign up, log in, and manage tasks (create, edit, delete) with a responsive interface.

## Features
- **User Authentication**: Signup and login using Node.js and Passport with password hashing (bcrypt).
- **Task Management**: Create, edit, and delete tasks with title, description, status (pending/completed), and timestamps.
- **Session Handling**: Uses Redis for session management.
- **Database**: MongoDB for storing users and tasks.
- **Frontend**: Responsive interface built with TailwindCSS and EJS templates.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or via a cloud provider)
- Redis (running locally or via a cloud provider)
- Git

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <your-github-repo-link>
   cd task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your MongoDB URI, Redis host/port, and session secret.

4. **Build TailwindCSS**:
   ```bash
   npm run build:css
   ```

5. **Run the Application**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

6. **Development Mode** (with auto-restart):
   ```bash
   npm run dev
   ```

## Usage
- Visit `http://localhost:3000` to access the homepage.
- Sign up or log in to manage tasks.
- Use the dashboard to add, edit, or delete tasks.

## Notes
- Ensure MongoDB and Redis are running before starting the application.
- The application uses TailwindCSS for styling, compiled to `public/css/output.css`.
- Passwords are securely hashed using bcrypt.
- Sessions are stored in Redis for performance.

## Submission
This project is hosted on GitHub at `<your-github-repo-link>`.
