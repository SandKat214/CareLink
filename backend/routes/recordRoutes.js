const express = require("express")
const {
	getRecords,
	createRecord,
	deleteRecord,
	updateRecord,
} = require("../controllers/recordController")

const router = express.Router()

// GET all patients
router.get("/:patientId", getRecords)

// POST a new workout
router.post("/", createRecord)

// DELETE a workout
router.delete("/:id", deleteRecord)

// UPDATE a workout
router.patch("/:id", updateRecord)

module.exports = router
