import React, { useRef, useEffect } from 'react';

const Participant = ({ stream, name }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="participant">
            <video ref={videoRef} autoPlay playsInline muted className="video" />
            <div className="name-tag">{name}</div>
        </div>
    );
};

export default Participant;
