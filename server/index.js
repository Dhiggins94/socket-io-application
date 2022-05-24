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
  socket.on("send_message", (data) => {
    console.log(data);
  });
});
// this makes a connection to listen to the events happening with the socket io server in this case its the connection event.

server.listen(3001, () => {
  console.log("server is live");
});
