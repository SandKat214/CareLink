const mongoose = require("mongoose")

const Schema = mongoose.Schema

const recordSchema = new Schema({
	patientId: {
		type: String,
		required: true,
	},
	apptDate: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model("Record", recordSchema)
