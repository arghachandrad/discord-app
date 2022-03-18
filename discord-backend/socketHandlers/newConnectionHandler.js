const serverStore = require("../serverStore")
const friendsUpdate = require("./updates/friends")
const roomsUpdate = require("./updates/rooms")

// executes when you landed on the app and new socket connections estalished
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  })

  // update pending friends invitation list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId)

  // update friends list
  friendsUpdate.updateFriends(userDetails.userId)

  // on refresh or initially, room data emiting related to particular user
  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id)
  }, [500])
}

module.exports = newConnectionHandler
