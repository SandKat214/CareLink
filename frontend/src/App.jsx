import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"

// Layouts
import RootLayout from "./layouts/RootLayout"
import PatientsLayout from "./layouts/PatientsLayout"

// Pages
import Patients from "./pages/Patients"
import PatientDetails from "./pages/PatientDetails"
import Home from "./pages/Home"
import PatientRecord from "./pages/PatientRecord"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />}>
			<Route index element={<Home />} />
			<Route path='patients' element={<PatientsLayout />}>
				<Route index element={<Patients />} />
				<Route path=':patientId' element={<PatientDetails />} />
				<Route path=':patientId/record' element={<PatientRecord />} />
			</Route>
		</Route>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
