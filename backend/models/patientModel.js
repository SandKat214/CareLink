const mongoose = require("mongoose")

const Schema = mongoose.Schema

const patientSchema = new Schema({
	userId: {
		type: String,
		required: true,
		trim: true,
	},
	fname: {
		type: String,
		required: true,
		trim: true,
	},
	lname: {
		type: String,
		required: true,
		trim: true,
	},
	telephone: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	state: {
		type: String,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		trim: true,
	},
})

module.exports = mongoose.model("Patient", patientSchema)
