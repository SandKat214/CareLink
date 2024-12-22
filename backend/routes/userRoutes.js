const express = require("express")
const {
	loginUser,
	signupUser,
} = require("../controllers/userController")

const router = express.Router()

// // Verify a user
// router.get("/verify", verifyUser)

// Log in a user
router.post("/login", loginUser)

// Sign up a user
router.post("/signup", signupUser)

module.exports = router
