// models/Meeting.js
import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 36000, // 10 hours = 10 * 60 * 60 seconds
    },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //the perosn who started the meeting
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // people who joined the meeting
    startTime: { type: Date, required: true }, // when the meeting started

});

const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting;
