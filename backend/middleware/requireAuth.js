const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		console.log("Authentication token required.")
		return res.status(401).json({ error: "Authentication token required." })
	}

	// get the actual token... format: "Bearer {token}"
	const token = authorization.split(" ")[1]

	try {
		const { _id } = jwt.verify(token, process.env.SECRET)

		// get user id
		const userID = await User.findOne({ _id }).select("_id")
		console.log("Request authorized.")

		// attach user._id to req object
		req.user = userID
		next()
	} catch (error) {
		console.log(error)
		res.status(401).json({ error: "Request not authorized." })
	}
}

module.exports = requireAuth
