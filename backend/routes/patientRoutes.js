const express = require("express")
const {
	getPatients,
	getPatient,
	getPatientsQ,
	createPatient,
	deletePatient,
	updatePatient,
} = require("../controllers/patientController")

const router = express.Router()

// GET all patients
router.get("/", getPatients)

// GET a single patient
router.get("/:id", getPatient)

// GET by search value
router.get("/search/:q", getPatientsQ)

// POST a new workout
router.post("/", createPatient)

// DELETE a workout
router.delete("/:id", deletePatient)

// UPDATE a workout
router.patch("/:id", updatePatient)

module.exports = router
