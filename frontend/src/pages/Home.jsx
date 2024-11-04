import { Button, Center, Heading, Icon, Text, VStack } from "@chakra-ui/react"
import "@fontsource/lalezar"
import { Link } from "react-router-dom"

// icons
import { MdGroups } from "react-icons/md"

const Home = () => {
	return (
		<Center as='main' w='100%' h='100%' flexDirection='column'>
			<VStack as='article' h='fit-content' w='100%' gap='40px'>
				<Heading
					as='h2'
					w='fit-content'
					color='dkNavy'
					fontSize='2.5em'
				>
					<Heading
						as='span'
						fontFamily='lalezar'
						lineHeight='50%'
						pt='10px'
						fontSize='1.25em'
					>
						CareL
						<Text
							as='span'
							color='ltGreen'
							textShadow='-0.5px 0.5px 0 black,
                                        0.5px 0.5px 0 #0A0058,
                                        0.5px -0.5px 0 #0A0058,
                                        -0.5px -0.5px 0 #0A0058'
						>
							i
						</Text>
						nk
					</Heading>{" "}
					Home
				</Heading>
				<VStack
					as='section'
					fontSize='16px'
					maxW='500px'
					textAlign='center'
				>
					<Text as='p'>
						Welcome to CareLink! Your one-stop solution for
						organizing all your patient information & appointments.
					</Text>
					<Text as='p'>
						To begin, simpy navigate to the Patients page using the
						navigation bar or click the quick link below.
					</Text>
					<Text as='p'>
						After adding patients to your practice, navigate to the appointments page to start the scheduling process.
					</Text>				
				</VStack>
				<Button
					as={Link}
					to='/patients'
					variant='dkAction'
					leftIcon={<Icon as={MdGroups} boxSize={6} />}
				>
					Get Started with Patients
				</Button>
			</VStack>
		</Center>
	)
}

export default Home
