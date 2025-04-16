import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const LobbyScreen = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");
    const [copied, setCopied] = useState(false);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    const socket = useSocket();
    const location = useLocation();
    const navigate = useNavigate();

    // Load email from localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) setEmail(storedEmail);
    }, []);

    // Handle room ID from backend or localStorage
    useEffect(() => {
        const localRoomId = localStorage.getItem("latestRoomId");
        if (location.state?.roomId) {
            setRoom(location.state.roomId);
        } else if (localRoomId) {
            setRoom(localRoomId);
        }
    }, [location]);

    // Get video/audio
    useEffect(() => {
        let activeStream = null;
        const getMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                activeStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) videoRef.current.srcObject = mediaStream;
            } catch (err) {
                console.error("Error accessing media devices:", err);
            }
        };

        getMedia();
        return () => {
            if (activeStream) activeStream.getTracks().forEach((track) => track.stop());
        };
    }, []);

    // Emit room:join
    const handleSubmitForm = useCallback(
        () => {
            if (!email || !room) return;
            socket.emit("room:join", { email, room, videoEnabled, audioEnabled });
        },
        [email, room, socket, videoEnabled, audioEnabled]
    );

    // Navigate to Room screen
    const handleJoinRoom = useCallback(
        (data) => {
            const { room } = data;
            navigate(`/room/${room}`, {
                state: {
                    email,
                    videoEnabled,
                    audioEnabled,
                },
            });
        },
        [navigate, email, videoEnabled, audioEnabled]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    const handleCopy = () => {
        navigator.clipboard.writeText(room);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleVideo = () => {
        const videoTrack = stream?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setVideoEnabled(videoTrack.enabled);
        }
    };

    const toggleAudio = () => {
        const audioTrack = stream?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setAudioEnabled(audioTrack.enabled);
        }
    };

    const handleStartMeeting = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }
        try {
            const res = await axios.post("/api/meeting/start-meeting", { email });
            const newRoomId = res.data.roomId;
            console.log("Generated room ID:", newRoomId);
            setRoom(newRoomId);
            localStorage.setItem("latestRoomId", newRoomId);
            handleSubmitForm(); // 👈 JOIN AUTOMATICALLY
        } catch (err) {
            console.error("Start meeting error:", err);
            alert("Could not start meeting. Please check email.");
        }
    };

    return (
        <div className="container py-4">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">MeetSphere Lobby</h2>

                {room && (
                    <div className="alert alert-secondary d-flex justify-content-between align-items-center">
                        <div><strong>Meeting ID:</strong> {room}</div>
                        <button className="btn btn-sm btn-outline-primary" onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                )}

                <div className="text-center mb-4">
                    <video ref={videoRef} autoPlay muted className="rounded" style={{ width: "300px" }} />
                    <div className="mt-2">
                        <button className="btn btn-outline-dark me-2" onClick={toggleVideo}>
                            {videoEnabled ? "Turn Off Video" : "Turn On Video"}
                        </button>
                        <button className="btn btn-outline-dark" onClick={toggleAudio}>
                            {audioEnabled ? "Mute" : "Unmute"}
                        </button>
                    </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmitForm(); }}>
                    <div className="mb-3">
                        <label>Email ID</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                localStorage.setItem("email", e.target.value);
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Room ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-success">Join Meeting</button>
                        <button type="button" className="btn btn-primary" onClick={handleStartMeeting}>
                            Start New Meeting
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LobbyScreen;
