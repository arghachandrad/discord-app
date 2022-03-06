import { styled } from "@mui/system"
import PendingInvitationsListItem from "./PendingInvitationsListItem"
import { connect } from "react-redux"

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
})

const PendingInvitationsList = ({ pendingFriendInvitations }) => {
  return (
    <MainContainer>
      {pendingFriendInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
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

export default connect(mapStoreStateToProps)(PendingInvitationsList)
