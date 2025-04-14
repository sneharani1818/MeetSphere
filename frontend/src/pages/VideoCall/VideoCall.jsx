import React from 'react';
import Participant from './Participant';
import './VideoCall.css';

const VideoCall = ({ participants }) => {
    return (
        <div className="video-call-container">
            {participants.map((participant, index) => (
                <Participant key={index} stream={participant.stream} name={participant.name} />
            ))}
        </div>
    );
};

export default VideoCall;
