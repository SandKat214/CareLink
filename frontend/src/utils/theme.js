import { extendTheme, textDecoration } from "@chakra-ui/react"
import "@fontsource/poppins"

const theme = extendTheme({
	colors: {
		dkNavy: "#0A0058",
		char: "#343434",
		drop: "#34343480",
		background: "#FFFFFF",
		dkGreen: "#0F737E",
		ltGreen: "#00FFD9",
		alert: "#8D0000",
	},

	fonts: {
		heading: `'Poppins', sans-serif`,
		body: `'Poppins', sans-serif`,
	},

	styles: {
		global: {
			"html, body": {
				backgroundColor: "background",
				color: "char",
			},
			"::-webkit-scrollbar": {
				width: "7px",
			},
			"::-webkit-scrollbar-track": {
				background: "background",
				border: "1px solid #343434",
				borderRadius: "40px",
				margin: "3px 0",
			},
			"::-webkit-scrollbar-thumb": {
				bgColor: "dkGreen",
				borderRadius: "40px",
			},
		},
	},

	components: {
		Button: {
			variants: {
                alertAction:  {
					padding: "7px 15px",
					height: "fit-content",
					width: "fit-content",
					color: "alert",
                    fontSize: "14px",
					border: "1px solid #8D0000",
					boxShadow: "0 4px 4px #34343480",
					borderRadius: "15px",
					_hover: {
						color: "background",
						textDecoration: "underline",
						bg: "alert",
						fontStyle: "italic",
						boxShadow: "0 0 20px #8D0000",
					},
				},

				dkAction: {
					padding: "7px 15px",
					height: "fit-content",
					width: "fit-content",
					color: "dkGreen",
                    fontSize: "14px",
					border: "1px solid #0F737E",
					boxShadow: "0 4px 4px #34343480",
					borderRadius: "15px",
					_hover: {
						color: "background",
						textDecoration: "underline",
						bg: "dkGreen",
						fontStyle: "italic",
						boxShadow: "0 0 20px #0F737E",
					},
				},

				ltAction: {
					padding: "7px 15px 7px 10px",
					height: "fit-content",
					width: "fit-content",
                    fontSize: "14px",
					color: "ltGreen",
					border: "1px solid #00FFD9",
					boxShadow: "0 4px 4px #00FFD94D",
					borderRadius: "15px",
					_hover: {
						color: "dkNavy",
						textDecoration: "underline",
						bg: "ltGreen",
						fontStyle: "italic",
						boxShadow: "0 0 20px #00FFD9",
					},
				},
			},
		},

		Input: {
			variants: {
				searchP: {
					field: {
						borderRadius: "15px",
						border: "2px solid #343434",
						p: "5px 20px 5px 35px",
						bg: "background",
						_hover: {
							border: "3px solid #00FFD9",
						},
						_focus: {
							border: "3px solid #00FFD9",
						},
					},
				},
			},
		},

		Link: {
			variants: {
				global: {
					width: "fit-contents",
					height: "fit-contents",
					padding: "5px 20px",
					color: "background",
					bg: "dkNavy",
					border: "1px solid #FFF",
					borderRadius: "40px",
					_hover: {
						color: "dkNavy",
						bg: "ltGreen",
						fontStyle: "italic",
						borderColor: "ltGreen",
						boxShadow: "0 0 20px #00FFD9",
					},
					_activeLink: {
						textDecoration: "underline",
						fontStyle: "italic",
						color: "dkNavy",
						bg: "ltGreen",
						border: "none",
						boxShadow: "0 0 20px #00FFD9",
					},
				},

				patient: {
					_hover: {
						fontStyle: "italic",
						fontWeight: "bold",
						color: "dkGreen",
					},
					_activeLink: {
						textDecoration: "underline",
						fontStyle: "italic",
						fontWeight: "bold",
						color: "dkGreen",
					},
				},
			},
		},
	},
})

export default theme
