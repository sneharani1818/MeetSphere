import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { v4 as uuidV4 } from 'uuid';
import Navbar from './../components/Navbar';
import axios from 'axios'; // Import axios

const Dashboard = () => {
    const navigate = useNavigate();

    const handleStartMeeting = async () => {
        try {
            // Make an API request to create a new meeting
            console.log("In handle start meeting fucnttion")
            const response = await axios.post('/api/start-meeting'); // Replace with your backend endpoint
            console.log('Messge at frontend to start a new meeting')
            const roomId = response.data.roomId; // Get the room ID from the response
            navigate(`/videocall/${roomId}`); // Navigate to the video call page with the roomId
        } catch (error) {
            console.error('Error starting the meeting:', error);
        }
    };

    const handleJoinMeeting = () => {
        const roomId = prompt('Enter Meeting ID:');
        if (roomId) {
            navigate(`/videocall/${roomId}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Welcome to MeetSphere!</h2>
                <div className="mt-4 d-flex gap-3">
                    <button className="btn btn-primary" onClick={handleStartMeeting}>
                        Start New Meeting
                    </button>
                    <button className="btn btn-dark" onClick={handleJoinMeeting}>
                        Join Meeting
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
