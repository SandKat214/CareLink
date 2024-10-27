import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spinner,
	Text,
	Textarea,
	Tooltip,
	VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// icons
import { MdAdd } from "react-icons/md"
import {
	ArrowBackIcon,
	CheckIcon,
	ChevronDownIcon,
	CloseIcon,
} from "@chakra-ui/icons"
import { MdModeEdit } from "react-icons/md"

const PatientRecord = () => {
	const navigate = useNavigate()
	const { patientId } = useParams()
	const { state } = useLocation()

	const [expanded, setExpanded] = useState([])
	const [activeRecord, setActiveRecord] = useState(
		state ? state.transRecord : null
	)
	const [records, setRecords] = useState([])
	const [patient, setPatient] = useState({})
	const [recordToEdit, setRecordToEdit] = useState(null)
	const [newRecord, setNewRecord] = useState(null)
	const [recordData, setRecordData] = useState({
		id: null,
		notes: "",
	})
	console.log(recordData)

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
		retry: 1,
		throwOnError: true,
	})

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

    const resetData = () => {
        setRecordData({
            id: null,
            notes: "",
        })
    }

	useEffect(() => {
		if (activeRecord && records.length > 0) {
			const index = records.findIndex(
				(record) => record._id === activeRecord._id
			)
			setExpanded([index])
			const article = document.getElementById(activeRecord._id)
			article?.scrollIntoView({ behavior: "instant", block: "start" })
		}
	}, [records, activeRecord])

	return (
		<VStack p='20px 60px' h='100%' maxH='100%' width='100%'>
			<VStack
				as='section'
				w='100%'
				gap='30px'
				maxH='100%'
				overflow='hidden'
				p='20px'
			>
				<Flex w='100%' justify='left'>
					<Button
						variant='undo'
						leftIcon={<ArrowBackIcon />}
						onClick={() => {
							navigate("..", { relative: "path" })
						}}
					>
						Back to Patient Details
					</Button>
				</Flex>
				<VStack w='100%' gap='20px'>
					<Flex
						as='header'
						w='100%'
						justify='space-between'
						align='center'
					>
						<Heading as='h3' color='dkGreen' fontSize='20px'>
							{patient.fname} {patient.lname} Record
						</Heading>
						<Tooltip
							hasArrow
							label='Add new record'
							fontSize='12px'
							placement='auto'
							mx='10px'
						>
							<Button
								variant='dkAction'
								leftIcon={<Icon as={MdAdd} />}
							>
								New
							</Button>
						</Tooltip>
					</Flex>
					<Flex w='100%' justify='left' px='10px'>
						<Menu variant='record'>
							<Tooltip
								hasArrow
								label='Jump to record'
								fontSize='12px'
								placement='auto'
								mx='10px'
							>
								<MenuButton>
									<HStack justify='space-between'>
										<Text
											px='5px'
											overflow='hidden'
											whiteSpace='nowrap'
											textOverflow='ellipsis'
										>
											{activeRecord
												? `${new Date(
														activeRecord.apptDate
												  ).toDateString()}`
												: "Jump to Appointment Record"}
										</Text>
										<ChevronDownIcon />
									</HStack>
								</MenuButton>
							</Tooltip>
							<MenuList>
								{records.length > 0 ? (
									records.map((record, index) => {
										const date = new Date(record.apptDate)

										return (
											<MenuItem key={record._id}>
												<Link
													href={`#${record._id}`}
													variant='patient'
													onClick={() => {
														setExpanded([index])
														setActiveRecord(record)
													}}
												>
													{date.toDateString()}
												</Link>
											</MenuItem>
										)
									})
								) : (
									<MenuItem>No Patient Records</MenuItem>
								)}
							</MenuList>
						</Menu>
					</Flex>
				</VStack>
				<VStack
					flex={1}
					w='100%'
					overflow='auto'
					align='right'
					gap='30px'
					px='15px'
				>
					<VStack
						as='article'
						w='100%'
						gap='15px'
						maxH='100%'
						align='flex-start'
					>
						{isLoading ? (
							<Center h='100%' w='100%'>
								<Spinner color='dkGreen' size='xl' />
							</Center>
						) : (
							<Accordion
								variant='record'
								index={expanded}
								w='100%'
								allowToggle
							>
								{records.length > 0 ? (
									records.map((record, index) => {
										const date = new Date(record.apptDate)

										return (
											<AccordionItem
												id={record._id}
												key={record._id}
												as='article'
											>
												{({ isExpanded }) => (
													<>
														<Tooltip
															hasArrow
															label='Expand this record'
															fontSize='12px'
															placement='left'
															isDisabled={
																isExpanded
															}
														>
															<AccordionButton
																onClick={() => {
																	if (
																		isExpanded
																	) {
																		setExpanded(
																			[]
																		)
																		setActiveRecord(
																			null
																		)
																		setRecordToEdit(
																			null
																		)
																	} else {
																		setExpanded(
																			[
																				index,
																			]
																		)
																		setActiveRecord(
																			record
																		)
																	}
																}}
															>
																<AccordionIcon />
																{date.toDateString()}
															</AccordionButton>
														</Tooltip>
														<AccordionPanel>
															<VStack align='flex-start'>
																{recordToEdit &&
																recordToEdit._id ===
																	record._id ? (
																	<>
																		<Textarea
																			defaultValue={
																				record.notes
																			}
																			placeholder='Enter appointment notes...'
																			variant='record'
																			onChange={(
																				e
																			) => {
																				setRecordData((prevData) => ({
                                                                                    ...prevData,
                                                                                    notes: e.target.value
                                                                                }))
																			}}
																		/>
																		<Flex
																			w='100%'
																			justify='right'
																			gap='20px'
																		>
																			<Button
																				variant='alertAction'
																				leftIcon={
																					<CloseIcon />
																				}
																				onClick={() => {
																					setRecordToEdit(
																						null
																					)
                                                                                    resetData()
																				}}
																			>
																				Cancel
																			</Button>
																			<Button
																				variant='dkAction'
																				leftIcon={
																					<CheckIcon />
																				}
																			>
																				Submit
																				Changes
																			</Button>
																		</Flex>
																	</>
																) : (
																	<>
																		<Text>
																			{
																				record.notes
																			}
																		</Text>
																		<Flex
																			w='100%'
																			justify='right'
																		>
																			<Button
																				variant='dkAction'
																				leftIcon={
																					<MdModeEdit />
																				}
																				onClick={() => {
																					setRecordToEdit(
																						record
																					)
																					setRecordData({
                                                                                        id: record._id,
                                                                                        notes: record.notes
                                                                                    })
																				}}
																			>
																				Edit
																			</Button>
																		</Flex>
																	</>
																)}
															</VStack>
														</AccordionPanel>
													</>
												)}
											</AccordionItem>
										)
									})
								) : (
									<Text>No patient records</Text>
								)}
							</Accordion>
						)}
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	)
}

export default PatientRecord
