import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
} from "../store/actions/roomActions"
import store from "../store/store"
import * as socketConnection from "./socketConnection"

export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true))
  socketConnection.createNewRoom()
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
