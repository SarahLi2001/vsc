const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "frontend/public", "index.html"));
  res.send("yo yo");
});
const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("messageSent", (chat) => {
    io.to(chat.name).emit("messageReceipt", chat);
  });

  socket.on("createChat", (chat, oldChat, chatsLength) => {
    if (oldChat) socket.leave(oldChat);
    socket.join(chat.name);
    io.to(chat.name).emit("chatCreated", chat, chatsLength);
  });

  socket.on("changeChat", (chatName, chatIndex, oldChat) => {
    socket.leave(oldChat);
    socket.join(chatName);
    io.to(chatName).emit("chatChange", chatIndex);
  });

  socket.on("changeUsername", (username) => {
    io.emit("usernameChange", username);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
