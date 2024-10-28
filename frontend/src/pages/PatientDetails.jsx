import {
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Link,
	List,
	ListItem,
	Spinner,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react"
import {
	Link as RRLink,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

// icons
import { FaTrashCan } from "react-icons/fa6"
import { MdModeEdit } from "react-icons/md"
import { IoEye } from "react-icons/io5"
import { ArrowBackIcon } from "@chakra-ui/icons"
import AlertModal from "../components/AlertModal"

const PatientDetails = () => {
	const { patientId } = useParams()
	const [fetchPatients] = useOutletContext()
	const navigate = useNavigate()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const toast = useToast()

	const [records, setRecords] = useState([])
	const [patient, setPatient] = useState({})

	// fetch patient from db
	const {} = useQuery({
		queryKey: ["patient", patientId],
		queryFn: async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "patients/" + patientId
				)
				setPatient(res.data)
				return res.data
			} catch (error) {
				console.log(error.message)
				throw new Error("Could not find patient with that id.")
			}
		},
		retry: 0,
		throwOnError: true,
	})

	// fetch patient's records from db
	const { isLoading, refetch: fetchRecords } = useQuery({
		queryKey: ["records", patientId],
		queryFn: async () => {
			try {
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "records/" + patientId
				)
				setRecords(res.data)
				return res.data
			} catch (error) {
				console.log(error.message)
				toast({
					description:
						"Could not retrieve records for that patient id",
					status: "error",
				})
				return error
			}
		},
		retry: 1,
	})

	// delete patient and records from db
	const { isPending, mutateAsync: deletePatient } = useMutation({
		mutationFn: async () => {
			try {
				await axios.delete(
					`${import.meta.env.VITE_PATIENT_API}patients/${patientId}`
				)
				await axios.delete(
					`${import.meta.env.VITE_PATIENT_API}records/${patientId}`
				)
				fetchPatients()
				navigate("..", { relative: "path" })
			} catch (error) {
				console.log(error.message)
				toast({
					description: "Error deleting patient data.",
					status: "error",
				})
				return error
			}
		},
	})

	return (
		<VStack p='40px 60px' gap='15px' h='100%' maxH='100%' width='100%'>
			<AlertModal
				isOpen={isOpen}
				onClose={onClose}
				message={`This action will permanently remove all personal information and record data associated with this patient. Once confirmed, this CANNOT be undone.`}
				callBack={deletePatient}
			/>
			<Flex w='100%' justify='space-between'>
				<Button
					variant='undo'
					leftIcon={<ArrowBackIcon />}
					onClick={() => {
						navigate("..", { relative: "path" })
					}}
				>
					Back to overview
				</Button>
				<Button
					variant='alertAction'
					leftIcon={<Icon as={FaTrashCan} />}
					onClick={() => {
						onOpen()
					}}
					isLoading={isPending}
					loadingText='Deleting...'
				>
					Delete
				</Button>
			</Flex>
			<VStack
				as='section'
				w='100%'
				gap='20px'
				maxH='100%'
				overflow='hidden'
				p='20px'
			>
				<Flex
					as='header'
					w='100%'
					justify='space-between'
					align='center'
				>
					<Heading as='h3' color='dkGreen' fontSize='20px'>
						{patient.fname} {patient.lname}
					</Heading>
					<Button
						variant='dkAction'
						leftIcon={<Icon as={MdModeEdit} />}
					>
						Edit
					</Button>
				</Flex>
				<VStack
					flex={1}
					w='100%'
					overflow='auto'
					align='right'
					gap='30px'
					px='15px'
				>
					<Flex as='article' p='0 40px' gap='70px'>
						<VStack justify='right' gap='10px'>
							<HStack w='100%'>
								<Heading
									as='h5'
									fontSize='16px'
									color='dkGreen'
									fontWeight='bold'
								>
									DOB:
								</Heading>
								<Text as='p' fontSize='16px'>
									{new Date(patient.dob).toLocaleDateString()}
								</Text>
							</HStack>
							<HStack w='100%'>
								<Heading
									as='h5'
									fontSize='16px'
									color='dkGreen'
									fontWeight='bold'
								>
									Phone:
								</Heading>
								<Text as='p' fontSize='16px'>
									{patient.telephone}
								</Text>
							</HStack>
							<HStack w='100%'>
								<Heading
									as='h5'
									fontSize='16px'
									color='dkGreen'
									fontWeight='bold'
								>
									Email:
								</Heading>
								<Text as='p' fontSize='16px'>
									{patient.email}
								</Text>
							</HStack>
						</VStack>
						<VStack gap='5px'>
							<Text as='p'>{patient.address}</Text>
							<HStack gap='5px'>
								<Text>{patient.city},</Text>
								<Text>{patient.state}</Text>
								<Text>{patient.zip}</Text>
							</HStack>
						</VStack>
					</Flex>
					<VStack
						as='article'
						w='100%'
						gap='15px'
						maxH='100%'
						align='flex-start'
					>
						<Flex
							as='header'
							w='100%'
							justify='space-between'
							gap='20px'
							p='10px'
						>
							<VStack gap='3px' align='flex-start'>
								<Heading
									as='h4'
									fontSize='18px'
									color='dkGreen'
								>
									Patient History:
								</Heading>
								<Text as='p' fontSize='16px' px='10px'>
									Record editing can be done from the records
									page. Follow appointment links or view all.
								</Text>
							</VStack>
							<Tooltip
								hasArrow
								label='Navigate to all records'
								fontSize='12px'
								placement='auto'
								mx='10px'
							>
								<Button
									as={RRLink}
									to={"record"}
									variant='dkAction'
									leftIcon={<Icon as={IoEye} />}
								>
									View All
								</Button>
							</Tooltip>
						</Flex>
						{isLoading ? (
							<Center h='100%' w='100%'>
								<Spinner color='dkGreen' size='xl' />
							</Center>
						) : (
							<List spacing='15px' px='50px'>
								{records.length > 0 ? (
									records.map((record) => {
										const date = new Date(record.apptDate)

										return (
											<ListItem
												key={record._id}
												fontWeight='bold'
											>
												<Tooltip
													hasArrow
													label='Navigate to this record'
													fontSize='12px'
													placement='auto'
													mx='10px'
												>
													<Link
														as={RRLink}
														to={`record#${record._id}`}
														state={{
															transRecord: record,
														}}
														variant='patient'
													>
														{date.toDateString()}
													</Link>
												</Tooltip>
											</ListItem>
										)
									})
								) : (
									<ListItem>No patient records</ListItem>
								)}
							</List>
						)}
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	)
}

export default PatientDetails
