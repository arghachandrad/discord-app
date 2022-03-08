import * as api from "../../api"
import { openAlertMessage } from "./alertActions"

export const friendsActions = {
  SET_FRIENDS: "SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATIONS: "SET_PENDING_FRIENDS_INVITATIONS",
  SET_ONLINE_USERS: "SET_ONLINE_USERS",
}

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    setPendingFriendsInvitations: (pendingFriendInvitations) =>
      dispatch(setPendingFriendsInvitations(pendingFriendInvitations)),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  }
}

export const setPendingFriendsInvitations = (pendingFriendInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendInvitations,
  }
}

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  }
}

export const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data)

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation has been sent"))
      closeDialogHandler()
    }
  }
}

export const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data)
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation accepted"))
    }
  }
}
export const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data)
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
      dispatch(openAlertMessage("Invitation declined"))
    }
  }
}
