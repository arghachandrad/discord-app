import { styled } from "@mui/system"
import { useState } from "react"
import { connect } from "react-redux"
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection"

const MainContainer = styled("div")({
  height: "60px",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  width: "100%",
})

const Input = styled("input")({
  background: "#2f3136",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
})

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState("")

  const handleMessageValueChange = (e) => {
    setMessage(e.target.value)
  }

  const handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      })

      setMessage("")
    }
  }

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  }
}

export default connect(mapStoreStateToProps)(NewMessageInput)
