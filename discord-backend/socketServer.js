const verifyTokenSocket = require("./middlewares/authSocket")
const disconnectHandler = require("./socketHandlers/disconnectHandler")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler")
const directMessageHandler = require("./socketHandlers/directMessageHandler")
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler")
const serverStore = require("./serverStore")

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

  serverStore.setSocketServerInstance(io) // setting io instance for usage in other parts(for emit)

  io.use((socket, next) => {
    // verify before connection established
    verifyTokenSocket(socket, next)
  })

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers()
    // emit to all the users
    io.emit("online-users", { onlineUsers })
  }

  // getting socket object of a specific user
  io.on("connection", (socket) => {
    console.log("user connected")
    console.log(socket.id)

    // new connection to socket
    newConnectionHandler(socket, io)
    emitOnlineUsers()

    socket.on("direct-message", (data) => {
      console.log("receiving emit direct-message")
      directMessageHandler(socket, data)
    })

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data)
    })

    socket.on("disconnect", () => {
      disconnectHandler(socket)
    })
  })

  // after 8 sec emit online users
  setInterval(() => {
    emitOnlineUsers()
  }, [8000])
}

module.exports = {
  registerSocketServer,
}
