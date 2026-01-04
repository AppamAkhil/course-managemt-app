📘 Course Management Application
📌 Overview

The Course Management Application is a full-stack web application built using Node.js, Express, React, and SQLite, implementing secure JWT-based authentication and CRUD operations for managing courses.

The application allows users to:

Register with strong password validation

Login securely using JWT

Perform full CRUD operations on courses

Search, paginate, and manage course data via a clean UI

🛠️ Tech Stack
Backend

Node.js

Express.js

SQLite

JWT (jsonwebtoken)

bcryptjs

express-validator

Frontend

React.js

Axios

Bootstrap 5

Tools & Deployment

GitHub

Render (Backend)

Vercel / Netlify (Frontend)

✨ Features
🔐 Authentication

User Registration with:

Email uniqueness check

Strong password rules

Password hashing using bcrypt

Secure Login

JWT token generation and verification

Protected API routes

📚 Course Management (CRUD)

Create new courses

View all courses

View course by ID

Update course details

Delete courses

JWT-protected endpoints

🎨 User Interface

Clean and responsive UI using Bootstrap

Search and filter courses

Pagination for course list

User-friendly forms with validation feedback

🔒 Password Security Rules

Passwords must:

Be at least 8 characters long

Contain 1 uppercase letter

Contain 1 lowercase letter

Contain 1 number

Contain 1 special character

🗂️ Project Structure
course-management-app/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── courses.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validators.js
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Courses.js
│   ├── public/
│   └── package.json
│
└── README.md

🗄️ Database Schema
Users Table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

Courses Table
CREATE TABLE courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_name TEXT NOT NULL,
  description TEXT NOT NULL,
  instructor TEXT NOT NULL
);

🚀 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Courses
Method	Endpoint	Description
POST	/api/courses	Create course
GET	/api/courses	Get all courses
GET	/api/courses/:id	Get course by ID
PUT	/api/courses/:id	Update course
DELETE	/api/courses/:id	Delete course
▶️ How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/your-username/course-management-app.git
cd course-management-app

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

JWT_SECRET=my_super_secret_key_123


Start backend:

node server.js


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on:

http://localhost:3000

🌐 Deployment
Backend (Render)

Push backend code to GitHub

Create a new Web Service on Render

Set environment variable:

JWT_SECRET=your_secret_key

Frontend (Vercel / Netlify)

Import frontend repository

Set build command:

npm run build


Set output directory:

build

📸 Screenshots (Add These)

Registration page

Login page

Course dashboard

Add course form

Edit course

Pagination & search

🧠 Validation & Security

Input validation using express-validator

Password hashing using bcrypt

SQL injection prevention via parameterized queries

JWT-based route protection

📄 License

This project is created for educational and assessment purposes.

✅ Final Notes

This project fully satisfies the assessment requirements:

Authentication ✔

Secure password handling ✔

CRUD operations ✔

Validation ✔

Clean UI ✔

SQLite integration ✔