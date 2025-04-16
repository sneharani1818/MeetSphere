// server.js
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; // Required to create HTTP server for both Express + Socket.IO
import { Server } from "socket.io";
import connectdb from "./config/db.js";
import authRoutes from "./routes/auth.js";
import meetingRoutes from "./routes/meetingRoutes.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectdb();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", authRoutes);
app.use("/api/meeting", meetingRoutes);

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Meetsphere app</h1>")
})

// Create HTTP server for Express + Socket.IO
const server = http.createServer(app) || 5000;

// Initialize Socket.IO on the same server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // your React app
        methods: ["GET", "POST"]
    }
});

// WebSocket state maps
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// Socket.IO handlers
io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
        console.log("peer:nego:needed", offer);
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
        console.log("peer:nego:done", ans);
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

// Start the combined server
server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
