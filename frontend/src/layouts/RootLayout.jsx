import { Center, VStack, useToast } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

// components
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const RootLayout = () => {
	const { user } = useAuthContext()
	const toast = useToast()
	const { logout } = useLogout()
	const [searchValue, setSearchValue] = useState("")
	const [patients, setPatients] = useState([])

	// Fetch patients from db
	const { isLoading, refetch: fetchPatients } = useQuery({
		queryKey: ["patients", searchValue],
		queryFn: async () => {
			if (!user) {
				throw Error("You must be logged in.")
			}

			// if value typed in search bar, fetch matching
			try {
				if (searchValue) {
					const res = await axios.get(
						import.meta.env.VITE_PATIENT_API +
							"patients/search/query?q=" +
							searchValue,
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					)
					setPatients(res.data)
					return res.data
				}

				// otherwise fetch all patients
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "patients",
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				)
				setPatients(res.data)
				return res.data
			} catch (error) {
				console.log(error)

				// User session timout
				if (error.status === 401) {
					toast({
						description: "Session timeout. Please log back in.",
						status: "error",
					})
					setPatients([])
					logout()
					return error
				}

				// other error
				toast({
					description:
						error.response.data.error ||
						"Could not retrieve patients from the server.",
					status: "error",
				})
				return error
			}
		},
	})

	return (
		<VStack
			w='100vw'
			h='100vh'
			maxH='100vh'
			justify='space-between'
			gap={0}
		>
			<NavBar />
			<Outlet
				context={{
					fetchPatients,
					isLoading,
					patients,
					searchValue,
					setPatients,
					setSearchValue,
				}}
			/>
			<Footer setPatients={setPatients} />
		</VStack>
	)
}

export default RootLayout
