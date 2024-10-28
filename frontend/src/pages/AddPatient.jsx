import {
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"

const AddPatient = () => {
	const navigate = useNavigate()

	return (
		<VStack p='40px 60px' gap='15px' h='100%' maxH='100%' width='100%'>
			<VStack
				as='section'
				w='100%'
				gap='20px'
				maxH='100%'
				overflow='hidden'
				p='20px'
			>
				<Flex as='header' w='100%' justify='left' align='center'>
					<Heading as='h3' color='dkGreen' fontSize='20px'>
						Add New Patient:
					</Heading>
				</Flex>
				<VStack flex={1} w='100%' overflow='auto' gap='20px' px='15px'>
					<Flex w='100%' justify='left'>
						<Text as='i' color='alert' fontSize='12px'>
							Required Fields *
						</Text>
					</Flex>
					<VStack as='article' w='100%' gap='30px' maxH='100%'>
						<Flex w='100%' gap='70px' justify='center' px='30px'>
							<VStack gap='15px' w='250px'>
								<FormControl>
									<FormLabel variant='patient'>
										First Name:{" "}
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='text' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient first name.
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel variant='patient'>
										Last Name:{" "}
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='text' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient last name.
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel variant='patient'>
										Telephone:
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='text' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient telephone.
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel variant='patient'>
										Email:
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='email' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient email.
									</FormHelperText>
								</FormControl>
							</VStack>
							<VStack gap='15px' w='300px' align='flex-start'>
								<FormControl w='fit-content'>
									<FormLabel variant='patient'>
										DOB:
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='date' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient birthdate.
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel variant='patient'>
										Address:{" "}
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='text' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient address.
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel variant='patient'>
										City:{" "}
										<Text as='span' color='alert'>
											*
										</Text>{" "}
									</FormLabel>
									<Input type='text' variant='patient' />
									<FormHelperText m='0px' fontSize='12px'>
										Patient city.
									</FormHelperText>
								</FormControl>
								<Flex gap='50px'>
									<FormControl w='90px'>
										<FormLabel variant='patient'>
											State:
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Select variant='patient'>
											<option>AL</option>
										</Select>
										<FormHelperText m='0px' fontSize='12px'>
											Patient state.
										</FormHelperText>
									</FormControl>
									<FormControl w='150px'>
										<FormLabel variant='patient'>
											Zip Code:
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input type='text' variant='patient' />
										<FormHelperText m='0px' fontSize='12px'>
											Patient zip.
										</FormHelperText>
									</FormControl>
								</Flex>
								<Flex
									w='100%'
									justify='right'
									gap='20px'
									py='20px'
								>
									<Button
										variant='alertAction'
										leftIcon={<CloseIcon boxSize={2.5} />}
										onClick={() => {
											navigate("..", { relative: "path" })
										}}
									>
										Cancel
									</Button>
									<Button
										variant='dkAction'
										leftIcon={<CheckIcon />}
									>
										Create
									</Button>
								</Flex>
							</VStack>
						</Flex>
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	)
}

export default AddPatient
