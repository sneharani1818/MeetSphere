import React, { useState, useEffect, useCallback } from 'react'
import { useSocket } from '../providers/useSocket.js'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { socket } = useSocket();
    const navigate = useNavigate();
    // if (socket) {
    //     socket.emit('join-room', { roomId: '1', emailId: 'anyemail@gmail.com' });
    // }
    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("");

    const handleJoinRoom = ({ roomId }) => {
        console.log("button clicked")
        socket.emit('join-room', { emailId: email, roomId });
    }

    const handleRoomJoined = useCallback(({ roomId }) => {
        console.log(roomId)
        navigate(`/room/${roomId}`);
    }, [navigate])

    useEffect(() => {
        if (!socket) return; // Prevents calling methods on null socket

        socket.on('joined-room', handleRoomJoined)
        return () => socket.off('joined-room', handleRoomJoined); // Cleanup listener
    }, [socket, navigate, handleRoomJoined]);

    return (
        <div className='homepage-container'>
            <div className='input-container'>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Enter your email here' />
                <input value={roomId} onChange={e => setRoomId(e.target.value)} type="text" placeholder='Enter room code' />
                <button onClick={handleJoinRoom}>Enter room</button>

            </div>
        </div>
    )
}

export default HomePage 