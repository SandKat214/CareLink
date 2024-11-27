import {
	Avatar,
	AvatarBadge,
	Button,
	Flex,
	Icon,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react"
import { IoMdLogOut } from "react-icons/io"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"
import { useLogout } from "../hooks/useLogout"

const Footer = ({ setPatients }) => {
	const toast = useToast()
	const { user } = useAuthContext()
	const { logout } = useLogout()
	const [isPending, setIsPending] = useState(false)

	const handleLogout = () => {
		setIsPending(true)

		// logout and clear patients
		logout()
		setPatients([])
		toast({ description: "Logout successful.", status: "success" })

		setIsPending(false)
	}

	return (
		<Flex
			as='footer'
			w='100%'
			p={user ? '30px 60px' : '40px 60px'}
			justify={user ? "space-between" : "right"}
			bg='dkNavy'
			align='center'
		>
			{user && (
				<Flex gap='20px' align='center'>
					<Tooltip
						hasArrow
						label={`${user.name} logged in.`}
						fontSize='12px'
						placement='auto'
					>
						<Avatar
							name={user.name}
							src=''
							bg='char'
							color='ltGreen'
						>
							<AvatarBadge boxSize='1em' bg='ltGreen' />
						</Avatar>
					</Tooltip>
					<Button
						variant='ltAction'
						leftIcon={<Icon as={IoMdLogOut} boxSize={4} />}
						onClick={handleLogout}
						isLoading={isPending}
						loadingText='Logging out...'
					>
						Log out
					</Button>
				</Flex>
			)}
			<Text color='background' fontSize='12px' fontStyle='italic'>
				&copy; 2024 Katherine Sandeen
			</Text>
		</Flex>
	)
}

export default Footer
