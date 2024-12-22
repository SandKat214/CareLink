const emailjs = require("@emailjs/nodejs")

// SEND notification via emailjs
const createEmail = async (req, res) => {
	try {
		const template = {
			fromName: req.body.fromName,
			toName: req.body.toName,
			replyEmail: req.body.replyEmail,
			toEmail: req.body.toEmail,
			subject: req.body.subject,
			message: req.body.message,
		}

		const response = await emailjs.send(
			process.env.SERVICE_ID,
			process.env.TEMPLATE_ID,
			template,
			{
				publicKey: process.env.PUBLIC_KEY,
				privateKey: process.env.PRIVATE_KEY,
			}
		)

		console.log(`Status: ${response.status}, ${response.text}`)
		res.status(200).json({ message: "Notification successfully sent." })
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "Error sending notification." })
	}
}

module.exports = {
	createEmail,
}
