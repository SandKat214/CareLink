require('dotenv').config()

const express = require('express')
const patientRoutes = require('./routes/patients')

// express app
const app = express()
const PORT = process.env.PORT

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/patients/', patientRoutes)

// server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}....`)
})