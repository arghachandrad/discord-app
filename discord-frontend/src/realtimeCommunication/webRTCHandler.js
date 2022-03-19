import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions"
import store from "../store/store"
import Peer from "simple-peer"
import * as socketConnection from "./socketConnection"

const getConfiguration = () => {
  const turnIceServer = null

  if (turnIceServer) {
    // TODO use turn server credentials
  } else {
    console.warn("Using only STUN server")
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    }
  }
}

const onlyAudioConstraints = {
  audio: true,
  video: false,
}

const defaultConstraints = {
  video: true,
  audio: true,
}

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints

  // get access to the local stream
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream))
      // this will we called when local stream connection is successfull
      callbackFunc()
    })
    .catch((err) => {
      console.log(err)
      console.log("Cannot get an access to local stream")
    })
}

let peers = {}

export const prepareNewConnection = (connUserSocketId, isInitiator) => {
  // localStream of users, who is receiving the conn-prepare event
  const localStream = store.getState().room.localStream

  if (isInitiator) {
    console.log("preparing new peer connection as initiator")
  } else {
    console.log("preparing new peer connection as not initiator")
  }

  // this will collect all the localStream of other users, and broadcast to connUserSocketId
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(), // get stun server inforation/ice candidate
    stream: localStream,
  })

  // here we share the data with other user(for connection)
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId, // to which user you want to pass the signalling data(ICE candidate)
    }

    socketConnection.signalPeerData(signalData) // sending ICE cand. and SDP data i.e. passing signalling data to other users
  })

  // if the conn is established with other user, we share the remote stream
  peers[connUserSocketId].on("stream", (remoteStream) => {
    remoteStream.connUserSocketId = connUserSocketId // it will be helpfull when user let, we can know which remote stream to remove
    addNewRemoteStream(remoteStream)
  })
}

export const handleSignalingData = (data) => {
  // connUserSocketId: who's signal it is
  const { connUserSocketId, signal } = data

  if (peers[connUserSocketId]) {
    // adding other user's signal data to peer obejct
    peers[connUserSocketId].signal(signal) // this is exchanging ICE cand. and SDP, so now streams can be received (remote stream)
  }
}

const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams
  const newRemoteStreams = [...remoteStreams, remoteStream]

  store.dispatch(setRemoteStreams(newRemoteStreams))
}

// executed by who is leaving the room
export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0]
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy()
      delete peers[connUserSocketId] // closing all the RTC connection
    }
  })
}

// executed by other users after one user left the room
export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy()
    delete peers[connUserSocketId] // delete RTC connection by other users
  }

  // also after disconnecting the stream, remove the stream from store
  const remoteStreams = store.getState().room.remoteStreams
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  )

  store.dispatch(setRemoteStreams(newRemoteStreams))
}

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          )
          break
        }
      }
    }
  }
}
