const express = require("express")
const cloudinary = require("cloudinary").v2
const Multer = require("multer")

const router = express.Router()

const storage = new Multer.memoryStorage()
const upload = Multer({ storage })

// cloudinary upload
const handleUpload = async (file, publicID) => {
    const res = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        resource_type: "auto",
        public_id: publicID,
    })
    return res
}

// receive file request
router.post("/", upload.single("file"), async (req, res) => {
    try {
        const base64 = Buffer.from(req.file.buffer).toString("base64")
        const data = "data:" + req.file.mimetype + ";base64," + base64
        const cloudRes = await handleUpload(data, req.body.storageID)
        res.status(200).json(cloudRes.secure_url)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "Could not complete image upload." })
    }
})

module.exports = router

