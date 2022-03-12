const Conversation = require("../../models/conversation")
const serverStore = require("../../serverStore")

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "authorId",
      model: "User",
      select: "username _id",
    },
  })

  if (conversation) {
    const io = serverStore.getSocketServerInstance()

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      })
    }

    // check if users of this conversation are online(one by one as using forEach)
    // if yes emit to them update of message
    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      )

      // sending update to all devides(socketIds) of that user
      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        })
      })
    })
  }
}

module.exports = { updateChatHistory }
