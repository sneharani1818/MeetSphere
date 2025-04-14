// src/context/CallContext.js
import React, { createContext, useContext, useState } from "react";

const CallContext = createContext();

export const CallProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [participants, setParticipants] = useState([]);

    return (
        <CallContext.Provider value={{ stream, setStream, participants, setParticipants }}>
            {children}
        </CallContext.Provider>
    );
};

export const useCall = () => useContext(CallContext);
