const serverStore = require("../serverStore")
const roomsUpdate = require("./updates/rooms")

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data

  const activeRoom = serverStore.getActiveRoom(roomId)

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id)

    const updatedActiveRoom = serverStore.getActiveRoom(roomId)

    if (updatedActiveRoom) {
      // if room exists after, the user left the room, then notify other users in the room
      updatedActiveRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        })
      })
    }
    roomsUpdate.updateRooms()
  }
}

module.exports = roomLeaveHandler
