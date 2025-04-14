import { v4 as uuidv4 } from 'uuid';

// Start a new meeting and return the meeting ID
export function startMeeting(req, res) {
    console.log("Start meeting controller")
    try {
        const meetingId = uuidv4(); // Generate a unique meeting ID

        // You could add logic here to store the meeting in a database if needed
        console.log(meetingId)
        return res.status(200).json({ meetingId }); // Send the meeting ID back to the client

    } catch (error) {
        console.error("Error starting the meeting:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Join an existing meeting with a given meeting ID
export function joinMeeting(req, res) {
    const { meetingId } = req.body; // Get the meeting ID from the request body

    if (!meetingId) {
        return res.status(400).json({ message: "Meeting ID is required" });
    }

    // In a real-world app, you'd want to verify if this meeting ID exists in the database
    // For now, we are assuming the meeting ID exists

    return res.status(200).json({ message: "Joining meeting", meetingId });
}
