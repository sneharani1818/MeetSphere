// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import './ChatBox.css';

const Chatbot = () => {
    const { socket } = useSocket();
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket?.on("receive-message", (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket?.off("receive-message");
        };
    }, [socket]);

    const sendMessage = () => {
        if (msg.trim()) {
            const newMessage = { text: msg, sender: "You", timestamp: new Date() };
            socket.emit("send-message", newMessage);
            setMessages(prev => [...prev, newMessage]);
            setMsg('');
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chatbox-container">
            <div className="chat-messages">
                {messages.map((m, i) => (
                    <div key={i} className="message">
                        <strong>{m.sender}:</strong> {m.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <input
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
