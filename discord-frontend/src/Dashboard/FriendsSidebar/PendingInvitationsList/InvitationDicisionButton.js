import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import { Box, IconButton } from "@mui/material"

const InvitationDicisionButton = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        sx={{ color: "#fff" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        sx={{ color: "#fff" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <ClearIcon />
      </IconButton>
    </Box>
  )
}

export default InvitationDicisionButton
