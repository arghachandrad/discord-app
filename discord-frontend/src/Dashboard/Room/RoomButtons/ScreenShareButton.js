import { useState } from "react"
import { IconButton } from "@mui/material"
import ScreenShareIcon from "@mui/icons-material/ScreenShare"
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare"

const ScreenShareButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false)

  const handleScreenShareToggle = () => {
    setIsScreenSharingActive(!isScreenSharingActive)
  }
  return (
    <IconButton onClick={handleScreenShareToggle} sx={{ color: "#fff" }}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  )
}

export default ScreenShareButton
