import { Typography } from "@mui/material"
import { connect } from "react-redux"

const ChosenOptionLabel = ({ name }) => {
  return (
    <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
      {`${name ? `Choosen conversation: ${name}` : ""}`}
    </Typography>
  )
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    name: chat.chosenChatDetails?.name,
  }
}

export default connect(mapStoreStateToProps)(ChosenOptionLabel)
