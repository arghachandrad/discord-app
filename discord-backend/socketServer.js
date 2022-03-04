const verifyTokenSocket = require("./middlewares/authSocket")
const disconnectHandler = require("./socketHandlers/disconnectHandler")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler")
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

  // getting socket object of a specific user
  io.on("connection", (socket) => {
    console.log("user connected")
    console.log(socket.id)

    // new connection to socket
    newConnectionHandler(socket, io)

    socket.on("disconnect", () => {
      disconnectHandler(socket)
    })
  })
}

module.exports = {
  registerSocketServer,
}
