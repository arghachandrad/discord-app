import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
} from "../store/actions/roomActions"
import store from "../store/store"
import * as socketConnection from "./socketConnection"
import * as webRTCHandler from "./webRTCHandler"

export const createNewRoom = () => {
  // this func we want to execute once localStream connected successfully, thn create room
  const successCallbackFunc = () => {
    store.dispatch(setOpenRoom(true, true))
    socketConnection.createNewRoom()
  }

  webRTCHandler.getLocalStreamPreview(false, successCallbackFunc)
}

export const newRoomCreated = (data) => {
  const { roomDetails } = data
  store.dispatch(setRoomDetails(roomDetails))
}

export const updateActiveRooms = (data) => {
  const { activeRooms } = data

  // only store the room if room creator is our frd
  const friends = store.getState().friend.friends

  const rooms = []

  activeRooms.forEach((room) => {
    friends.forEach((f) => {
      if (f.id === room.roomCreator.userId) {
        rooms.push({ ...room, creatorUsername: f.username })
      }
    })
  })

  store.dispatch(setActiveRooms(rooms))
}

export const joinRoom = (roomId) => {
  store.dispatch(setRoomDetails({ roomId }))
  store.dispatch(setOpenRoom(false, true))
  socketConnection.joinRoom({ roomId })
}

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId

  socketConnection.leaverRoom({ roomId })
  store.dispatch(setRoomDetails(null))
  store.dispatch(setOpenRoom(false, false))
}
