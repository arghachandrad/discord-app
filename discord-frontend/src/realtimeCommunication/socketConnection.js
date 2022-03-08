import io from "socket.io-client"
import {
  setPendingFriendsInvitations,
  setFriends,
} from "../store/actions/friendsActions"
import store from "../store/store"

let socket = null

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token
  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  })

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
  socket.on("friend-list", (data) => {
    const { friends } = data
    store.dispatch(setFriends(friends))
  })
}
