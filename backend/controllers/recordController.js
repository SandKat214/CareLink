const Record = require("../models/recordModel")
const mongoose = require("mongoose")

// GET all records
const getRecords = async (req, res) => {
	const { patientId } = req.params

	if (!mongoose.Types.ObjectId.isValid(patientId)) {
		console.log("Invalid patient id for get all.")
		return res
			.status(400)
			.json({ error: "Invalid patient id for get all." })
	}

	try {
		const records = await Record.find({ patientId: patientId }).sort({
			apptDate: -1,
		})
		console.log("All records retrieved from the db.")
		res.status(200).json(records)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for get all records.",
		})
	}
}

// CREATE a new record
const createRecord = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.body.patientId)) {
		console.log("Invalid patient id for record creation operation.")
		return res.status(400).json({
			error: "Invalid patient id for record creation operation.",
		})
	}

	try {
		const record = await Record.create({
			...req.body,
		})
		console.log(
			`Record for ${new Date(record.apptDate).toUTCString()} created.`
		)
		res.status(200).json(record)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for record creation operation.",
		})
	}
}

// DELETE records by patient id
const deleteRecords = async (req, res) => {
	const { patientId } = req.params

	if (!mongoose.Types.ObjectId.isValid(patientId)) {
		console.log("Invalid patient id for records delete.")
		return res.status(400).json({ error: "Invalid patient id for records delete." })
	}

	try {
		const result = await Record.deleteMany({ patientId: patientId })

		if (!result.acknowledged) {
			console.log(
				"Unable to delete records with that patientId"
			)
			return res.status(404).json({
				error: "Unable to delete records for that patient.",
			})
		}
		console.log(
			`${result.deletedCount} records for patientID: ${patientId} deleted.`
		)
		res.status(200).json(result)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for records delete operation.",
		})
	}
}

// UPDATE a record
const updateRecord = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		console.log("Invalid record id for update.")
		return res.status(400).json({ error: "Invalid record id for update." })
	}

	try {
		const record = await Record.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			}
		)

		if (!record) {
			console.log(
				"Unable to locate record with that id for update operation"
			)
			return res.status(404).json({
				error: "Unable to locate record with that id for update operation.",
			})
		}
		console.log(
			`Record for ${new Date(record.apptDate).toUTCString()} updated.`
		)
		res.status(200).json(record)
	} catch (error) {
		console.log(error.message)
		res.status(400).json({
			error: "Invalid request from client for record update operation.",
		})
	}
}

module.exports = {
	getRecords,
	createRecord,
	deleteRecords,
	updateRecord,
}
