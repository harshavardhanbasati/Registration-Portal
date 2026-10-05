# Registration Portal

A responsive user registration portal built with React, Vite, Tailwind CSS, Formik, Yup, and FastAPI.

The project demonstrates reusable React components, form handling, client-side validation, API integration, and simple JSON-based data storage.

## Features

- Responsive registration UI
- Reusable React components
- Formik form handling
- Yup validation
- Password confirmation validation
- FastAPI backend
- REST API integration using `fetch`
- CORS configuration
- JSON-based user storage
- Tailwind CSS styling
- Client-side error handling

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Formik
- Yup

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- JSON

## Project Structure

```text
registration-portal/
│
├── backend/
│   ├── main.py
│   └── users.json
│
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## Installation

### 1. Clone the project

```bash
git clone <your-repository-url>
cd registration-portal
```

### 2. Install frontend dependencies

```bash
npm install
```

If dependencies are not already installed:

```bash
npm install formik yup
npm install tailwindcss @tailwindcss/vite
```

### 3. Install backend dependencies

```bash
cd backend
pip install fastapi uvicorn
```

## Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Running the Application

### Start the backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## API

### Register User

```http
POST /register
```

Request body:

```json
{
  "name": "Harsha",
  "email": "harsha@gmail.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

Successful response:

```json
{
  "success": true,
  "message": "Registration successful"
}
```

## Data Storage

For simplicity, registered users are stored in:

```text
backend/users.json
```

Example:

```json
[
  {
    "name": "Harsha",
    "email": "harsha@gmail.com",
    "password": "123456"
  }
]
```

## Form Validation

The registration form validates:

- Name is required
- Name must contain at least 3 characters
- Email must be valid
- Password is required
- Password must contain at least 6 characters
- Confirm password must match the password

## Application Flow

```text
User
  ↓
Registration Form
  ↓
Formik
  ↓
Yup Validation
  ↓
Fetch API
  ↓
FastAPI
  ↓
users.json
  ↓
API Response
  ↓
React UI
```

## Reusable Components

### InputField

Reusable input component for registration fields.

### Button

Reusable button component for form actions.

### Navbar

Reusable navigation/header component.

## Important Note

This project uses a JSON file and plaintext passwords for learning purposes only.

It is **not suitable for production**.

For a production-ready registration system, use:

- PostgreSQL or another database
- Password hashing with bcrypt/Argon2
- JWT or session-based authentication
- Proper authorization
- Environment variables for secrets
- HTTPS
- Backend validation
- Rate limiting

## Future Improvements

- Password hashing
- Login system
- JWT authentication
- PostgreSQL database
- User profile page
- Protected routes
- Email verification
- Forgot password functionality
- Better error handling

## Author

**Harsha Vardhan Basati**

B.Tech Computer Science & Engineering
