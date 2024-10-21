require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const patientRoutes = require("./routes/patientRoutes")
const recordRoutes = require("./routes/recordRoutes")

// express app
const app = express()
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use("/api/patients/", patientRoutes)
app.use("/api/records/", recordRoutes)

// connect to db
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// server
		app.listen(PORT, () => {
			console.log(
				`Connected to db and listening on http://localhost:${PORT}....`
			)
		})
	})
	.catch((error) => {
		console.log(error)
	})
