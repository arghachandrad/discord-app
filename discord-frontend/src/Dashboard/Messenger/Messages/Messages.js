import { styled } from "@mui/system"
import { useEffect, useRef } from "react"
import MessagesHeader from "./MessagesHeader"
import { connect } from "react-redux"
import Message from "./Message"

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  }

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched])
}

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].authorId._id === messages[index - 1].authorId._id

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(
            new Date(messages[index].date),
            "dd/mm/yy"
          ) ===
            convertDateToHumanReadable(
              new Date(messages[index - 1].date),
              "dd/mm/yy"
            )

        return (
          <Message
            key={message._id}
            content={message.content}
            username={message.authorId.username}
            sameAuthor={sameAuthor}
            date={convertDateToHumanReadable(
              new Date(message.date),
              "dd/mm/yy"
            )}
            sameDay={sameDay}
          />
        )
      })}
    </MainContainer>
  )
}

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  }
}

export default connect(mapStoreStateToProps)(Messages)