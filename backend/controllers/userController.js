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

module.exports = { loginUser, signupUser }
