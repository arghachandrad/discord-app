const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data

  const initData = { connUserSocketId: socket.id }

  // emitting to same user, who emitted the event after preparing the connection
  socket.to(connUserSocketId).emit("conn-init", initData)
}

module.exports = roomInitializeConnectionHandler
