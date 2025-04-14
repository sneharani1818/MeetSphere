// socket/socketHandlers.js
module.exports = (socket, io) => {
    socket.on("join-room", ({ roomId, userId }) => {
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on("disconnect", () => {
            socket.to(roomId).emit("user-disconnected", userId);
        });

        // Relay WebRTC offers/answers/ICE candidates
        socket.on("offer", data => {
            socket.to(data.to).emit("offer", data);
        });

        socket.on("answer", data => {
            socket.to(data.to).emit("answer", data);
        });

        socket.on("ice-candidate", data => {
            socket.to(data.to).emit("ice-candidate", data);
        });
    });
};
