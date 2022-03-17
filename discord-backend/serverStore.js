const { v4: uuidv4 } = require("uuid")

const connectedUsers = new Map() // all online users
let activeRooms = []

let io = null

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance
}

const getSocketServerInstance = () => {
  return io
}

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId })
  console.log("new connected users")
  console.log(connectedUsers)
}

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId)
    console.log("new connected users")
    console.log(connectedUsers)
  }
}

// get online socketIds of specific userId
const getActiveConnections = (userId) => {
  const activeConnections = []
  // multiple device login means multiple socketId , but single userId

  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      // push socketId of user, because to send data to client we need socketId of that client
      activeConnections.push(key)
    }
  })

  return activeConnections
}

const getOnlineUsers = () => {
  const onlineUsers = []

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId })
  })

  return onlineUsers
}

// rooms
const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  }

  activeRooms = [...activeRooms, newActiveRoom]
  console.log("The new active rooms")
  console.log(activeRooms)

  return newActiveRoom
}

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUsers,
  addNewActiveRoom,
}
