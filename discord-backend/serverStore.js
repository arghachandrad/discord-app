const connectedUsers = new Map() // all online users

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

// get online users
const getActiveConnections = (userId) => {
  const activeConnections = []
  // multiple device login means multiple socketId , but single userId

  connectedUsers.forEach(function (key, value) {
    if (value.userId === userId) {
      // push socketId of user, because to send data to client we need socketId of that client
      activeConnections.push(key)
    }
  })

  return activeConnections
}

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketServerInstance,
  setSocketServerInstance,
}
