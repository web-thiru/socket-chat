const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },

});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const myRouter = express.Router();

myRouter.get('/', (req, res) => {
  let users = [];
  req.io.on('connection', (socket) => {
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
  })
  res.send("ok")
})

app.use('/socket', myRouter);




/* app.get('/',(req,res)=>{
    res.send("Thiru")
}) */
// app.get('/socket', () => {



server.listen(3001, () => console.log('Server listening on port 3001'));
