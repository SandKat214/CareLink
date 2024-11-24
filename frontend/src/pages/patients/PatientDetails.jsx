import {
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Input,
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
import { useRef, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"

// components
import AlertModal from "../../components/AlertModal"

// icons
import { FaTrashCan } from "react-icons/fa6"
import { MdModeEdit } from "react-icons/md"
import { IoEye } from "react-icons/io5"
import { ArrowBackIcon } from "@chakra-ui/icons"

const PatientDetails = () => {
	const { patientId } = useParams()
	const { fetchPatients, setPatients } = useOutletContext()
	const { user } = useAuthContext()
	const navigate = useNavigate()
	const { logout } = useLogout()
	const { isOpen, onClose, onOpen } = useDisclosure()
	const toast = useToast()
	const [records, setRecords] = useState([])
	const [patient, setPatient] = useState({})
	const [file, setFile] = useState(null)

	const imageRef = useRef(null)

	// fetch patient from db
	const { isFetching: loadingPatient, refetch: fetchPatient } = useQuery({
		queryKey: ["patient", patientId],
		queryFn: async () => {
			if (!user) {
				throw Error("You must be logged in.")
			}

			try {
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "patients/" + patientId,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				setPatient(res.data)
				return res.data
			} catch (error) {
				console.log(error)

				// User session timout
				if (error.status === 401) {
					toast({
						description: "Session timeout. Please log back in.",
						status: "error",
					})
					setPatients([])
					logout()
					return error
				}

				// other error
				throw new Error("Could not find patient with that id.")
			}
		},
		retry: 1,
		throwOnError: true,
	})

	// fetch patient's records from db
	const { isLoading: loadingRecords, refetch: fetchRecords } = useQuery({
		queryKey: ["records", patientId],
		queryFn: async () => {
			if (!user) {
				throw Error("You must be logged in.")
			}

			try {
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "records/" + patientId,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				setRecords(res.data)
				return res.data
			} catch (error) {
				console.log(error)

				// User session timout
				if (error.status === 401) {
					console.log("timeout")
					setPatients([])
					logout()
					return error
				}

				// other error
				toast({
					description:
						error.response.data.error ||
						"Could not retrieve records for that patient id.",
					status: "error",
				})
				return error
			}
		},
		retry: 1,
	})

	// delete patient and records from db
	const { isPending: pendingDelete, mutateAsync: deletePatient } =
		useMutation({
			mutationFn: async () => {
				if (!user) {
					throw Error("You must be logged in.")
				}

				try {
					await axios.delete(
						`${
							import.meta.env.VITE_PATIENT_API
						}patients/${patientId}`,
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					)
					await axios.delete(
						`${
							import.meta.env.VITE_PATIENT_API
						}records/${patientId}`,
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					)
					toast({
						description: "Patient successfully deleted.",
						status: "success",
					})
					navigate("..", { relative: "path" })
					fetchPatients()
				} catch (error) {
					console.log(error)

					// User session timout
					if (error.status === 401) {
						toast({
							description: "Session timeout. Please log back in.",
							status: "error",
						})
						setPatients([])
						logout()
						return error
					}

					// other error
					toast({
						description:
							error.response.data.error ||
							"Error deleting patient data.",
						status: "error",
					})
					return error
				}
			},
		})

	// image microservice
	const { isPending: pendingURL, mutateAsync: imageUpload } = useMutation({
		mutationFn: async () => {
			if (!user) {
				throw Error("You must be logged in.")
			}

			try {
				const data = new FormData()
				data.append("file", file)
				data.append("storageID", patientId)

				// upload image for url
				const imageRes = await axios.post(
					`${import.meta.env.VITE_IMAGES_API}`,
					data
				)

				// add url to patient information in database
				await axios.patch(
					`${import.meta.env.VITE_PATIENT_API}patients/${patientId}`,
					{ image: imageRes.data },
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				fetchPatient()
				toast({
					description: `Image saved for ${patient.fname} ${patient.lname}.`,
					status: "success",
				})
			} catch (error) {
				console.log(error)

				// User session timout
				if (error.status === 401) {
					console.log("timeout")
					toast({
						description: "Session timeout. Please log back in.",
						status: "error",
					})
					setPatients([])
					logout()
					return error
				}

				toast({
					description:
						error.response.data.message || "Error uploading image.",
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
				message={
					"This action will permanently remove all personal information and record data associated with this patient. Once confirmed, this CANNOT be undone."
				}
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
				<Tooltip
					hasArrow
					label='Delete patient'
					fontSize='12px'
					placement='auto'
					m='5px'
				>
					<Button
						variant='alertAction'
						leftIcon={<Icon as={FaTrashCan} />}
						onClick={() => {
							onOpen()
						}}
						isLoading={pendingDelete}
						loadingText='Deleting...'
					>
						Delete
					</Button>
				</Tooltip>
			</Flex>
			{loadingPatient ? (
				<Center h='100%' w='100%'>
					<Spinner color='dkGreen' size='xl' />
				</Center>
			) : (
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
						<Heading as='h3' color='dkGreen' fontSize='23px'>
							{patient.fname} {patient.lname}
						</Heading>
						<Tooltip
							hasArrow
							label='Edit patient details'
							fontSize='12px'
							placement='auto'
							m='5px'
						>
							<Button
								as={RRLink}
								to='update'
								variant='dkAction'
								leftIcon={<Icon as={MdModeEdit} />}
							>
								Edit
							</Button>
						</Tooltip>
					</Flex>
					<VStack
						flex={1}
						w='100%'
						overflow='auto'
						align='right'
						gap='30px'
						px='15px'
					>
						<Flex as='article' p='0 40px' gap='90px'>
							<Tooltip
								hasArrow
								label={
									patient.image
										? "Edit patient image"
										: "Add patient image"
								}
								fontSize='12px'
								placement='auto'
								m='5px'
							>
								<Box
									boxSize='230px'
									cursor='pointer'
									borderRadius='md'
									onClick={(e) => {
										e.stopPropagation()
										imageRef.current?.click()
									}}
								>
									{pendingURL ? (
										<Center h='100%' w='100%'>
											<Spinner
												color='dkGreen'
												size='xl'
											/>
										</Center>
									) : (
										<>
											<Image
												boxSize='230px'
												borderRadius='md'
												border='4px solid #0F737E'
												objectFit='cover'
												objectPosition='center top'
												src={
													patient.image ??
													"https://res.cloudinary.com/da2twkx0h/image/upload/v1731970283/patient_default.png"
												}
											/>
											<Center
												boxSize='230px'
												borderRadius='md'
												position='relative'
												top='-230px'
												left='0'
												bg='rgba(0,0,0,0.5)'
												justify='right'
												border='4px solid #00FFD9'
												opacity={0}
												_hover={{ opacity: 1 }}
											>
												<Icon
													as={MdModeEdit}
													color='ltGreen'
													boxSize={12}
												/>
											</Center>
										</>
									)}
								</Box>
							</Tooltip>
							<Input
								type='file'
								display='none'
								ref={imageRef}
								accept='image/*'
								onChange={(e) => {
									setFile(e.target.files[0])
									imageUpload()
								}}
							/>
							<VStack align='flex-start' gap='20px'>
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
										{new Date(
											`${patient.dob?.slice(
												0,
												4
											)}, ${patient.dob?.slice(
												5,
												7
											)}, ${patient.dob?.slice(8, 10)}`
										).toLocaleDateString()}
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
								<VStack gap='5px'>
									<Flex w='100%' justify='left'>
										<Heading
											as='h5'
											fontSize='16px'
											color='dkGreen'
											fontWeight='bold'
										>
											Address:
										</Heading>
									</Flex>
									<Text as='p'>{patient.address}</Text>
									<HStack gap='5px'>
										<Text>{patient.city},</Text>
										<Text>{patient.state}</Text>
										<Text>{patient.zip}</Text>
									</HStack>
								</VStack>
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
										Record editing can be done from the
										records page. Follow appointment links
										or view all.
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
										to='record'
										variant='dkAction'
										leftIcon={<Icon as={IoEye} />}
									>
										View All
									</Button>
								</Tooltip>
							</Flex>
							{loadingRecords ? (
								<Center h='100%' w='100%'>
									<Spinner color='dkGreen' size='xl' />
								</Center>
							) : (
								<List spacing='15px' px='50px'>
									{records.length > 0 ? (
										records.map((record) => {
											const date = new Date(
												record.apptDate
											)

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
																transRecord:
																	record,
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
			)}
		</VStack>
	)
}

export default PatientDetails
