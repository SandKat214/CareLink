const express = require("express")
const { createEmail } = require("../controllers/notifyController")

const router = express.Router()

// POST notification
router.post("/", createEmail)

module.exports = router
