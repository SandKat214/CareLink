const express = require('express')

const router = express.Router()

// GET all patients
router.get('/', (req, res) => {
    res.json({msg: "GET all patients"})
})


module.exports = router