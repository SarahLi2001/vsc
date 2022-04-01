const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, "frontend/public", "index.html"));
  res.send('yo yo');
});
const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('messageSent', (chatName, message) => {
    io.to(chatName).emit('messageReceipt', chatName, message);
  });

  socket.on('openChat', (chatName) => {
    socket.join(chatName);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
