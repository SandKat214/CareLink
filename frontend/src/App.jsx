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
import Error from "./pages/Error"
import AddPatient from "./pages/AddPatient"
import EditPatient from "./pages/EditPatient"
import ApptLayout from "./layouts/ApptLayout"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<RootLayout />} errorElement={<Error />}>
			<Route errorElement={<Error />}>
				<Route index element={<Home />} />
				<Route path='patients' element={<PatientsLayout />}>
					<Route errorElement={<Error />}>
						<Route index element={<Patients />} />
						<Route path='new' element={<AddPatient />} />
						<Route path=':patientId' element={<PatientDetails />} />
						<Route
							path=':patientId/record'
							element={<PatientRecord />}
						/>
						<Route path=':patientId/update' element={<EditPatient />} />
					</Route>
				</Route>
				<Route path='appointments' element={<ApptLayout />} >
				</Route>
			</Route>
		</Route>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
