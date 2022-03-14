import { styled } from "@mui/system"
import { useEffect } from "react"
import { logout } from "../shared/utils/auth"
import AppBar from "./AppBar/AppBar"
import FriendsSidebar from "./FriendsSidebar/FriendsSidebar"
import Messenger from "./Messenger/Messenger"
import SideBar from "./SideBar/SideBar"
import { connect } from "react-redux"
import { getActions } from "../store/actions/authActions"
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection"
import Room from "./Room/Room"

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
})

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user")

    if (!userDetails) {
      logout()
    } else {
      setUserDetails(JSON.parse(userDetails))
      // passing to socket server , about who is connected and online
      connectWithSocketServer(JSON.parse(userDetails))
    }
  }, [setUserDetails])
  return (
    <Wrapper>
      <SideBar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard)
