import { useState } from "react"
import { IconButton } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"

const MicButton = () => {
  const [micEnabled, setMicEnabled] = useState(true)

  const handleToggleMic = () => {
    setMicEnabled(!micEnabled)
  }
  return (
    <IconButton onClick={handleToggleMic} sx={{ color: "#fff" }}>
      {micEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  )
}

export default MicButton
