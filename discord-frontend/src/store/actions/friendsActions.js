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
  }
}

export const setPendingFriendsInvitations = (pendingFriendInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendInvitations,
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
