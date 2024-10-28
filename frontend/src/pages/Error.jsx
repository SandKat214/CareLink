import { Button, Center, Heading, Icon, Text, VStack } from "@chakra-ui/react"
import { Link, useRouteError } from "react-router-dom"

// icons
import { IoHome } from "react-icons/io5"

const Error = () => {
	const error = useRouteError()

	return (
		<Center
			as='main'
			w='100%'
			h='100%'
			flexDirection='column'
			flex={1}
			p='50px'
		>
			<VStack as='article' h='fit-content' w='100%' gap='60px'>
				<Heading
					as='h2'
					w='fit-content'
					color='dkNavy'
					fontSize='2.5em'
				>
					Oops!...
				</Heading>
				<VStack
					as='section'
					fontSize='16px'
					maxW='500px'
					textAlign='center'
				>
					<Text as='p'>Something went wrong...</Text>
					<Text as='i'>{error.statusText || error.message}</Text>
				</VStack>
				<Button
					as={Link}
					to='/'
					variant='dkAction'
					leftIcon={<Icon as={IoHome} boxSize={4} />}
				>
					Home
				</Button>
			</VStack>
		</Center>
	)
}

export default Error
