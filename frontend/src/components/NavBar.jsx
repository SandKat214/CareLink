import { Flex, Heading, Link, Text } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"
import "@fontsource/lalezar"

const NavLinks = () => {
	return (
		<Flex w='fit-content' h='fit-content' gap='30px'>
			<Link as={NavLink} to='/' variant='global'>
				Home
			</Link>
			<Link as={NavLink} to='/patients' variant='global'>
				Patients
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
