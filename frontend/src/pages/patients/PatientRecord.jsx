import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
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
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"

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
	const toast = useToast()

	const [expanded, setExpanded] = useState([])
	const [activeRecord, setActiveRecord] = useState(state?.transRecord ?? null)
	const [records, setRecords] = useState([])
	const [patient, setPatient] = useState({})
	const [newRecord, setNewRecord] = useState(false)

	// form validation
	const formik = useFormik({
		initialValues: {
			id: null,
			patientId: patientId,
			apptDate: new Date(),
			notes: "",
		},
		validationSchema: Yup.object({
			notes: Yup.string().required("A note is required."),
		}),
		onSubmit: async (values) => {
			mutateAsync(values)
		},
	})

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

	// fetch patients records from db
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
				throw new Error(
					"Could not retrieve the records for that patient."
				)
			}
		},
		retry: 0,
		throwOnError: true,
	})

	// add and edit records in db
	const { isPending, mutateAsync } = useMutation({
		mutationFn: async (values) => {
			try {
				// if this is an edit
				if (values.id) {
					const data = {
						notes: values.notes,
					}
					await axios.patch(
						`${import.meta.env.VITE_PATIENT_API}records/${
							values.id
						}`,
						data
					)
				} else {
					// else it's a create
					const data = {
						patientId: values.patientId,
						apptDate: values.apptDate,
						notes: values.notes,
					}
					await axios.post(
						`${import.meta.env.VITE_PATIENT_API}records/`,
						data
					)
				}
				toast({ description: "Submission saved.", status: "success" })
				setNewRecord(false)
				formik.resetForm()
				fetchRecords()
			} catch (error) {
				console.log(error)
				toast({
					description:
						error.response.data.error || "Error saving submission.",
					status: "error",
				})
				return error
			}
		},
	})

	// undo new record
	const undoNew = () => {
		setNewRecord(false)
		formik.resetForm()
	}

	// initiate edit
	const initEdit = (record, index) => {
		setExpanded([index])
		setActiveRecord(record)
		formik.setValues({
			id: record._id,
			patientId: patientId,
			apptDate: new Date(record.apptDate),
			notes: record.notes,
		})
	}

	useEffect(() => {
		// expand record if it's link was chosen from the patient details page
		if (activeRecord && records.length > 0) {
			const index = records.findIndex(
				(record) => record._id === activeRecord._id
			)
			setExpanded([index])
			const article = document.getElementById(activeRecord._id)
			article?.scrollIntoView({ behavior: "instant", block: "start" })
		}
	}, [records])

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
								onClick={() => {
									setActiveRecord(null)
									formik.resetForm()
									setNewRecord(true)
									setExpanded([0])
								}}
								isDisabled={newRecord}
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
													as='a'
													href={`#${record._id}`}
													variant='patient'
													onClick={() => {
														undoNew()
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
								allowMultiple
							>
								{newRecord && (
									<AccordionItem>
										{({ isExpanded }) => (
											<>
												<AccordionButton
													onClick={() => {
														if (isExpanded) {
															// close new form and reset form
															setExpanded(
																expanded.filter(
																	(index) =>
																		index !==
																		0
																)
															)
															undoNew()
														}
													}}
												>
													<AccordionIcon />
													{formik.values.apptDate.toDateString()}
												</AccordionButton>
												<AccordionPanel>
													<VStack align='flex-start'>
														<form
															style={{
																width: "100%",
															}}
															onSubmit={(e) => {
																e.preventDefault()
																formik.handleSubmit()
															}}
														>
															<FormControl>
																<Textarea
																	defaultValue={
																		formik
																			.values
																			.notes
																	}
																	placeholder='Enter appointment notes...'
																	variant='record'
																	name='notes'
																	isRequired
																	onChange={
																		formik.handleChange
																	}
																/>
																{formik.errors
																	.notes && (
																	<FormHelperText
																		color='alert'
																		fontSize='12px'
																	>
																		{
																			formik
																				.errors
																				.notes
																		}
																	</FormHelperText>
																)}
																<FormHelperText
																	color='char'
																	fontSize='12px'
																>
																	Enter new
																	appointment
																	notes.
																</FormHelperText>
																<Flex
																	w='100%'
																	justify='right'
																	gap='20px'
																	pt='20px'
																>
																	<Button
																		variant='alertAction'
																		leftIcon={
																			<CloseIcon
																				boxSize={
																					2.5
																				}
																			/>
																		}
																		onClick={() => {
																			undoNew()
																		}}
																		isDisabled={
																			isPending
																		}
																	>
																		Cancel
																	</Button>
																	<Button
																		variant='dkAction'
																		leftIcon={
																			<CheckIcon />
																		}
																		type='submit'
																		isLoading={
																			isPending
																		}
																		loadingText='Saving...'
																	>
																		Submit
																		Record
																	</Button>
																</Flex>
															</FormControl>
														</form>
													</VStack>
												</AccordionPanel>
											</>
										)}
									</AccordionItem>
								)}
								{records.length > 0 ? (
									records.map((record, index) => {
										const date = new Date(record.apptDate)

										return (
											<article
												key={record._id}
												id={record._id}
											>
												<AccordionItem>
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
																			// remove index from expanded array and reset activeRecord
																			setExpanded(
																				expanded.filter(
																					(
																						item
																					) =>
																						item !==
																						index
																				)
																			)
																			if (
																				activeRecord._id ===
																				record._id
																			) {
																				setActiveRecord(
																					expanded.length <=
																						1
																						? null
																						: records[
																								expanded[0]
																						  ]
																				)
																			}

																			if (
																				formik
																					.values
																					.id
																			) {
																				formik.resetForm()
																			}
																		} else {
																			undoNew()
																			setExpanded(
																				[
																					...expanded,
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
																	{formik
																		.values
																		.id ===
																	record._id ? (
																		<form
																			style={{
																				width: "100%",
																			}}
																			onSubmit={(
																				e
																			) => {
																				e.preventDefault()
																				formik.handleSubmit()
																			}}
																		>
																			<FormControl>
																				<Textarea
																					defaultValue={
																						record.notes
																					}
																					placeholder='Enter appointment notes...'
																					variant='record'
																					name='notes'
																					isRequired
																					onChange={
																						formik.handleChange
																					}
																				/>
																				{formik
																					.errors
																					.notes && (
																					<FormHelperText
																						color='alert'
																						fontSize='12px'
																					>
																						{
																							formik
																								.errors
																								.notes
																						}
																					</FormHelperText>
																				)}
																				<FormHelperText
																					color='alert'
																					fontSize='12px'
																				>
																					Edits
																					to
																					patient
																					records
																					cannot
																					be
																					reversed
																					once
																					submitted.
																				</FormHelperText>
																				<Flex
																					w='100%'
																					justify='right'
																					gap='20px'
																					pt='20px'
																				>
																					<Button
																						variant='alertAction'
																						leftIcon={
																							<CloseIcon
																								boxSize={
																									2.5
																								}
																							/>
																						}
																						onClick={() => {
																							formik.resetForm()
																						}}
																						isDisabled={
																							isPending
																						}
																					>
																						Cancel
																					</Button>
																					<Button
																						variant='dkAction'
																						leftIcon={
																							<CheckIcon />
																						}
																						type='submit'
																						isLoading={
																							isPending
																						}
																						loadingText='Saving...'
																					>
																						Submit
																						Changes
																					</Button>
																				</Flex>
																			</FormControl>
																		</form>
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
																						initEdit(
																							record,
																							index
																						)
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
											</article>
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
