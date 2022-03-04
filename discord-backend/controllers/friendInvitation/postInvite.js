const FriendInvitation = require("../../models/friendInvitation")
const User = require("../../models/user")

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body

  const { userId, mail } = req.user

  // check if friend that we would like to invite is not user
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send("Sorry, you cannot become friend with yourself")
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  })

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address`
      )
  }

  // check if invitation has been already send
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  })

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent")
  }

  // check if user which we would like to invite is already our frined
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  )

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friend list.")
  }

  // Create new invitation
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  })

  // if invitaion successfully create, we would like to update friends invitation, if user is online

  return res.status(201).send("Invitation has been sent")
}

module.exports = postInvite
