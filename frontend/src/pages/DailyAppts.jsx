import {
	Button,
	Center,
	Divider,
	Flex,
	HStack,
	Icon,
	Link,
	List,
	ListItem,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react"
import { Link as RRLink, useOutletContext } from "react-router-dom"

// icons
import { FaTrashCan } from "react-icons/fa6"
import { RiMailFill } from "react-icons/ri"
import { ArrowForwardIcon } from "@chakra-ui/icons"

const DailyAppts = () => {
	const { isLoading, dailies } = useOutletContext()

	return (
		<>
			{isLoading ? (
				<Center h='100%' w='100%'>
					<Spinner color='dkGreen' size='xl' />
				</Center>
			) : (
				<List spacing='15px' w='100%'>
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
												{/* <Tooltip
													hasArrow
													label='Send reminder'
													fontSize='12px'
													placement='auto'
													mx='10px'
												>
													<Button
														variant='dkAction'
														p='5px'
													>
														<Icon
															as={RiMailFill}
															boxSize={3}
														/>
													</Button>
												</Tooltip> */}
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
													>
														<Icon
															as={FaTrashCan}
															boxSize={3}
														/>
													</Button>
												</Tooltip>
											</Flex>
										</Flex>
										<Link
											as={RRLink}
											to={
												"/patients/" + appt.attendees[0]
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
