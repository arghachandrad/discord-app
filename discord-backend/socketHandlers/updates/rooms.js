const serverStore = require("../../serverStore")

const updateRooms = (toSpecifiedTargetId = null) => {
  // if toSoecificTargetId is passed, then we will emit active rooms to this Id(used when initial connect)
  const io = serverStore.getSocketServerInstance()
  const activeRooms = serverStore.getActiveRooms()

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit("active-rooms", {
      activeRooms,
    })
  } else {
    io.emit("active-rooms", {
      activeRooms,
    })
  }
}

module.exports = { updateRooms }
