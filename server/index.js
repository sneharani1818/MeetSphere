import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';

const PORT = 8000
const domain = "localhost"
const io = new Server({
    cors: true,
})
const app = express()

app.use(bodyParser.json())

const emailToSocketMapping = new Map() //we are mapping every email with a socket
const socketToEmailMapping = new Map()

io.on('connection', (socket) => {
    console.log('New Connection')
    socket.on('join-room', (data) => {
        const { roomId, emailId } = data;
        console.log('User joined room ', roomId)
        emailToSocketMapping.set(emailId, socket.id)
        socketToEmailMapping.set(socket.id, emailId);
        socket.join(roomId);
        socket.emit('joined-room', { roomId });
        socket.broadcast.to(roomId).emit('user-joined', { emailId });
    })
    socket.on('call-user', data => {
        const { emailId, offer } = data;
        const fromEmail = socketToEmailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('incoming-call', { from: fromEmail })
    })

    socket.on('call-accepted', data => {
        const { emailId, ans } = data
        const socketId = emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('call-accepted', { ans })
    })

})

app.listen(PORT, domain, () => console.log('Http server is running on Port 8000'))