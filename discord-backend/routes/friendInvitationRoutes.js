const express = require("express")
const router = express.Router()
const Joi = require("joi")
const verifyToken = require("../middlewares/auth")
const validator = require("express-joi-validation").createValidator({})
const friendInvitationControllers = require("../controllers/friendInvitation/friendInvitationControllers")

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
})

router.post(
  "/invite",
  verifyToken,
  validator.body(postFriendInvitationSchema),
  friendInvitationControllers.controllers.postInvite
)

module.exports = router
