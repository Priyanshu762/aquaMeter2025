# aquaMeter

A modern web application for water meter management and monitoring.

## Features

- User authentication and authorization
- Water meter data management
- Real-time monitoring
- Data visualization
- Secure API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aquaMeter.git
   cd aquaMeter
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```

3. Set up environment variables:
   - Create the file name with `.env` in the server directory
   - Update the environment variables with your configuration:
     ```
     PORT = 5000
     DB_URI = your_mongodb_uri
     JWT_SECRET = your_jwt_secret
     GOOGLE_CLIENT_ID = your_google_client_id
     GOOGLE_CLIENT_SECRET = your_client_secret
     ```

## Running the Application

- Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the client and server concurrently.

- Start the frontend server:
   ```bash  
   npm run client
   ```
   This will start the frontend server.

- Start the backend server:
   ```bash
   npm run server
   ```
   This will start the backend server.

- Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```
```json
response:
{
    "message": "User registered successfully",
    "user": {
        "id": "67e06cc87ef99d645add24c8",
        "email": "user@example.com",
        "name": "John Doe"
    }
}
```
#### POST /api/auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
```json
response:
{
    "message": "Login successful",
    "user": {
        "id": "67e06cc87ef99d645add24c8",
        "email": "user@example.com",
        "name": "John Doe"
    }
}
```
#### GET /api/auth/logout
Logout user
```json
response:
{
    "message": "Logged out successfully"
}
```
#### GET /api/auth/me
Current User
```json
response:
{
    "_id": "67e05ec4c65a3211b1730917",
    "email": "johndoe@gmail.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2025-03-23T19:19:32.697Z",
    "__v": 0
}
```


## Project Structure

```
aquaMeter/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js/Express server
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── route/            # API routes
│   ├── utils/            # Utility functions
│   ├── .env              # Environment variables
│   └── server.js         # Main server file
├── package.json
└── README.md
```

## Technologies Used

- Frontend:
  - React
  - Vite
  - Axios
  - Modern UI libraries

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - bcrypt for password hashing

## 