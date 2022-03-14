import { useState } from "react"
import { IconButton } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import VideocamOffIcon from "@mui/icons-material/VideocamOff"

const CameraButton = () => {
  const [cameraEnabled, setCameraEnabled] = useState(true)

  const handleToggleCamera = () => {
    setCameraEnabled(!cameraEnabled)
  }
  return (
    <IconButton onClick={handleToggleCamera} sx={{ color: "#fff" }}>
      {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
    </IconButton>
  )
}

export default CameraButton