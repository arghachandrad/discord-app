// responsible for checking the token which is attached to socket events
const jwt = require("jsonwebtoken")

const config = process.env

const verifyTokenSocket = (socket, next) => {
  const token = socket.handshake.auth?.token

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    // to socket events attach the user
    socket.user = decoded
  } catch (err) {
    const socketError = new Error("NOT_AUTHORIZED")
    return next(socketError)
  }

  next()
}

module.exports = verifyTokenSocket
