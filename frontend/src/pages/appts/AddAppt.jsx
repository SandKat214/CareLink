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
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useLogout } from "../../hooks/useLogout"

// icons
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"

const AddAppt = () => {
	const { fetchAppts, patients, setPatients, focusDate, year, month } =
		useOutletContext()
	const { user } = useAuthContext()
	const { logout } = useLogout()
	const navigate = useNavigate()
	const toast = useToast()

	// form validation
	const formik = useFormik({
		initialValues: {
			patient: "",
			start: "",
			end: "",
		},
		validationSchema: Yup.object({
			patient: Yup.string().required("Patient is required."),
			start: Yup.string().required("Start time is required."),
			end: Yup.string().required("End time is required."),
		}),
		onSubmit: async (values) => {
			mutateAsync(values)
		},
	})

	// add appointment event
	const { isPending, mutateAsync } = useMutation({
		mutationFn: async (values) => {
			if (!user) {
				throw Error("You must be logged in.")
			}

			try {
				// get patient info
				const patient = await axios.get(
					import.meta.env.VITE_PATIENT_API +
						"patients/" +
						values.patient,
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				)

				// create event
				const data = {
					userID: user.id,
					attendees: [values.patient],
					startEvent: new Date(
						year,
						month,
						focusDate,
						values.start.slice(0, 2),
						values.start.slice(3, 5)
					).toJSON(),
					endEvent: new Date(
						year,
						month,
						focusDate,
						values.end.slice(0, 2),
						values.end.slice(3, 5)
					).toJSON(),
					title: `${patient.data.fname} ${patient.data.lname}`,
				}
				const res = await axios.post(
					`${import.meta.env.VITE_EVENTS_API}`,
					data
				)
				const newAppt = res.data
				toast({
					description: `Appointment for ${newAppt.title} confirmed.`,
					status: "success",
				})
				fetchAppts()
				navigate("..", { relative: "path" })
			} catch (error) {
				console.log(error)

				// User session timout
				if (error.status === 401) {
					setPatients([])
					logout()
					return error
				}

				// other error
				toast({
					description:
						error.response.data.error ||
						"Error saving appointment.",
					status: "error",
				})
				return error
			}
		},
	})

	return (
		<VStack gap='10px' w='100%'>
			<Flex as='header' w='100%' justify='left' align='center'>
				<Heading as='h3' color='dkGreen' fontSize='20px'>
					Add New Appointment:
				</Heading>
			</Flex>
			<VStack w='100%' gap='20px' px='15px'>
				<VStack w='100%' justify='left' gap='10px'>
					<Text as='i' color='char' fontSize='14px' w='100%'>
						Please confirm you have the correct date selected!
					</Text>
					<Text as='i' color='alert' fontSize='12px' w='100%'>
						Required Fields *
					</Text>
				</VStack>
				<VStack as='article' w='100%' gap='30px' align='flex-start'>
					<form
						style={{ width: "100%" }}
						onSubmit={(e) => {
							e.preventDefault()
							formik.handleSubmit()
						}}
					>
						<VStack gap='20px' w='100%'>
							<FormControl>
								<FormLabel variant='patient'>
									Patient:{" "}
									<Text as='span' color='alert'>
										*
									</Text>
								</FormLabel>
								<Select
									w='fit-content'
									variant='patient'
									name='patient'
									value={formik.values.patient}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									placeholder='Choose patient...'
									isRequired
								>
									{patients.map((patient) => {
										return (
											<option
												key={patient._id}
												value={patient._id}
											>
												{`${patient.fname} ${patient.lname}`}
											</option>
										)
									})}
								</Select>
								<FormHelperText
									m='0px'
									fontSize='12px'
									color={
										formik.touched.patient &&
										formik.errors.patient
											? "alert"
											: "char"
									}
								>
									{formik.touched.patient &&
									formik.errors.patient
										? formik.errors.patient
										: "Choose patient."}
								</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel variant='patient'>
									Start Time:{" "}
									<Text as='span' color='alert'>
										*
									</Text>
								</FormLabel>
								<Input
									type='time'
									w='fit-content'
									variant='patient'
									name='start'
									max={formik.values.end}
									value={formik.values.start}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									isRequired
								/>
								<FormHelperText
									m='0px'
									fontSize='12px'
									color={
										formik.touched.start &&
										formik.errors.start
											? "alert"
											: "char"
									}
								>
									{formik.touched.start && formik.errors.start
										? formik.errors.start
										: "Start time."}
								</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel variant='patient'>
									End Time:{" "}
									<Text as='span' color='alert'>
										*
									</Text>
								</FormLabel>
								<Input
									type='time'
									w='fit-content'
									variant='patient'
									name='end'
									min={formik.values.start}
									value={formik.values.end}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									isRequired
								/>
								<FormHelperText
									m='0px'
									fontSize='12px'
									color={
										formik.touched.end && formik.errors.end
											? "alert"
											: "char"
									}
								>
									{formik.touched.end && formik.errors.end
										? formik.errors.end
										: "End time."}
								</FormHelperText>
							</FormControl>
							<Flex w='100%' justify='right' gap='20px' py='20px'>
								<Button
									variant='alertAction'
									leftIcon={<CloseIcon boxSize={2.5} />}
									onClick={() => {
										formik.resetForm()
										navigate("..", {
											relative: "path",
										})
									}}
									isDisabled={isPending}
								>
									Cancel
								</Button>
								<Button
									variant='dkAction'
									leftIcon={<CheckIcon />}
									type='submit'
									isLoading={isPending}
									loadingText='Saving...'
								>
									Confirm
								</Button>
							</Flex>
						</VStack>
					</form>
				</VStack>
			</VStack>
		</VStack>
	)
}

export default AddAppt
