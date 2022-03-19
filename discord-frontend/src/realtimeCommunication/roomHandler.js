import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
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

  const onlyAudio = store.getState().room.audioOnly
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallbackFunc)
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
  // this func we want to execute once localStream connected successfully, thn create room
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }))
    store.dispatch(setOpenRoom(false, true))
    socketConnection.joinRoom({ roomId })
  }

  const onlyAudio = store.getState().room.audioOnly
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallbackFunc)
}

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId

  // get the local stream(audio/video) and close it on leave Room
  const localStream = store.getState().room.localStream
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop())
    store.dispatch(setLocalStream(null))
  }

  const screenSharingStream = store.getState().room.screenSharingStream

  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop())
    store.dispatch(setScreenSharingStream(null))
  }

  store.dispatch(setRemoteStreams([]))
  // also close the remote stream
  webRTCHandler.closeAllConnections()

  socketConnection.leaverRoom({ roomId })
  store.dispatch(setRoomDetails(null))
  store.dispatch(setOpenRoom(false, false))
}
