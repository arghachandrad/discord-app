const Conversation = require("../models/conversation")
const Message = require("../models/message")
// responsible for emitting chat update using socket
const chatUpdates = require("./updates/chat")

const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is been handled")

    const { userId } = socket.user
    const { receiverUserId, content } = data

    // create a new message
    const message = await Message.create({
      content,
      authorId: userId,
      date: new Date(),
      type: "DIRECT",
    })

    // find if conversation exists with this two user - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    })

    if (conversation) {
      conversation.messages.push(message._id)
      await conversation.save()

      // perform an update to sender and receiver if online
      chatUpdates.updateChatHistory(conversation._id.toString())
    } else {
      // create new conversion if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      })

      // perform an update to sender and receiver if is online
      chatUpdates.updateChatHistory(conversation._id.toString())
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = directMessageHandler
