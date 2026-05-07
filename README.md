# 💬 Real-Time Chat Application

A full-stack real-time chat application built using **React, Node.js, Express, MongoDB, and Socket.io**.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login)
- 💬 Real-time messaging using Socket.io
- 👥 User list (chat with any user)
- 🕒 Message timestamps
- 💾 Persistent chat history (MongoDB)
- ✍️ Typing indicator
- 🟢 Online status indicator (UI)
- 🎨 Modern responsive UI

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- Socket.io-client
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT Authentication
- bcrypt (password hashing)

---

## 📦 Project Structure

realtime-chat-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── App.jsx
│
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/John27052001/realtime-chat-system.git

cd realtime-chat-system

---

### 2. Backend setup

cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=mongodb+srv://chatuser:ChatApp123@cluster0.mn9dkgm.mongodb.net/realtime-chat

Run backend:

npm run dev

---

### 3. Frontend setup

cd frontend
npm install
npm run dev

---

## 🌐 Environment Variables

Frontend (.env):

VITE_API_URL=http://localhost:5000

Backend:

MONGO_URI=mongodb+srv://chatuser:ChatApp123@cluster0.mn9dkgm.mongodb.net/realtime-chat

---

## 🔑 Demo Credentials

Email: john@example.com  
Password: 123456  

Email: test2@example.com  
Password: 123456  

---

## 🚀 Deployment

Backend: Render  
Frontend: Vercel  

---

## 👨‍💻 Author

Megha John Babu
https://github.com/John27052001

