import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import axios from "axios";

const LobbyScreen = () => {
    const { roomId } = useParams();
    console.log("In lobby ", roomId)

    const [email, setEmail] = useState("");
    const [room, setRoom] = useState(roomId || "");
    const [copied, setCopied] = useState(false);

    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [stream, setStream] = useState(null);

    const videoRef = useRef(null);
    const socket = useSocket();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem("userEmail");
        const localRoomId = localStorage.getItem("latestRoomId");

        if (savedEmail) setEmail(savedEmail);
        if (location.state?.roomId) {
            setRoom(location.state.roomId);
        } else if (localRoomId) {
            setRoom(localRoomId);
        }
    }, [location]);

    useEffect(() => {
        let activeStream = null;

        const getMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                activeStream = mediaStream;
                setStream(mediaStream);

                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing media devices:", err);
            }
        };

        getMedia();

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleStartMeeting = async () => {

        if (!email) {
            alert("Please enter your email before starting a meeting.");
            return;
        }

        try {
            console.log("In lobby screeen ", roomId)

            const response = await axios.get("/api/meeting/start-meeting", { params: { email }, });
            console.log("Response:", response.data); // debugging line
            setRoom(response.data.roomId);
            const newRoomId = response.data.roomId;
            console.log(response.data.email)
            setEmail(response.data.email);
            localStorage.setItem("latestRoomId", newRoomId);
            setRoom(newRoomId);

        } catch (error) {
            console.error("Failed to start meeting", error);
            alert("Could not start meeting. Please make sure your email is registered.");
        }
    };

    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            localStorage.setItem("userEmail", email);
            socket.emit("room:join", { email, room, videoEnabled, audioEnabled });
        },
        [email, room, socket, videoEnabled, audioEnabled]
    );

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
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setVideoEnabled(videoTrack.enabled);
            }
        }
    };

    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setAudioEnabled(audioTrack.enabled);
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Lobby</h3>

                            {room && (
                                <div className="alert alert-info d-flex justify-content-between align-items-center">
                                    <div><strong>Room ID:</strong> {room}</div>
                                    <button className="btn btn-outline-dark btn-sm" onClick={handleCopy}>
                                        {copied ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            )}

                            <div className="mb-3 text-center">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="rounded"
                                    style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                                />
                                <div className="mt-2">
                                    <button className="btn btn-outline-primary me-2" onClick={toggleVideo}>
                                        {videoEnabled ? "Turn Off Video" : "Turn On Video"}
                                    </button>
                                    <button className="btn btn-outline-secondary" onClick={toggleAudio}>
                                        {audioEnabled ? "Mute" : "Unmute"}
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitForm}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="room" className="form-label">Room ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="room"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success">Join Meeting</button>
                                    <button type="button" className="btn btn-dark" onClick={handleStartMeeting}>
                                        Start New Meeting
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LobbyScreen;
