import { styled } from "@mui/system"
import CameraButton from "./CameraButton"
import CloseRoomButton from "./CloseRoomButton"
import MicButton from "./MicButton"
import ScreenShareButton from "./ScreenShareButton"
import { connect } from "react-redux"
import { getActions } from "../../../store/actions/roomActions"

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const RoomButtons = (props) => {
  const { localStream } = props

  return (
    <MainContainer>
      <ScreenShareButton {...props} />
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      <CameraButton localStream={localStream} />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons)
