import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [users, setUsers] = useState([]);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1500);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userId && socketRef.current) {
      socketRef.current.emit("join", userId);
    }
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/users`);
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const signup = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });

      alert("Account created. Please login.");
      setIsSignup(false);
      setUsername("");
      setEmail("");
      setPassword("");
      fetchUsers();
    } catch (error) {
      alert("Signup failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (!socketRef.current || socketRef.current.disconnected) {
        socketRef.current = io(API_URL);

        socketRef.current.on("receiveMessage", (msg) => {
          setMessages((prev) => [...prev, msg]);
        });

        socketRef.current.on("typing", () => {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 1500);
        });
      }

      setCurrentUser(res.data.user);
      setUserId(res.data.user._id);
      setEmail("");
      setPassword("");
      fetchUsers();
    } catch (error) {
      alert("Login failed");
    }
  };

  const logout = () => {
    socketRef.current?.disconnect();

    setCurrentUser(null);
    setUserId("");
    setReceiverId("");
    setMessages([]);
    setText("");
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!receiverId) {
      alert("Please select a user to chat with");
      return;
    }

    if (!text.trim()) return;

    const res = await axios.post(`${API_URL}/api/messages/send`, {
      sender: userId,
      receiver: receiverId,
      text,
    });

    socketRef.current?.emit("sendMessage", {
      sender: userId,
      receiver: receiverId,
      text,
      createdAt: res.data.createdAt,
    });

    setMessages((prev) => [...prev, res.data]);
    setText("");
  };

  if (!currentUser) {
    return (
      <div className="chat-page">
        <div className="chat-card" style={{ height: "480px", width: "420px" }}>
          <div className="chat-header">
            <h2>{isSignup ? "Create Account" : "Login"}</h2>
          </div>

          <div
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {isSignup && (
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                }}
              />
            )}

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
              }}
            />

            <button
              type="button"
              onClick={isSignup ? signup : login}
              style={{
                padding: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              style={{
                padding: "10px",
                background: "transparent",
                color: "#2563eb",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {isSignup
                ? "Already have an account? Login"
                : "New user? Create account"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedUser = users.find((u) => u._id === receiverId);

  return (
    <div className="chat-page">
      <div className="chat-card">
        <div className="chat-header">
          <h2>Real-Time Chat</h2>
          <p>Logged in as: {currentUser.username}</p>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="id-section">
          {users
            .filter((u) => u._id !== userId)
            .map((u) => (
              <button
                type="button"
                key={u._id}
                onClick={async () => {
                  setReceiverId(u._id);

                  const res = await axios.get(
                    `${API_URL}/api/messages/${userId}/${u._id}`
                  );

                  setMessages(res.data);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: receiverId === u._id ? "#2563eb" : "white",
                  color: receiverId === u._id ? "white" : "black",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    background: "#22c55e",
                    borderRadius: "50%",
                  }}
                ></span>
                {u.username}
              </button>
            ))}
        </div>

        <div className="messages-box">
          {!receiverId && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              Select a user to start chatting
            </p>
          )}

          {receiverId && (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              Chatting with {selectedUser?.username}
            </p>
          )}

          {receiverId && messages.length === 0 && (
            <p style={{ textAlign: "center", color: "#9ca3af" }}>
              No messages yet. Start chatting 👋
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${
                msg.sender === userId ? "you" : "other"
              }`}
            >
              <div className="message-bubble">
                <div className="message-label">
                  {msg.sender === userId
                    ? "You"
                    : selectedUser?.username || "Other"}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{msg.text}</span>
                  <span
                    style={{
                      fontSize: "10px",
                      opacity: 0.6,
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <p style={{ fontSize: "12px", color: "#6b7280" }}>Typing...</p>
          )}

          <div ref={bottomRef}></div>
        </div>

        <div className="input-section">
          <input
            placeholder="Type your message..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);

              if (receiverId && socketRef.current) {
                socketRef.current.emit("typing", receiverId);
              }
            }}
          />

          <button type="button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;