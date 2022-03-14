import { useState } from "react"
import { IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const CloseRoomButton = () => {
  const handleLeaveRoom = () => {}
  return (
    <IconButton onClick={handleLeaveRoom} sx={{ color: "#fff" }}>
      <CloseIcon />
    </IconButton>
  )
}

export default CloseRoomButton
