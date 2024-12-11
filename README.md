# Project Title: Nexus

## Overview
This project is a feature-rich blogging platform designed to provide a seamless experience for both public users and registered members. Built using React for the frontend and Node.js with Express for the backend, the application incorporates modern technologies and tools to deliver a robust and user-friendly system.

---

## Features Implemented

### Home Page
- Designed with a responsive header including the website logo and navigation links (Home, Blog, About, Contact).

### Blog Page
- Added a form for creating blog posts with fields for title, content, and an optional image upload functionality.

### Login Page
- Developed a dedicated login page with a form for users to enter credentials.
- Included basic validation for secure and user-friendly login.

### Registration
- Implemented a tabbed registration form divided into:
  - Personal Information
  - Contact Information
  - Account Information
  - Additional Details

### About Section
- Created an 'About Us' section with a brief description of the website and information about the group members.

### Contact Section
- Developed a contact form with fields for name, email, subject, and message, allowing users to send inquiries or feedback.

---

## Back-End Utilization
- The backend is built with **Node.js** and **Express**, enabling efficient handling of data and API requests.
- Server-side logic integrates seamlessly with the frontend, providing a robust and scalable architecture.

---

## Additional npm Packages Used
To support the implementation of the project features, the following npm packages were utilized:
1. **formspree**: Simplified handling of contact form submissions and email functionality.
2. **body-parser**: Assisted in parsing incoming request bodies in middleware.
3. **buffer**: Handled binary data in APIs, especially for image uploads.
4. **express**: Served as the framework for building the backend, handling routing and middleware.
5. **jodit-react**: Provided a rich text editor for creating and editing blog posts.
6. **multer**: Facilitated file uploads for optional blog images.
7. **mysql2**: Enabled interaction with the MySQL database for user data and blog posts.
8. **axios**: Used for making HTTP requests to the backend for data fetching and form submissions.
9. **vite**: Ensured fast and efficient development for the frontend with its modern tooling.

---

## Vite Setup
This template provides a minimal setup to get React working in **Vite** with HMR (Hot Module Replacement) and some ESLint rules.

### Official Plugins:
1. **@vitejs/plugin-react**: Uses Babel for Fast Refresh.
2. **@vitejs/plugin-react-swc**: Uses SWC for Fast Refresh.

---

Acknowledgments
This project was made possible by the learnings from Professional Domain Course 20 (ReactJS), where we covered:

Foundation of React
Introducing JSX
React Components
React Data Flow
React Events
React Router
React Forms
Fetching and Caching Data through the use of RESTful APIs

Contributors
Marcus Jeremy Cariño
Don Henessy David
Mark Jerome Santos
Feel free to suggest improvements or contribute to the project!
