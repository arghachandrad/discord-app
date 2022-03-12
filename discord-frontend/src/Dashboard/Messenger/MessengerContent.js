import { styled } from "@mui/system"
import { useEffect } from "react"
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection"
import Messages from "./Messages/Messages"
import NewMessageInput from "./NewMessageInput"

const Wrapper = styled("div")({
  flexGrow: 1,
})

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    })
  }, [chosenChatDetails])
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  )
}

export default MessengerContent
