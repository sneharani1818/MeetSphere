// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './../components/Navbar';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleStartMeeting = async () => {
        console.log("In handle start meeting function")
        const userEmail = localStorage.getItem("email"); // or get it from context/auth state
        try {
            console.log(userEmail)
            const response = await axios.post('http://localhost:5000/api/meeting/start-meeting', { email: userEmail });
            const roomId = response.data.roomId;
            console.log(roomId);
            navigate(`/meeting/${roomId}`); // Pass roomId to LobbyScreen
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
