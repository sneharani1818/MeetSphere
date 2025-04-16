import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Meeting from "../models/Meeting.js";
import mongoose from "mongoose";
const router = express.Router();

// POST /api/start-meeting
router.post("/start-meeting", async (req, res) => {
    const { email } = req.body; // Assuming email is sent in the request body

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new meeting
        const newMeeting = new Meeting({
            host: user._id,
            attendees: [], // Initialize with an empty array or add attendees as needed
            startTime: new Date(),
            roomId: new mongoose.Types.ObjectId().toString(), // OR just use ._id after saving

        });

        await newMeeting.save();
        res.status(201).json({ message: "Meeting started successfully", roomId: newMeeting._id });
    } catch (err) {
        console.error("Start meeting error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/join-meeting
router.post("/join-meeting", async (req, res) => {
    const { roomId, email } = req.body; // Assuming roomId and email are sent in the request body

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the meeting by roomId
        const meeting = await Meeting.findById(roomId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        // Add user to the meeting attendees
        meeting.attendees.push(user._id);
        meeting.startTime = new Date(); // Update start time to current time
        await meeting.save();

        res.status(200).json({ message: "Joined meeting successfully", roomId: meeting._id });
    } catch (err) {
        console.error("Join meeting error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/meeting/:roomId 
router.get("/:roomId", async (req, res) => {
    const { roomId } = req.params; // Extract roomId from the request parameters

    try {
        // Find the meeting by roomId
        const meeting = await Meeting.findById(roomId).populate("host attendees", "firstName lastName email");
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        res.status(200).json(meeting);
    } catch (err) {
        console.error("Get meeting error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// PUT /api/meeting/:roomId 
router.put("/:roomId", async (req, res) => {
    const { roomId } = req.params; // Extract roomId from the request parameters
    const { attendees } = req.body; // Assuming attendees is sent in the request body

    try {
        // Find the meeting by roomId
        const meeting = await Meeting.findById(roomId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        // Update the attendees list
        meeting.attendees = attendees;
        await meeting.save();

        res.status(200).json({ message: "Meeting updated successfully" });
    } catch (err) {
        console.error("Update meeting error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// DELETE /api/meeting/:roomId
router.delete("/:roomId", async (req, res) => {
    const { roomId } = req.params; // Extract roomId from the request parameters

    try {
        // Find the meeting by roomId
        const meeting = await Meeting.findById(roomId);
        if (!meeting) {
            return res.status(404).json({ message: "Meeting not found" });
        }

        // Delete the meeting
        await meeting.remove();

        res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (err) {
        console.error("Delete meeting error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// GET /api/meetings
router.get("/", async (req, res) => {
    try {
        const meetings = await Meeting.find().populate("host attendees", "firstName lastName email");
        res.status(200).json(meetings);
    } catch (err) {
        console.error("Get meetings error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
