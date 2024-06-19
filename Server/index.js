const express = require('express');
const app = express();
const cors = require('cors');
const {Server}  = require('socket.io');
const http = require('http');

app.use(cors());

const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },

});

/* app.get('/',(req,res)=>{
    res.send("Thiru")
}) */

let users = []; 
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    users.push({ id: socket.id, room });
    const userInRoom = users.filter((user) => user.room === room);
    socket.to(room).emit('userJoined', userInRoom); 
  });

  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('newMessage', data); 
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    users = users.filter((user) => user.id !== socket.id);
  });
});

server.listen(3001, () => console.log('Server listening on port 3001'));
