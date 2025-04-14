// server.js
import express from "express";
import { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import authRoutes from "./routes/auth.js";
import meetingRoutes from "./routes/meetingRoutes.js"
import { startMeeting, joinMeeting } from "./controllers/meetingController.js";  // Import meeting controller

// Load env variables
dotenv.config();

// Connect to database
connectdb();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api", authRoutes); // Existing auth routes
app.use("/api", meetingRoutes);


// New routes for starting and joining meetings
app.post("/api/start-meeting", startMeeting);  // Route to start a meeting
app.post("/api/join-meeting", joinMeeting);    // Route to join a meeting

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`.green);
    console.log("Mongo URL:", process.env.MONGO_URL);
});
