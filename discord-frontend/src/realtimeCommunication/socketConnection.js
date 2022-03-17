import io from "socket.io-client"
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions"
import store from "../store/store"
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat"
import * as roomHandler from "./roomHandler"

let socket = null

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token
  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  })
  // -------- event comming from server
  // this is inbuilt socket event
  socket.on("connect", () => {
    console.log("successfully connected with socketio server")
    console.log(socket.id)
  })

  // listening custom events
  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data
    store.dispatch(setPendingFriendsInvitations(pendingInvitations))
  })

  // listing to friend list update
  socket.on("friends-list", (data) => {
    const { friends } = data
    store.dispatch(setFriends(friends))
  })

  // listing to current online users
  socket.on("online-users", (data) => {
    const { onlineUsers } = data
    store.dispatch(setOnlineUsers(onlineUsers))
  })

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data)
  })

  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data)
  })
}

// event emiting to server
export const sendDirectMessage = (data) => {
  console.log(data)
  socket.emit("direct-message", data)
}

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data)
}

export const createNewRoom = () => {
  // we will get the data through token and socketId
  socket.emit("room-create")
}
