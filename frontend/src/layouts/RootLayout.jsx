import { Center, VStack, useToast } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// components
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const RootLayout = () => {
	const toast = useToast()
	const [searchValue, setSearchValue] = useState("")
	const [patients, setPatients] = useState([])

	// Fetch patients from db
	const { isLoading, refetch: fetchPatients } = useQuery({
		queryKey: ["patients", searchValue],
		queryFn: async () => {
			// if value typed in search bar, fetch matching
			try {
				if (searchValue) {
					const res = await axios.get(
						import.meta.env.VITE_PATIENT_API +
							"patients/search/query?q=" +
							searchValue
					)
					setPatients(res.data)
					return res.data
				}

				// otherwise fetch all patients
				const res = await axios.get(
					import.meta.env.VITE_PATIENT_API + "patients"
				)
				setPatients(res.data)
				return res.data
			} catch (error) {
				console.log(error)
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
					setSearchValue,
				}}
			/>
			<Footer />
		</VStack>
	)
}

export default RootLayout
