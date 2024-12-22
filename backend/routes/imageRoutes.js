const express = require("express")
const Multer = require("multer")
const { createUpload } = require("../controllers/imageController")

const storage = new Multer.memoryStorage()
const upload = Multer({ storage })
const router = express.Router()

// CREATE upload to cloudinary
router.post("/", upload.single("file"), createUpload)

module.exports = router
