// src/components/Controls.jsx
import React from "react";

const Controls = ({ toggleMic, toggleCamera, leaveCall, micOn, camOn }) => {
    return (
        <div className="controls">
            <button onClick={toggleMic}>
                {micOn ? "Mute Mic" : "Unmute Mic"}
            </button>
            <button onClick={toggleCamera}>
                {camOn ? "Turn Off Cam" : "Turn On Cam"}
            </button>
            <button className="leave" onClick={leaveCall}>Leave</button>
        </div>
    );
};

export default Controls;
