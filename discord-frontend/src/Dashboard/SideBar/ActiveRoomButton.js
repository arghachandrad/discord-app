import { Button, Tooltip } from "@mui/material"
import Avatar from "../../shared/components/Avatar"

const ActiveRoomButton = ({
  roomId,
  creatorUsername,
  amountOfParticipants,
  isUserInRoom,
}) => {
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
      // Join this room
    }
  }

  const activeRoomButtonDisabled = amountOfParticipants > 3
  const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOfParticipants}`

  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          disabled={activeRoomButtonDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
          sx={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: "10px",
            color: "#fff",
            backgroundColor: "#5065f2",
          }}
        >
          <Avatar username={creatorUsername} />
        </Button>
      </div>
    </Tooltip>
  )
}

export default ActiveRoomButton
