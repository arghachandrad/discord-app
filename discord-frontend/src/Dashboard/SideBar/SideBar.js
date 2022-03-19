import { styled } from "@mui/system"
import CreateRoomButton from "./CreateRoomButton"
import MainPageButton from "./MainPageButton"
import ActiveRoomButton from "./ActiveRoomButton"
import { connect } from "react-redux"

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
})

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms &&
        activeRooms.map((room) => (
          <ActiveRoomButton
            key={room.roomId}
            roomId={room.roomId}
            creatorUsername={room.creatorUsername}
            amountOfParticipants={room.participants.length}
            isUserInRoom={isUserInRoom}
          />
        ))}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  }
}

export default connect(mapStoreStateToProps)(SideBar)
