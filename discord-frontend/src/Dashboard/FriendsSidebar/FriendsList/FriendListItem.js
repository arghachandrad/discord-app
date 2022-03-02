import { Button, Typography } from "@mui/material"
import Avatar from "../../../shared/components/Avatar"
import OnlineIndicator from "./OnlineIndicator"

const FriendListItem = ({ id, username, isOnline }) => {
  return (
    <Button
      sx={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        sx={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  )
}

export default FriendListItem
