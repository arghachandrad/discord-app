const serverStore = require("../serverStore")
const roomsUpdates = require("./updates/rooms")

const roomJoinHandler = (socket, data) => {
  const { roomId } = data

  // who wants to join His details fetching
  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  }

  const roomDetails = serverStore.getActiveRoom(roomId)

  serverStore.joinActiveRoom(roomId, participantDetails)

  // send information to users in room, that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      // send the event ONLY to other users
      // to every participants in this room, tell to prepare
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId, // new joinee socketId, sending to other users already in room
      })
    }
  })

  // reusing func, used for updating to other users in room that new participants join
  roomsUpdates.updateRooms()
}

module.exports = roomJoinHandler
