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
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { states } from "../utils/states"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

// icons
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { useState } from "react"

const EditPatient = () => {
	const maxDate = new Date().toLocaleDateString("en-CA")

	const { patientId } = useParams()
    const navigate = useNavigate()
	const toast = useToast()
	const [fetchPatients] = useOutletContext()

    const [patient, setPatient] = useState()

	const formik = useFormik({
		initialValues: {
			fname: patient?.fname || "",
			lname: patient?.lname || "",
			telephone: patient?.telephone.split("-").join("") || "",
			email: patient?.email || "",
			dob: patient?.dob || "",
			address: patient?.dob || "",
			city: patient?.city || "",
			state: patient?.state || "",
			zip: patient?.zip || "",
		},
		validationSchema: Yup.object({
			fname: Yup.string().required("First name is required."),
			lname: Yup.string().required("Last name is required."),
			telephone: Yup.string()
				.required("Telephone is required.")
				.matches(/\d{10}/, "Field must 10 digits only.")
				.max(10, "Field must be 10 digits only."),
			email: Yup.string()
				.email("Must be a valid email.")
				.required("Email is required"),
			dob: Yup.string().required("Birthdate is required."),
			address: Yup.string().required("Address is required."),
			city: Yup.string().required("City is requried."),
			state: Yup.string().required("State is required."),
			zip: Yup.string()
				.required("Zip is required.")
				.matches(/[0-9]*/, "Field must contain only digits")
				.test(
					"len",
					"Must be 5 digits in length.",
					(val) => val.length === 5
				),
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
					`${import.meta.env.VITE_PATIENT_API}patients/${patientId}`
				)
                const patient = res.data
                formik.setValues({
                    fname: patient.fname,
                    lname: patient.lname,
                    telephone: patient.telephone.split("-").join(""),
                    email: patient.email,
                    dob: patient.dob.slice(0, 10),
                    address: patient.address,
                    city: patient.city,
                    state: patient.state,
                    zip: patient.zip,
                })
				setPatient(patient)
				return patient
			} catch (error) {
				console.log(error)
				throw new Error("Could not find patient with that id.")
			}
		},
		retry: 0,
		throwOnError: true,
	})

	const { isPending, mutateAsync } = useMutation({
		mutationFn: async (values) => {
			try {
				// update patient
				const data = {
					fname: values.fname,
					lname: values.lname,
					telephone:
						values.telephone.substr(0, 3) +
						"-" +
						values.telephone.substr(3, 3) +
						"-" +
						values.telephone.substr(6),
					email: values.email,
					dob: new Date(values.dob).toJSON(),
					address: values.address,
					city: values.city,
					state: values.state,
					zip: values.zip,
				}

				const res = await axios.patch(
					`${import.meta.env.VITE_PATIENT_API}patients/${patientId}`,
					data
				)
				const newPatient = res.data
				toast({
					description: `Patient ${newPatient.fname} ${newPatient.lname} updated.`,
					status: "success",
				})
				fetchPatients()
				navigate("..", { relative: "path" })
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
						Edit Patient:
					</Heading>
				</Flex>
				<VStack flex={1} w='100%' overflow='auto' gap='20px' px='15px'>
					<Flex w='100%' justify='left'>
						<Text as='i' color='alert' fontSize='12px'>
							Required Fields *
						</Text>
					</Flex>
					<VStack as='article' w='100%' gap='30px' maxH='100%'>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								formik.handleSubmit()
							}}
						>
							<Flex
								w='100%'
								gap='70px'
								justify='center'
								px='30px'
							>
								<VStack gap='15px' w='250px'>
									<FormControl>
										<FormLabel variant='patient'>
											First Name:{" "}
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='fname'
											value={formik.values.fname}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient first name...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.fname &&
												formik.errors.fname
													? "alert"
													: "char"
											}
										>
											{formik.touched.fname &&
											formik.errors.fname
												? formik.errors.fname
												: "Patient first name."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Last Name:{" "}
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='lname'
											value={formik.values.lname}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient last name...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.lname &&
												formik.errors.lname
													? "alert"
													: "char"
											}
										>
											{formik.touched.lname &&
											formik.errors.lname
												? formik.errors.lname
												: "Patient last name."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Telephone:
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='telephone'
											value={formik.values.telephone}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient phone#...'
											maxLength={10}
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.telephone &&
												formik.errors.telephone
													? "alert"
													: "char"
											}
										>
											{formik.touched.telephone &&
											formik.errors.telephone
												? formik.errors.telephone
												: "Patient telephone."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Email:
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='email'
											variant='patient'
											name='email'
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient email...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.email &&
												formik.errors.email
													? "alert"
													: "char"
											}
										>
											{formik.touched.email &&
											formik.errors.email
												? formik.errors.email
												: "Patient email."}
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
										<Input
											type='date'
											variant='patient'
											name='dob'
											max={maxDate}
											value={formik.values.dob}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.dob &&
												formik.errors.dob
													? "alert"
													: "char"
											}
										>
											{formik.touched.dob &&
											formik.errors.dob
												? formik.errors.dob
												: "Patient birthdate."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Address:{" "}
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='address'
											value={formik.values.address}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient address...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.address &&
												formik.errors.address
													? "alert"
													: "char"
											}
										>
											{formik.touched.address &&
											formik.errors.address
												? formik.errors.address
												: "Patient address."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											City:{" "}
											<Text as='span' color='alert'>
												*
											</Text>{" "}
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='city'
											value={formik.values.city}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Patient city...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.city &&
												formik.errors.city
													? "alert"
													: "char"
											}
										>
											{formik.touched.city &&
											formik.errors.city
												? formik.errors.city
												: "Patient city."}
										</FormHelperText>
									</FormControl>
									<Flex gap='30px'>
										<FormControl w='150px'>
											<FormLabel variant='patient'>
												State:
												<Text as='span' color='alert'>
													*
												</Text>{" "}
											</FormLabel>
											<Select
												variant='patient'
												name='state'
												value={formik.values.state}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												placeholder='Patient state.'
												isRequired
											>
												{states.map((state) => {
													return (
														<option
															key={state.abbr}
															value={state.abbr}
														>
															{state.name}
														</option>
													)
												})}
											</Select>
											<FormHelperText
												m='0px'
												fontSize='12px'
												color={
													formik.touched.state &&
													formik.errors.state
														? "alert"
														: "char"
												}
											>
												{formik.touched.state &&
												formik.errors.state
													? formik.errors.state
													: "Patient state."}
											</FormHelperText>
										</FormControl>
										<FormControl w='110px'>
											<FormLabel variant='patient'>
												Zip Code:
												<Text as='span' color='alert'>
													*
												</Text>{" "}
											</FormLabel>
											<Input
												type='text'
												variant='patient'
												name='zip'
												value={formik.values.zip}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												placeholder='Patient zip...'
												maxLength={5}
												isRequired
											/>
											<FormHelperText
												m='0px'
												fontSize='12px'
												color={
													formik.touched.zip &&
													formik.errors.zip
														? "alert"
														: "char"
												}
											>
												{formik.touched.zip &&
												formik.errors.zip
													? formik.errors.zip
													: "Patient zip."}
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
											leftIcon={
												<CloseIcon boxSize={2.5} />
											}
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
											Update
										</Button>
									</Flex>
								</VStack>
							</Flex>
						</form>
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	)
}

export default EditPatient
