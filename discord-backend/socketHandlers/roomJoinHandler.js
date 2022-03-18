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

  // reusing func, used for updating to other users in room that new participants join
  roomsUpdates.updateRooms()
}
