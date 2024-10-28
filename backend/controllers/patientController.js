const Patient = require("../models/patientModel")
const mongoose = require("mongoose")

// GET all patients
const getPatients = async (req, res) => {
	try {
		const patients = await Patient.find().sort({ lname: 1 })
		console.log("All patients retrieved from the db.")
		res.status(200).json(patients)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for get all patients.",
		})
	}
}

// GET a single workout
const getPatient = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Invalid patient id for get.")
		return res.status(400).json({ error: "Invalid patient id for get." })
	}

	try {
		const patient = await Patient.findById(id)
		if (!patient) {
			console.log("Could not get that patient.")
			return res
				.status(404)
				.json({ error: "Patient id does not exist for get." })
		}
		console.log(
			`Patient with that id, ${patient.fname} ${patient.lname}, retrieved.`
		)
		res.status(200).json(patient)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for get patient by id.",
		})
	}
}

// GET patients by search query
const getPatientsQ = async (req, res) => {
	const { q } = req.params
	const regex = new RegExp(q, "i")

	try {
		const patients = await Patient.find({
			$or: [
				{ fname: regex },
				{ lname: regex }
			]
		})
		console.log("Matching patients retrieved from the db.")
		res.status(200).json(patients)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for matching patients.",
		})
	}
}

// CREATE a new patient
const createPatient = async (req, res) => {
	try {
		const patient = await Patient.create({
			...req.body,
		})
		console.log(`Patient ${patient.lname}, ${patient.fname} created.`)
		res.status(200).json(patient)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for patient creation operation.",
		})
	}
}

// DELETE a patient
const deletePatient = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Invalid patient id for delete.")
		return res.status(400).json({ error: "Invalid patient id for delete." })
	}

	try {
		const patient = await Patient.findOneAndDelete({ _id: id })

		if (!patient) {
			console.log(
				"Unable to locate patient with that id for delete operation"
			)
			return res.status(404).json({
				error: "Unable to locate patient with that id for delete operation.",
			})
		}
		console.log(`Patient ${patient.lname}, ${patient.fname} deleted.`)
		res.status(200).json(patient)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for patient delete operation.",
		})
	}
}

// UPDATE a patient
const updatePatient = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Invalid patient id for update.")
		return res.status(400).json({ error: "Invalid patient id for update." })
	}

	try {
		const patient = await Patient.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			}
		)

		if (!patient) {
			console.log(
				"Unable to locate patient with that id for update operation"
			)
			return res.status(404).json({
				error: "Unable to locate patient with that id for update operation.",
			})
		}
		console.log(`Patient ${patient.lname}, ${patient.fname} updated.`)
		res.status(200).json(patient)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for patient update operation.",
		})
	}
}

module.exports = {
	getPatients,
	getPatient,
	getPatientsQ,
	createPatient,
	deletePatient,
	updatePatient,
}
