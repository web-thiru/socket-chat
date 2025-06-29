
import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';


const app = express();


app.use(cors());

const server = createServer(app);


const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },

});




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

    socket.on('leaveRoom', (room) => {
      socket.leave(room);
      users = users.filter((user) => user.id !== socket.id);      
      socket.to(room).emit('userLeft', { id: socket.id, room });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
      users = users.filter((user) => user.id !== socket.id);
    });
  });




server.listen(3001, () => console.log('Server listening on port 3001'));
