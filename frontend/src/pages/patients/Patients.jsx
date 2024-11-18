import {
	Heading,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from "@chakra-ui/react"

const Patients = () => {
	return (
		<VStack mx='auto' align='flex-start' gap='50px' p='100px 50px'>
			<Heading as='h3' fontSize='20px' color='dkGreen'>
				Getting Started with Patient Features:
			</Heading>
			<VStack as='article'>
				<UnorderedList spacing='40px'>
					<ListItem>
						Click on a patient's name in the list to access their
						personal details and record...
					</ListItem>
					<ListItem>
						To find a specific patient, start typing their name into
						the search bar...
					</ListItem>
					<ListItem>
						To add a new patient, click the{" "}
						<Text
							as='span'
							color='dkGreen'
							fontWeight='bold'
							border='1px solid #0F737E'
							p='3px 8px'
							borderRadius='10px'
						>
							+ New
						</Text>{" "}
						button located in the patient list footer...
					</ListItem>
				</UnorderedList>
			</VStack>
		</VStack>
	)
}

export default Patients
