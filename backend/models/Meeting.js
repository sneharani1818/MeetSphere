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
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);
export default Meeting;
