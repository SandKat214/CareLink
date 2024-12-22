const express = require("express")
const {
	getEvents,
	createEvent,
	deleteEvent,
} = require("../controllers/eventController")
const router = express.Router()

// GET all events within a range
router.get("/:userID/dates", getEvents)

// POST a new event
router.post("/", createEvent)

// DELETE an event
router.delete("/:id", deleteEvent)

module.exports = router
