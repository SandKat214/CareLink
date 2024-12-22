const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
})

// Static signup method
userSchema.statics.signup = async function (email, password, name) {
	// Validation
	if (!email || !password || !name) {
		throw Error("All fields required.")
	}

	if (!validator.isEmail(email)) {
		throw Error("Email must be valid.")
	}

	if (!validator.isStrongPassword(password)) {
		throw Error("Password not strong enough.")
	}

	const exists = await this.findOne({ email })

	if (exists) {
		throw Error("Email already in use.")
	}

	// encrypt password
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)

	// create new user
	const user = await this.create({ email, password: hash, name })
	return user
}

// Static login method
userSchema.statics.login = async function (email, password) {
	// Validation
	if (!email || !password) {
		throw Error("All fields required.")
	}

	const user = await this.findOne({ email })

	// Verify user exists
	if (!user) {
		throw Error("Invalid credentials.")
	}

	// Compare given password to db password
	const match = await bcrypt.compare(password, user.password)
	if (!match) {
		throw Error("Invalid credentials.")
	}
	return user
}

module.exports = mongoose.model("User", userSchema)
