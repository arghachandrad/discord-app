const roomSignalingDataHandler = (socket, data) => {
  const { connUserSocketId, signal } = data

  // prepareSignaling data for receiver
  // signal contains the signaling data of other user
  const signalingData = { signal, connUserSocketId: socket.id } // send own socket Id to other user
  socket.to(connUserSocketId).emit("conn-signal", signalingData)
}

module.exports = roomSignalingDataHandler
