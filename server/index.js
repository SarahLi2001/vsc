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
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.join("chat");
  socket.on("message sent", (message) => {
    // to all connected clients in the "news" room
    io.to("chat").emit(message);
  });
  socket.on("test", (msg) => console.log(msg));
  // socket.emit();
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
