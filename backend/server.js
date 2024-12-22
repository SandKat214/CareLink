require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

// route imports
const patientRoutes = require("./routes/patientRoutes")
const recordRoutes = require("./routes/recordRoutes")
const userRoutes = require("./routes/userRoutes")
const imageRoutes = require("./routes/imageRoutes")
const eventRoutes = require("./routes/eventRoutes")
const notifyRoutes = require("./routes/notifyRoutes")

// express app
const app = express()
const PORT = process.env.PORT

// middleware
app.use(cors({ credentials: true, origin: [process.env.FRONTEND_URL] }))
app.use(express.json())
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use("/api/patients/", patientRoutes)
app.use("/api/records/", recordRoutes)
app.use("/api/auth/", userRoutes)
app.use("/api/upload/", imageRoutes)
app.use("/api/events/", eventRoutes)
app.use("/api/notify/", notifyRoutes)

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
