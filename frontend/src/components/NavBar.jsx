import { Flex, Heading, HStack, Icon, Link, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import "@fontsource/lalezar"
import { useAuthContext } from "../hooks/useAuthContext"

// icons
import { MdGroups } from "react-icons/md"
import { IoHome } from "react-icons/io5"
import { CalendarIcon } from "@chakra-ui/icons"

const NavLinks = () => {
	return (
		<Flex w='fit-content' h='fit-content' gap='20px'>
			<Link as={NavLink} to='/' variant='global'>
				<HStack gap={2}>
					<Icon as={IoHome} boxSize={4} />
					<Text as='span'>Home</Text>
				</HStack>
			</Link>
			<Link as={NavLink} to='patients' variant='global'>
				<HStack gap={2}>
					<Icon as={MdGroups} boxSize={6} />
					<Text as='span'>Patients</Text>
				</HStack>
			</Link>
			<Link as={NavLink} to='appointments' variant='global'>
				<HStack gap={2}>
					<Icon as={CalendarIcon} boxSize={3.5} />
					<Text as='span'>Appointments</Text>
				</HStack>
			</Link>
		</Flex>
	)
}

const NavBar = () => {
	const { user } = useAuthContext()

	return (
		<Flex
			as='header'
			w='100%'
			justify={user ? "space-between" : "left"}
			align='end'
			gap='40px'
			p='40px 60px'
			bg='dkNavy'
		>
			<Heading
				as='h1'
				fontFamily='lalezar'
				fontSize='3em'
				lineHeight='50%'
				pt='10px'
				color='background'
			>
				CareL
				<Text as='span' color='ltGreen'>
					i
				</Text>
				nk
			</Heading>
			{user && <NavLinks />}
		</Flex>
	)
}

export default NavBar
