import { styled } from "@mui/system"
import FriendListItem from "./FriendListItem"
import { connect } from "react-redux"

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
})

const FriendsList = ({ friends, onlineUsers }) => {
  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    friends.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id)
      f.isOnline = isUserOnline ? true : false
    })

    return friends
  }

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendListItem
          key={f.id}
          id={f.id}
          username={f.username}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ friend }) => {
  return {
    ...friend,
  }
}

export default connect(mapStoreStateToProps)(FriendsList)
