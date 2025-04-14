// src/hooks/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketInstance = io("http://localhost:5000"); // your backend server
        setSocket(socketInstance);

        return () => socketInstance.disconnect();
    }, []);

    return { socket };
};
