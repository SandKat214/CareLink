import { extendTheme } from "@chakra-ui/react"
import "@fontsource/poppins"

const theme = extendTheme({
	colors: {
		primary: "#0A0058",
		secondary: "#343434",
		background: "#FFFFFF",
		dkAccent: "#0F737E",
		ltAccent: "#00FFD9",
		alert: "#8D0000",
	},

	fonts: {
		heading: `'Poppins', sans-serif`,
		body: `'Poppins', sans-serif`,
	},
})

export default theme
