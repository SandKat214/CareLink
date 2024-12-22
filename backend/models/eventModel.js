const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventSchema = new Schema({
	userID: { type: String, required: true },
	attendees: { type: [String], required: true },
	startEvent: { type: Date, required: true },
	endEvent: { type: Date, required: true },
	title: { type: String, required: true },
})

module.exports = mongoose.model("Event", eventSchema)
