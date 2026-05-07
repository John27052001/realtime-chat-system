const express = require("express");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://realtime-chat-system-blue.vercel.app",
  "https://realtime-chat-system-f1easgi4g-meghajohnbabu-6318s-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.get("/", (req, res) => {
  res.send("Real-Time Chat API is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    users[userId] = socket.id;
    console.log("User joined:", userId);
  });

  socket.on("sendMessage", ({ sender, receiver, text, createdAt }) => {
    const receiverSocketId = users[receiver];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", {
        sender,
        receiver,
        text,
        createdAt,
      });
    }
  });

  socket.on("typing", (receiver) => {
    const receiverSocketId = users[receiver];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});