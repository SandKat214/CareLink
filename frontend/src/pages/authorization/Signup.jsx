import {
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Link,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { Link as RRLink } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import YupPassword from "yup-password"
YupPassword(Yup)
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"

// icons
import { CheckIcon } from "@chakra-ui/icons"

const Signup = () => {
	const toast = useToast()
	const { dispatch } = useAuthContext()

	// form validation
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Full name is required."),
			email: Yup.string()
				.email("Must be a valid email.")
				.required("Email is required"),
			password: Yup.string().password().required("Password is required."),
		}),
		onSubmit: async (values) => {
			mutateAsync(values)
		},
	})

	// add user account
	const { isPending, mutateAsync } = useMutation({
		mutationFn: async (values) => {
			try {
				// create user
				const data = {
					name: values.name,
					email: values.email,
					password: values.password,
				}
				const res = await axios.post(
					`${import.meta.env.VITE_API}auth/signup/`,
					data
				)
				const newUser = res.data
				toast({
					description: `${newUser.name} account created.`,
					status: "success",
				})

				// save user to local storage
				localStorage.setItem("user", JSON.stringify(newUser))

				// update auth context
				dispatch({ type: "LOGIN", payload: newUser })
			} catch (error) {
				console.log(error)
				toast({
					description:
						error.response.data.error || "Error adding user.",
					status: "error",
				})
			}
		},
	})

	return (
		<Center as='main' w='100%' h='100%' flexDirection='column'>
			<VStack
				as='section'
				w='fit-content'
				gap='15px'
				maxH='100%'
				overflow='hidden'
				p='10px'
				m='20px'
			>
				<VStack
					w='100%'
					gap='15px'
					border='3px solid #0A0058'
					boxShadow='1px 4px 4px #34343480'
					borderRadius='5px'
					p='20px'
				>
					<Flex as='header' w='100%' justify='left' align='center'>
						<Heading as='h3' color='dkGreen' fontSize='20px'>
							Account Signup:
						</Heading>
					</Flex>
					<VStack
						flex={1}
						w='100%'
						overflow='auto'
						gap='15px'
						px='15px'
					>
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
								<VStack gap='15px' w='250px'>
									<FormControl>
										<FormLabel variant='patient'>
											Name:{" "}
											<Text as='span' color='alert'>
												*
											</Text>
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='name'
											value={formik.values.name}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Enter full name...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.name &&
												formik.errors.name
													? "alert"
													: "char"
											}
										>
											{formik.touched.name &&
											formik.errors.name
												? formik.errors.name
												: "User full name."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Email:{" "}
											<Text as='span' color='alert'>
												*
											</Text>
										</FormLabel>
										<Input
											type='text'
											variant='patient'
											name='email'
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Enter email...'
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
												: "User email."}
										</FormHelperText>
									</FormControl>
									<FormControl>
										<FormLabel variant='patient'>
											Password:{" "}
											<Text as='span' color='alert'>
												*
											</Text>
										</FormLabel>
										<Input
											type='password'
											variant='patient'
											name='password'
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											placeholder='Enter password...'
											isRequired
										/>
										<FormHelperText
											m='0px'
											fontSize='12px'
											color={
												formik.touched.password &&
												formik.errors.password
													? "alert"
													: "char"
											}
										>
											{formik.touched.password &&
											formik.errors.password
												? formik.errors.password
												: "Choose strong password."}
										</FormHelperText>
									</FormControl>
									<Flex
										w='100%'
										justify='right'
										gap='20px'
										py='20px'
									>
										<Button
											variant='dkAction'
											leftIcon={<CheckIcon />}
											type='submit'
											isLoading={isPending}
											loadingText='Saving...'
										>
											Sign up
										</Button>
									</Flex>
								</VStack>
							</form>
						</VStack>
					</VStack>
				</VStack>
				<Flex w='100%' justify='left' px='10px' gap='10px'>
					<Text>Already have an account?</Text>
					<Link
						as={RRLink}
						to='/login'
						variant='patient'
						color='dkGreen'
					>
						Log in!
					</Link>
				</Flex>
			</VStack>
		</Center>
	)
}

export default Signup
