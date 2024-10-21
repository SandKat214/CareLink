import { Center, VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

// components
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const RootLayout = () => {
	return (
		<VStack w='100vw' h='100vh' justify='space-between' gap={0}>
			<NavBar />
                <Outlet />
			<Footer />
		</VStack>
	)
}

export default RootLayout
