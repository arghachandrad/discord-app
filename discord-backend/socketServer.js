const verifyTokenSocket = require("./middlewares/authSocket")
const newConnectionHandler = require("./socketHandlers/newConnectionHandler")

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  })

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
  })
}

module.exports = {
  registerSocketServer,
}
