import { styled } from "@mui/system"
import AppBar from "./AppBar/AppBar"
import FriendsSidebar from "./FriendsSidebar/FriendsSidebar"
import Messenger from "./Messenger/Messenger"
import SideBar from "./SideBar/SideBar"

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
})

const Dashboard = () => {
  return (
    <Wrapper>
      <SideBar />
      <FriendsSidebar />
      <Messenger />
      <AppBar />
    </Wrapper>
  )
}

export default Dashboard
