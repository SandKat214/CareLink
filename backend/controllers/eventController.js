const Event = require("../models/eventModel")
const mongoose = require("mongoose")

// GET all events in a date range
const getEvents = async (req, res) => {
	const { start, end } = req.query
	const { userID } = req.params

	// valid mongodDB id convention
	if (!mongoose.Types.ObjectId.isValid(userID)) {
		console.log("Invalid user id for get events.")
		return res
			.status(400)
			.json({ error: "Invalid user id for get events." })
	}

	try {
		const events = await Event.find({
			userID: userID,
			startEvent: {
				$gte: start,
				$lt: end,
			},
		}).sort({ startEvent: 1 })
		res.status(200).json(events)
	} catch (error) {
		res.status(400).json({
			error: "Invalid request from client for matching events.",
		})
	}
}

// CREATE a new event
const createEvent = async (req, res) => {
	try {
		const { userID, attendees, startEvent, endEvent, title } = req.body

		const event = await Event.create({
			userID,
			attendees,
			startEvent,
			endEvent,
			title,
		})
		res.status(200).json(event)
	} catch (error) {
		res.status(400).json({
			error: "Invalid request from client for event creation operation.",
		})
	}
}

// DELETE an event
const deleteEvent = async (req, res) => {
	const { id } = req.params

	// valid mongodDB id convention
	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Invalid event id for delete operation.")
		return res
			.status(400)
			.json({ error: "Invalid event id for delete operation." })
	}

	try {
		const event = await Event.findOneAndDelete({ _id: id })
		if (!event) {
			return res.status(404).json({
				error: "Unable to locate event with that id for delete operation.",
			})
		}
		res.status(200).json(event)
	} catch (error) {
		res.status(400).json({
			error: "Invalid request from client for event delete operation.",
		})
	}
}

module.exports = {
	getEvents,
	createEvent,
	deleteEvent,
}
