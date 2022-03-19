import { setLocalStream } from "../store/actions/roomActions"
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
    // TODO
    // add new remote stream to our server store
    console.log("remote stream came from other user")
    console.log("direct connection has been established")
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
