import {
	Button,
	Center,
	Flex,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Link,
	List,
	ListItem,
	Spinner,
	Tooltip,
	VStack,
} from "@chakra-ui/react"
import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import "@fontsource/lalezar"

// icons
import { IoIosSearch } from "react-icons/io"
import { MdAdd } from "react-icons/md"

const PatientsLayout = () => {
	const { fetchPatients, isLoading, patients, searchValue, setSearchValue } =
		useOutletContext()

	return (
		<Flex as='main' w='100%' h='100%' maxH='100%' overflow='hidden' gap={0}>
			<VStack
				as='section'
				w='25%'
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
					<Tooltip
						hasArrow
						label='Type patient name'
						fontSize='12px'
						placement='auto'
						m='-10px'
					>
						<InputGroup width='80%'>
							<Input
								type='search'
								placeholder='Search by name...'
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								variant='searchP'
								fontSize='12px'
							/>
							<InputLeftElement>
								<IoIosSearch />
							</InputLeftElement>
						</InputGroup>
					</Tooltip>
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
					{isLoading ? (
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
													to={patient._id}
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
					)}
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
						Active Patients
					</Heading>
					<Tooltip
						hasArrow
						label='Add new patient'
						fontSize='12px'
						placement='auto'
						m='10px'
					>
						<Button
							as={NavLink}
							to='new'
							variant='ltAction'
							leftIcon={<Icon as={MdAdd} boxSize={5} />}
						>
							New
						</Button>
					</Tooltip>
				</Flex>
			</VStack>
			<VStack as='section' flex={1} height='100%' maxH='100%'>
				<Outlet context={{fetchPatients}} />
			</VStack>
		</Flex>
	)
}

export default PatientsLayout
