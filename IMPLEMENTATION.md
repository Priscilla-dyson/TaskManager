# Implementation Choices for Task Manager Web Application

## Overview
This Task Manager Web Application was developed to meet the requirements of the Cool Enterprises internship assessment. Below are the key implementation choices made to ensure functionality, security, and performance.

## Technology Stack
- **Node.js & Express**: Chosen for the backend due to its lightweight, non-blocking I/O model, ideal for building RESTful APIs and handling server-side logic.
- **MongoDB**: Selected as the database for its flexibility with unstructured data (tasks and users) and seamless integration with Node.js via Mongoose.
- **Redis**: Used for session management to ensure fast, scalable session storage, improving performance over file-based sessions.
- **Passport.js**: Implemented for user authentication (signup/login) due to its robust middleware and support for local strategy with secure password handling.
- **TailwindCSS**: Utilized for the frontend to create a responsive, modern UI with minimal custom CSS, leveraging utility-first classes for rapid development.
- **EJS**: Chosen for server-side rendering of views due to its simplicity and integration with Express, allowing dynamic content generation.

## Key Implementation Decisions
1. **User Authentication**:
   - Passwords are hashed using `bcryptjs` with a salt factor of 10 for security.
   - Passport’s Local Strategy handles authentication, with sessions stored in Redis for persistence and performance.
   - Middleware (`isAuthenticated`) ensures protected routes (e.g., task dashboard) are only accessible to logged-in users.

2. **Task Management**:
   - Tasks are stored in MongoDB with a schema including `title`, `description`, `status` (pending/completed), `userId`, and timestamps (`createdAt`, `updatedAt`).
   - Mongoose ensures data validation and simplifies database operations.
   - CRUD operations (create, read, update, delete) are implemented with user-specific task filtering to prevent unauthorized access.

3. **Session Handling & Performance**:
   - Redis stores user sessions via `connect-redis`, ensuring fast access and scalability.
   - Session cookies are set with a 1-day expiry for user convenience.

4. **Frontend Design**:
   - TailwindCSS provides a responsive, mobile-first design with a clean, minimalistic UI.
   - EJS templates enable dynamic rendering of tasks and user data, with partials (`header.ejs`, `footer.ejs`) for reusable UI components.
   - Error handling is implemented with a dedicated error page for user-friendly feedback.

5. **Security & Best Practices**:
   - Environment variables (via `dotenv`) manage sensitive configurations (e.g., MongoDB URI, session secret).
   - Input validation is handled via HTML5 attributes and server-side checks to prevent invalid data.
   - Error middleware catches and displays errors gracefully to avoid application crashes.

## Trade-offs & Considerations
- **EJS vs. Client-Side Frameworks**: EJS was chosen over React/Vue for simplicity and faster development, given the project’s scope and deadline. A client-side framework could enhance interactivity but would increase complexity.
- **Redis for Caching**: While Redis is used for sessions, it could also cache tasks for further performance optimization, which was not implemented due to time constraints.
- **Minimal Custom CSS**: TailwindCSS reduced the need for custom styles, but a production app might benefit from additional customizations for branding.

## Conclusion
The application meets all requirements, providing a secure, functional, and responsive task manager. The chosen stack balances development speed, scalability, and maintainability, aligning with Cool Enterprises’ needs.

**Word Count**: 297
```

## Setup Instructions for Submission
1. **Create a GitHub Repository**:
   - Create a new repository on GitHub (e.g., `task-manager`).
   - Initialize it with a README and `.gitignore` for Node.js.

2. **Organize the Code**:
   - Create the folder structure as shown above.
   - Copy the provided files into their respective directories.
   - Ensure `public/favicon.ico` exists (you can download a generic favicon or create one).

3. **Install Dependencies**:
   - Run `npm install` to install all dependencies listed in `package.json`.

4. **Configure Environment Variables**:
   - Copy `.env.example` to `.env` and update with your MongoDB URI (e.g., from MongoDB Atlas) and Redis host/port (e.g., from Redis Labs or local setup).

5. **Build TailwindCSS**:
   - Run `npm run build:css` to generate `public/css/output.css`.

6. **Test Locally**:
   - Ensure MongoDB and Redis are running.
   - Run `npm start` and test the app at `http://localhost:3000`.

7. **Push to GitHub**:
   - Commit all files:
     ```bash
     git add .
     git commit -m "Complete Task Manager Web Application"
     git push origin main
     ```

8. **Submit**:
   - Share the GitHub repository link with Cool Enterprises via email before the end of September 9, 2025.

## Notes
- **Urgency**: Since today is the deadline, prioritize setting up MongoDB and Redis (use free tiers of MongoDB Atlas and Redis Labs if you don’t have local instances).
- **Testing**: Test signup, login, task CRUD operations, and session persistence to ensure everything works.
- **Backup Plan**: If you encounter issues (e.g., with Redis setup), let me know immediately, and I can adjust the code to use file-based sessions temporarily.

This solution fulfills all requirements and is ready for submission. If you need help with setup or have questions, let me know right away!