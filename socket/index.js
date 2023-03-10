const io = require("socket.io")(8800, {
  cors: {
    origin: "*",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    if (user) {
      console.log("[INFO] msg sent");
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  // join group
  socket.on("join-group",(data)=>{
    const {groupName} = data

    if(!groupName) return
    console.log(`[INFo] User join in '${groupName}'`)
    socket.join(groupName)
  })

  // leave group
  socket.on("leave-group",(data)=>{
    const {groupName} = data

    if(!groupName) return
    socket.leave(groupName)
    console.log(`[INFo] User leave from '${groupName}'`)
    })

  // send message to a specific group
  socket.on("send-message-group", (data) => {
    const { groupName } = data;
    
    if (groupName) {
      console.log("[INFO] msg sent to ", groupName); 
      // socket.join(groupName);
      socket.broadcast.to(groupName).emit("receive-message-group", data);
    }
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  socket.on("connect_error", (err) => {
    console.log(`[ERROR] ${err.message}`);
  });
});
