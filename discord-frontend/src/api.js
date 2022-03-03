import axios from "axios"
import { logout } from "./shared/utils/auth"

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeout: 1000,
})

// axios interceptor
apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user")

    if (userDetails) {
      const token = JSON.parse(userDetails).token
      // will add to every request that going to the server
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// public routes
export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data)
  } catch (exception) {
    return {
      error: true,
      exception,
    }
  }
}

export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data)
  } catch (exception) {
    return {
      error: true,
      exception,
    }
  }
}

// private/secure routes
export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data)
  } catch (exception) {
    // first check if error is of not authorized
    checkResponseCode(exception)

    // if any other error
    return {
      error: true,
      exception,
    }
  }
}

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status

  if (responseCode) {
    ;(responseCode === 401 || responseCode === 403) && logout()
  }
}
