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
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ └── App.jsx
│
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/John27052001/realtime-chat-system.git
cd realtime-chat-system```

### 2. Backend setup

```cd backend
npm install```

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run backend:
npm run dev

### 3. Frontend setup
```cd frontend
npm install
npm run dev```
🌐 Environment Variables
Frontend (.env in Vite)
VITE_API_URL=http://localhost:5000
Backend
MONGO_URI=your_mongodb_connection_string
🔑 Demo Credentials

You can create your own account OR use:

Email: john@example.com
Password: 123456

Email: test2@example.com
Password: 123456
🚀 Deployment
Backend: Render
Frontend: Vercel
💡 Future Improvements
Message read receipts
Online/offline real status
Image/file sharing
Notifications
Mobile responsiveness improvements
👨‍💻 Author

Megha John
GitHub: https://github.com/John27052001
