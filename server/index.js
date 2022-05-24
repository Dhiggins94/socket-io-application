const express = require("express");
const app = express();
const http = require("http");
// socket io is created using an http server, it does not have to be setup this way but it is recommended
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);
// this is one way to create an http server with express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // this for cors middleware settings in relation to the socket io backend

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });
  // in order to create rooms using socket.io we need to use socket.join, this lets us specify a number to as it will be the room we're joining. data = the room id, will join room thats listed in the frontend

  socket.on("send_message", (data) => {
    // socket.broadcast.emit("recieve_message", data);
    socket.to(data.room).emit("recieve_message", data);
    // instead of broadcasting our message to everyone in a server. we want to send messages to a room. the socket.to ability lets us specify where we want to send our messages and then we emit this event so we can only send it to those rooms. useful for chat apps
  });
  // socket.broadcast.emit lets us emit a message to everyone in the socket server by a user. broadcast lets us send something to everyone except yourself, emit is an event on our side and registers listeners on the other
});
// this makes a connection to listen to the events happening with the socket io server in this case its the connection event.

server.listen(3001, () => {
  console.log("server is live");
});
