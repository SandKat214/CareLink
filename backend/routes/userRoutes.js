const express = require("express")
const {
	loginUser,
	signupUser,
} = require("../controllers/userController")

const router = express.Router()

// Log in a user
router.post("/login", loginUser)

// Sign up a user
router.post("/signup", signupUser)

module.exports = router
