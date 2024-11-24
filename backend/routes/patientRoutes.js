const express = require("express")
const {
	getPatients,
	getPatient,
	getPatientsQ,
	createPatient,
	deletePatient,
	updatePatient,
} = require("../controllers/patientController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

// authenticate
router.use(requireAuth)

// GET all patients
router.get("/", getPatients)

// GET a single patient
router.get("/:id", getPatient)

// GET by search value
router.get("/search/query", getPatientsQ)

// POST a new patient
router.post("/", createPatient)

// DELETE a patient
router.delete("/:id", deletePatient)

// UPDATE a patient
router.patch("/:id", updatePatient)

module.exports = router
