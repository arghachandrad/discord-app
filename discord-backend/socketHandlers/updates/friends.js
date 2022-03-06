const User = require("../../models/user")
const FriendInvitation = require("../../models/friendInvitation")
const serverStore = require("../../serverStore")

const updateFriendsPendingInvitations = async (userId) => {
  try {
    // looking for all pending invitations, where receiverId = userId(currently logged in user)
    // and get the details of who send the invitation
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail")

    // find if user of specified user Id has active connections
    // if receiver user is online, then only receive this pending inv.list
    const receiverList = serverStore.getActiveConnections(userId) // find online Receivers
    // receiverList contains array of socketIds of this current user

    const io = serverStore.getSocketServerInstance()

    // emit invitationlist
    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      })
    })
  } catch (error) {
    console.log(err)
  }
}

module.exports = {
  updateFriendsPendingInvitations,
}
