import { styled } from "@mui/system"
import { useEffect } from "react"
import Messages from "./Messages/Messages"
import NewMessageInput from "./NewMessageInput"

const Wrapper = styled("div")({
  flexGrow: 1,
})

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    // TODO fetching chat history from specific userId
  }, [chosenChatDetails])
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  )
}

export default MessengerContent
