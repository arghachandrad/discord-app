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

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
})

const Dashboard = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user")

    if (!userDetails) {
      logout()
    } else {
      setUserDetails(JSON.parse(userDetails))
      connectWithSocketServer()
    }
  }, [setUserDetails])
  return (
    <Wrapper>
      <SideBar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
    </Wrapper>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  }
}

export default connect(null, mapActionsToProps)(Dashboard)
