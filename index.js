const express = require("express");
const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5000",
  },
});
const cors = require("cors");

const PORT = 4000;

app.use(cors());

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("newUser", (data) => {
    console.log({ data });
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });

  socket.on("message", (data) => {
    console.log(data);
    socketIO.emit("messageResponse", data);
  });

  socket.on("imageUpload", (data) => {
    console.log({ data });
    socketIO.emit("ImageReceive", data);
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
