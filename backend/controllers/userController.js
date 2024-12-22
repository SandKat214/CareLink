const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

// create web token
const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, {
		expiresIn: "1h",
	})
}

// Log in a user
const loginUser = async (req, res) => {
	const { email, password } = req.body

	try {
		// find user
		const user = await User.login(email, password)

		// create token
		const token = createToken(user._id)

		console.log(`Verified user: ${user.name}`)
		res.status(200).json({ id: user._id, email, name: user.name, token })
	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error: error.message })
	}
}

// Sign up a user
const signupUser = async (req, res) => {
	const { email, password, name } = req.body

	try {
		// save to db
		const user = await User.signup(email, password, name)

		// create token
		const token = createToken(user._id)

		console.log(`User created: ${user.name}`)
		res.status(200).json({ id: user._id, email, name, token })
	} catch (error) {
		console.log(error.message)
		res.status(400).json({ error: error.message })
	}
}

// // Verify a user
// const verifyUser = async (req, res) => {
// 	// verify authentication
// 	const { authorization } = req.headers

// 	if (!authorization) {
// 		console.log("Authentication token required.")
// 		return res.status(401).json({ error: "Authentication token required." })
// 	}

// 	// get the actual token... format: "Bearer {token}"
// 	const token = authorization.split(" ")[1]

// 	try {
// 		const { _id } = jwt.verify(token, process.env.SECRET)

// 		// get user id
// 		const userID = await User.findOne({ _id }).select("_id")
// 		console.log(`User id, ${userID._id}, verified`)
// 		res.status(200).json(userID)
// 	} catch (error) {
// 		console.log(error)
// 		res.status(401).json({ error: "Request not authorized." })
// 	}
// }

module.exports = { loginUser, signupUser }
