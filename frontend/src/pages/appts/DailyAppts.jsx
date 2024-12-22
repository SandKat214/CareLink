import {
	Button,
	Center,
	Divider,
	Flex,
	Icon,
	Link,
	List,
	ListItem,
	Spinner,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from "@chakra-ui/react"
import { Link as RRLink, useOutletContext } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "../../hooks/useAuthContext"

// components
import AlertModal from "../../components/AlertModal"

// icons
import { FaTrashCan } from "react-icons/fa6"
import { RiMailFill } from "react-icons/ri"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const DailyAppts = () => {
	const { fetchAppts, isLoading, dailies } = useOutletContext()
	const { user } = useAuthContext()
	const toast = useToast()
	const {
		isOpen: isDel,
		onClose: delClose,
		onOpen: delOpen,
	} = useDisclosure()
	const {
		isOpen: isEmail,
		onClose: emailClose,
		onOpen: emailOpen,
	} = useDisclosure()
	const [idToCancel, setIdToCancel] = useState("")
	const [apptToRem, setApptToRem] = useState({})

	// cancel appointment
	const { isPending: delPending, mutateAsync: deleteAppt } = useMutation({
		mutationFn: async () => {
			try {
				await axios.delete(
					`${import.meta.env.VITE_PATIENT_API}events/${idToCancel}`
				)
				toast({
					description: "Appointment cancelled.",
					status: "success",
				})
				fetchAppts()
			} catch (error) {
				console.log(error)
				toast({
					description:
						error.response.data.error ||
						"Error cancelling appointment.",
					status: "error",
				})
				return error
			} finally {
				setIdToCancel("")
			}
		},
	})

	// email patient reminder
	const { isPending: emailPending, mutateAsync: emailRem } = useMutation({
		mutationFn: async () => {
			try {
				const date = new Date(apptToRem.startEvent).toLocaleDateString(
					"en-US"
				)
				const startTime = new Date(
					apptToRem.startEvent
				).toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				})
				const endTime = new Date(apptToRem.endEvent).toLocaleTimeString(
					"en-US",
					{ hour: "2-digit", minute: "2-digit" }
				)
				const data = {
					fromName: user.name,
					toName: apptToRem.title,
					replyEmail: user.email,
					toEmail: apptToRem.email,
					subject: "Appointment reminder from CareLink",
					message: `This is a reminder that you have an appointment on ${date}, from ${startTime} to ${endTime}.`,
				}
				await axios.post(`${import.meta.env.VITE_NOTIFY_API}`, data)
				toast({ description: "Reminder sent.", status: "success" })
			} catch (error) {
				console.log(error)
				toast({
					description:
						error.response.data.message ||
						"Error sending reminder.",
					status: "error",
				})
			} finally {
				setApptToRem({})
			}
		},
	})

	return (
		<>
			{isLoading ? (
				<Center h='100%' w='100%'>
					<Spinner color='dkGreen' size='xl' />
				</Center>
			) : (
				<List spacing='15px' w='100%'>
					<AlertModal
						isOpen={isDel}
						onClose={delClose}
						message={
							"Appointment cancellation CANNOT be undone. To reschedule an appointment, first cancel it and then add a new appointment."
						}
						callBack={deleteAppt}
					/>
					<AlertModal
						isOpen={isEmail}
						onClose={emailClose}
						message={
							"This action sends an appointment notification to the patient email on file."
						}
						callBack={emailRem}
					/>
					{dailies.length > 0 ? (
						dailies.map((appt, index) => {
							return (
								<div key={index}>
									<ListItem
										key={appt._id}
										display='flex'
										flexDirection='column'
									>
										<Flex
											gap='20px'
											w='100%'
											justify='space-between'
											align='center'
										>
											<Text fontWeight='bold'>{`${new Date(
												appt.startEvent
											).toLocaleTimeString("en-US", {
												hour: "2-digit",
												minute: "2-digit",
											})} - ${new Date(
												appt.endEvent
											).toLocaleTimeString("en-US", {
												hour: "2-digit",
												minute: "2-digit",
											})}`}</Text>
											<Flex gap='15px' align='center'>
												{appt.email && (
													<Tooltip
														hasArrow
														label='Send reminder'
														fontSize='12px'
														placement='auto'
														mx='10px'
													>
														<Button
															variant='dkAction'
															p='5px'
															onClick={() => {
																setApptToRem(
																	appt
																)
																emailOpen()
															}}
															isLoading={
																emailPending
															}
														>
															<Icon
																as={RiMailFill}
																boxSize={3}
															/>
														</Button>
													</Tooltip>
												)}
												<Tooltip
													hasArrow
													label='Cancel appointment'
													fontSize='12px'
													placement='auto'
													mx='10px'
												>
													<Button
														variant='alertAction'
														p='5px'
														onClick={() => {
															setIdToCancel(
																appt._id
															)
															delOpen()
														}}
														isLoading={delPending}
													>
														<Icon
															as={FaTrashCan}
															boxSize={3}
														/>
													</Button>
												</Tooltip>
											</Flex>
										</Flex>
										{appt.attendees ? (
											<Link
												as={RRLink}
												to={
													"/patients/" +
													appt.attendees[0]
												}
												variant='patient'
											>
												<Tooltip
													hasArrow
													label='Go to patient page'
													fontSize='12px'
													placement='auto'
													mx='10px'
												>
													<Flex
														w='fit-content'
														gap='10px'
														p='3px 10px'
														align='center'
													>
														<ArrowForwardIcon />
														{appt.title}
													</Flex>
												</Tooltip>
											</Link>
										) : (
											<Flex
												w='fit-content'
												gap='10px'
												p='3px 10px'
												align='center'
											>
												<ArrowForwardIcon />
												{appt.title}
											</Flex>
										)}
									</ListItem>
									<Divider borderColor='dkGreen' />
								</div>
							)
						})
					) : (
						<ListItem>No appointments today</ListItem>
					)}
				</List>
			)}
		</>
	)
}

export default DailyAppts
