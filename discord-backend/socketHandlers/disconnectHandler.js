const serverStore = require("../serverStore")
const roomLeaveHandler = require("./roomLeaveHandler")

const disconnectHandler = (socket) => {
  // before disconnect check if this user in Room or not
  const activeRooms = serverStore.getActiveRooms()

  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    )

    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: activeRoom.roomId })
    }
  })
  serverStore.removeConnectedUser(socket.id)
}

module.exports = disconnectHandler
