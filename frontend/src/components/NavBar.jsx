import { Flex, Heading, HStack, Icon, Link, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import "@fontsource/lalezar"

// icons
import { MdGroups } from "react-icons/md"
import { IoHome } from "react-icons/io5"

const NavLinks = () => {
	return (
		<Flex w='fit-content' h='fit-content' gap='20px'>
			<Link as={NavLink} to='/' variant='global'>
				<HStack gap={2}>
					<Icon as={IoHome} boxSize={4} />
					<Text as='span'>Home</Text>
				</HStack>
			</Link>
			<Link as={NavLink} to='/patients' variant='global'>
				<HStack gap={2}>
					<Icon as={MdGroups} boxSize={6} />
					<Text as='span'>Patients</Text>
				</HStack>
			</Link>
		</Flex>
	)
}

const NavBar = () => {
	return (
		<Flex
			as='header'
			w='100%'
			justify='space-between'
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
			<NavLinks />
		</Flex>
	)
}

export default NavBar
