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
				height: "3px",
				width: "3px",
			},
			"::-webkit-scrollbar-track": {
				background: "background",
				border: "1px solid #343434",
				padding: "2px",
			},
			"::-webkit-scrollbar-thumb": {
				bgColor: "dkGreen",
			},
		},
	},

	components: {
		Button: {
			variants: {
				dkAction: {
					padding: "10px 15px",
					height: "fit-content",
					width: "fit-content",
					color: "dkGreen",
					border: "2px solid #0F737E",
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
                    padding: "10px 15px",
					height: "fit-content",
					width: "fit-content",
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
                }
			},
		},

		Input: {
			variants: {
				searchP: {
					field: {
						borderRadius: "15px",
						border: "2px solid #343434",
						p: "5px 20px",
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
					padding: "5px 30px",
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
			},
		},
	},
})

export default theme
