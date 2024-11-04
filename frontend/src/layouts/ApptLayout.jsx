import {
	Box,
	Button,
	Center,
	Circle,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Spinner,
	Text,
	Tooltip,
	useToast,
	VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

// icons
import { MdAdd } from "react-icons/md"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

const ApptLayout = () => {
	const curDate = new Date()
	const today = {
		year: curDate.getFullYear(),
		month: curDate.getMonth(),
		date: curDate.getDate(),
	}
	const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]

	const [focusDate, setFocusDate] = useState(today.date)
	const [year, setYear] = useState(today.year)
	const [month, setMonth] = useState(today.month)
	const [preDates, setPreDates] = useState([])
	const [dates, setDates] = useState([])
	const [postDates, setPostDates] = useState([])

	const setCalendar = () => {
		if (month < 0 || month > 11) {
			const newDate = new Date(year, month, 1)
			setYear(newDate.getFullYear())
			setMonth(newDate.getMonth())
		}
		let firstDay = new Date(year, month, 1).getDay() // day index of 1st day of month
		let lastDate = new Date(year, month + 1, 0).getDate() // last date of month
		let lastDay = new Date(year, month, lastDate).getDay() // day index of last date
		let prevLastDate = new Date(year, month, 0).getDate() // last date of last month

		// get last dates of previous month
		let datesArr = []
		for (let i = firstDay; i > 0; i--) {
			datesArr.push(prevLastDate - i + 1)
		}
		setPreDates(datesArr)

		// get current month dates
		datesArr = []
		for (let i = 1; i <= lastDate; i++) {
			datesArr.push(i)
		}
		setDates(datesArr)

		// get first days of next month
		datesArr = []
		for (let i = lastDay; i < 6; i++) {
			datesArr.push(i - lastDay + 1)
		}
		setPostDates(datesArr)
	}

	useEffect(() => {
		setCalendar()
	}, [month])

	return (
		<Flex as='main' w='100%' h='100%' maxH='100%' overflow='hidden' gap={0}>
			<VStack
				as='section'
				w='30%'
				borderTop='1px solid #FFFF'
				borderBottom='1px solid #FFFF'
				gap={0}
			>
				<Center
					as='header'
					w='100%'
					h='fit-content'
					p='20px 30px'
					bg='dkNavy'
				>
					<Heading
						as='h2'
						fontSize='1.5em'
						lineHeight='50%'
						pt='10px'
						fontFamily='lalezar'
						color='background'
					>
						{new Date(year, month, focusDate).toDateString()}
					</Heading>
				</Center>
				<VStack
					as='article'
					w='100%'
					p='20px 15%'
					align='flex-start'
					overflow='auto'
					boxShadow='inset 2px 2px 10px #343434'
					flexGrow={1}
				>
					{/* {isLoading ? (
						<Center h='100%' w='100%'>
							<Spinner color='dkGreen' size='xl' />
						</Center>
					) : (
						<List spacing='15px'>
							{patients.length > 0 ? (
								patients.map((patient) => {
									return (
										<ListItem key={patient._id}>
											<Tooltip
												hasArrow
												label='Go to patient page'
												fontSize='12px'
												placement='auto'
												mx='10px'
											>
												<Link
													as={NavLink}
													to={
														"/patients/" +
														patient._id
													}
													variant='patient'
												>
													{patient.lname},{" "}
													{patient.fname}
												</Link>
											</Tooltip>
										</ListItem>
									)
								})
							) : (
								<ListItem>No matching patients</ListItem>
							)}
						</List>
					)} */}
					<Outlet />
				</VStack>
				<Flex
					as='footer'
					w='100%'
					h='fit-content'
					p='20px 50px'
					bg='dkNavy'
					gap='20px'
					align='center'
					justify='space-between'
				>
					<Heading
						as='h2'
						fontSize='1.5em'
						lineHeight='50%'
						pt='10px'
						fontFamily='lalezar'
						color='background'
					>
						Appointments
					</Heading>
					<Tooltip
						hasArrow
						label='Add new patient'
						fontSize='12px'
						placement='auto'
						m='10px'
					>
						<Button
							// as={NavLink}
							// to='new'
							variant='ltAction'
							leftIcon={<Icon as={MdAdd} boxSize={5} />}
						>
							New
						</Button>
					</Tooltip>
				</Flex>
			</VStack>
			<VStack
				as='section'
				flexGrow={1}
				overflow='auto'
				border='1px solid #FFF'
			>
				<VStack align='flex-start' gap={0} w='100%' flexGrow={1}>
					<Flex
						as='header'
						w='100%'
						h='fit-content'
						p='20px 50px'
						bg='dkNavy'
						justify='space-between'
						align='center'
						color='background'
					>
						<ChevronLeftIcon
							_hover={{ color: "ltGreen" }}
							boxSize={8}
							onClick={() => {
								setMonth(month - 1)
							}}
						/>
						<Heading
							as='h2'
							fontSize='2em'
							lineHeight='50%'
							pt='10px'
							fontFamily='lalezar'
						>
							{`${months[month]} ${year}`}
						</Heading>
						<ChevronRightIcon
							_hover={{ color: "ltGreen" }}
							boxSize={8}
							onClick={() => {
								setMonth(month + 1)
							}}
						/>
					</Flex>
					<SimpleGrid columns={7} w='100%'>
						{weekdays.map((weekday, index) => {
							return (
								<Center
									key={index}
									bg='char'
									color='background'
									p='5px'
									h='fit-content'
									border='1px solid #FFF'
								>
									{weekday}
								</Center>
							)
						})}
					</SimpleGrid>
					<SimpleGrid columns={7} w='100%' flexGrow={1}>
						{preDates.map((preDate) => {
							return (
								<Box
									key={preDate}
									flexGrow={1}
									border='1px solid lightgray'
									color='lightgray'
								>
									<Flex w='100%' justify='right' p='10px 10px 0 5px'>
										{preDate}
									</Flex>
								</Box>
							)
						})}

						{/* active dates */}
						{dates.map((date, index) => {
							return (
								<Box
									key={index}
									flexGrow={1}
									border='1px solid #343434'
									_hover={{
                                        boxShadow: 'inset 5px 5px #8D0000, inset -5px -5px #8D0000',
                                    }}
                                    onClick={() => {
                                        setFocusDate(date)
                                    }}
                                    boxShadow={focusDate === date ? 'inset 5px 5px #8D0000, inset -5px -5px #8D0000' : ''}
								>
                                    <Flex w='100%' justify='right' p='10px 10px 0 5px'>
                                        {today.year === year && today.month === month && today.date === date ? (
                                            <Circle bg='ltGreen' color='char' p='5px 12px' >
                                                {date}
                                            </Circle>
                                        ) : (
                                            <Box>
                                                {date}
                                            </Box>
                                            
                                        )}
									</Flex>
								</Box>
							)
						})}

						{postDates.map((postDate) => {
							return (
								<Box
									key={postDate}
									flexGrow={1}
									border='1px solid lightgray'
									color='lightgray'
								>
									<Flex w='100%' justify='right' p='10px 10px 0 5px'>
										{postDate}
									</Flex>
								</Box>
							)
						})}
					</SimpleGrid>
				</VStack>
			</VStack>
		</Flex>
	)
}

export default ApptLayout
