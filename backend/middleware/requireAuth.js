const axios = require("axios")

const requireAuth = async (req, res, next) => {
	const { authorization } = req.headers

	try {
		// verify authentication
		const user = await axios.get(`${process.env.AUTH_API}verify/`, {
			headers: {
				Authorization: authorization,
			},
		})
		console.log("Request authorized.")

		// attach user._id to req object
		req.user = user.data
		next()
	} catch (error) {
		console.log(error.response.data.error)
		res.status(401).json({ error: "Request not authorized." })
	}
}

module.exports = requireAuth
