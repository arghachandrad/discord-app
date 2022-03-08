const serverStore = require("../serverStore")
const friendsUpdate = require("./updates/friends")

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
}

module.exports = newConnectionHandler
