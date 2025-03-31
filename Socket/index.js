const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
let channels = {};

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("joinChannel", (channelId) => {
    socket.join(channelId);
    if (!channels[channelId]) {
      channels[channelId] = [];
    }
    channels[channelId].push(socket.id);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, channelId }) => {
    if (channelId) {
      io.to(channelId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      } else {
        console.error("Receiver not found or not connected:", receiverId);
      }
    }
  });

  socket.on("sendOffer", (data) => {
    const receiver = getUser(data.receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("receiveOffer", data);
    } else {
      console.error("Receiver not found or not connected:", data.receiverId);
    }
  });

  socket.on("acceptOffer", (data) => {
    const sender = getUser(data.senderId);
    const receiver = getUser(data.receiverId);
    if (sender) {
      io.to(sender.socketId).emit("generateContract", data);
    }
    if (receiver) {
      io.to(receiver.socketId).emit("generateContract", data);
    }
  });

  socket.on("typing", ({ senderId, receiverId, channelId }) => {
    if (channelId) {
      io.to(channelId).emit("typing", { senderId });
    } else {
      const user = getUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("typing", { senderId });
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
