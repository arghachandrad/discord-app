import * as api from "../../api"
import { openAlertMessage } from "./alertActions"

const authActions = {
  SET_USER_DETAILS: "SET_USER_DETAILS",
}

export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails, history) =>
      dispatch(register(userDetails, history)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  }
}

// action to set user details(non async func)
const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  }
}

// async action for login
const login = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.login(userDetails)
    console.log("response: ", response)

    if (response.error) {
      // show error message in alert
      dispatch(openAlertMessage(response?.exception?.response?.data))
    } else {
      const { userDetails } = response.data
      localStorage.setItem("user", JSON.stringify(userDetails))
      // setting redux state data
      dispatch(setUserDetails(userDetails))
      history.push("/dashboard")
    }
  }
}

const register = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.register(userDetails)
    console.log("response: ", response)

    if (response.error) {
      // show error message in alert
      dispatch(openAlertMessage(response?.exception?.response?.data))
    } else {
      const { userDetails } = response.data
      localStorage.setItem("user", JSON.stringify(userDetails))
      // setting redux state data
      dispatch(setUserDetails(userDetails))
      history.push("/dashboard")
    }
  }
}

export default authActions
