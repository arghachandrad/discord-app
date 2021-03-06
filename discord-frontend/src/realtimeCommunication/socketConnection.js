import io from "socket.io-client"
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions"
import store from "../store/store"
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat"
import * as roomHandler from "./roomHandler"
import * as webRTCHandler from "./webRTCHandler"

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

  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data)
  })

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data
    webRTCHandler.prepareNewConnection(connUserSocketId, false) // here false, as we are not connection, only preparing connection

    // after preparing peer other users, they are sending conn-init event to the user who requested them for new connection
    socket.emit("conn-init", { connUserSocketId })
  })

  socket.on("conn-init", (data) => {
    // data to which user he should try to initialize the connection
    const { connUserSocketId } = data

    // NOTE: this time 2nd arg is true, because in this case other users are ready so, we can start connecting
    webRTCHandler.prepareNewConnection(connUserSocketId, true)
  })

  // receiving socket signal of other user
  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data)
  })

  socket.on("room-participant-left", (data) => {
    console.log("user left room")
    webRTCHandler.handleParticipantLeftRoom(data)
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

export const joinRoom = (data) => {
  socket.emit("room-join", data)
}

export const leaverRoom = (data) => {
  socket.emit("room-leave", data)
}

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data)
}
