const express = require("express")
const {
	getRecords,
	createRecord,
	deleteRecords,
	updateRecord,
} = require("../controllers/recordController")
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// authenticate
router.use(requireAuth)

// GET all records for a patient
router.get("/:patientId", getRecords)

// POST a new record for a patient
router.post("/", createRecord)

// DELETE patient records
router.delete("/:patientId", deleteRecords)

// UPDATE a record
router.patch("/:id", updateRecord)

module.exports = router
