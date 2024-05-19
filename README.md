# Simple Chat Application

This is a simple chat application built with React, TypeScript, and Socket.IO. It allows users to register, login, and send messages in real-time. The backend is built with Node.js and Express, with MongoDB as the database.

## Features

- User registration and login
- Real-time messaging with Socket.IO
- Display of messages with different styles for the current user and other users
- Authentication with JSON Web Tokens (JWT)
- Responsive design

## Demo Proview

https://github.com/eksant/webchat-socket/assets/32409305/d9773f50-b3be-413b-a88f-3d7099ed49cb



## Technologies Used

- **Frontend:**
  - React
  - TypeScript
  - Ant Design
  - Socket.IO-client

- **Backend:**
  - Node.js
  - Express
  - Socket.IO
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)
  - Axios

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running

### Installation

1. Clone the repository:

```sh
$ git clone git@github.com:eksant/webchat-socket.git
$ cd webchat-socket
```

2. Create a .env file in the backend directory and add the following environment variables:

```sh
PORT=5000
MONGO_URI=mongodb://mongo:27017/chat
JWT_SECRET=your_jwt_secret
```

3. Build and start the application using Docker Compose:

```sh
$ docker-compose up --build
```

## Running the Application

Open your browser and navigate to http://localhost:3000.

## Folder Structure

webchat-socket\
├── backend\
│   ├── src\
│   │   ├── controllers\
│   │   ├── middleware\
│   │   ├── models\
│   │   ├── routes\
│   │   ├── types\
│   │   ├── utils\
│   │   └── index.ts\
│   └── Dockerfile\
├── frontend\
│   ├── src\
│   │   ├── assets\
│   │   ├── components\
│   │   ├── layouts\
│   │   ├── pages\
│   │   ├── types\
│   │   └── utils\
│   └── Dockerfile\
├── docker-compose.yml\
└── README.md

## API Endpoints

### Auth

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user and return a JWT

### Messages

- GET /api/chat/messages - Get all messages (requires JWT)
- POST /api/chat/message - Send a new message (requires JWT)

## Usage

1. Register a new user by navigating to the registration page.
2. Login with the registered user credentials.
3. Start chatting in real-time with other users.

## Acknowledgements
- [React](https://reactjs.org/)
- [Socket.IO](https://socket.io/)
- [Ant Design](https://ant.design/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
