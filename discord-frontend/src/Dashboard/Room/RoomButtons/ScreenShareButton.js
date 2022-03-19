import { IconButton } from "@mui/material"
import ScreenShareIcon from "@mui/icons-material/ScreenShare"
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare"
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler"

const constrainsts = {
  audio: false,
  video: true,
}

const ScreenShareButton = ({
  localStream,
  setScreenSharingStream,
  screenSharingStream,
  isScreenSharingActive,
}) => {
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constrainsts)
      } catch (error) {
        console.log(
          "error occured when trying to get an access to screen share stream"
        )
      }

      if (stream) {
        setScreenSharingStream(stream)

        // webRTCHandler.switchOutgoing video tracks
        webRTCHandler.switchOutgoingTracks(stream)
      }
    } else {
      // ScreenSharing switched off
      // webRTCHandler.switchOutgoingTracks
      webRTCHandler.switchOutgoingTracks(localStream) // replacing with localStream again
      screenSharingStream.getTracks().forEach((t) => t.stop())
      setScreenSharingStream(null)
    }
  }
  return (
    <IconButton onClick={handleScreenShareToggle} sx={{ color: "#fff" }}>
      {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  )
}

export default ScreenShareButton
