const User = require("../../models/user")
const FriendInvitation = require("../../models/friendInvitation")
const serverStore = require("../../serverStore")

// responsible for realtime update of friends invitation list
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

// responsible for realtime update of friends list
const updateFriends = async (userId) => {
  try {
    // find active  connections of specific id (online users)
    const receiverList = serverStore.getActiveConnections(userId)

    if (receiverList.length > 0) {
      // if user is online only then send friends list
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username mail"
      )

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          }
        })

        // get the io server instance
        const io = serverStore.getSocketServerInstance()

        receiverList.forEach((receiverSocketId) => {
          // every socketId of specific user who is logged in(sending realtime friend list)
          io.to(receiverSocketId).emit("friends-list", {
            friends: friendsList ? friendsList : [],
          })
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
}
