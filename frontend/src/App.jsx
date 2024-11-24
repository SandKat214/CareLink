import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom"

// Layouts
import RootLayout from "./layouts/RootLayout"
import PatientsLayout from "./layouts/PatientsLayout"
import ApptLayout from "./layouts/ApptLayout"

// Pages
import Home from "./pages/Home"
import Error from "./pages/Error"
import Patients from "./pages/patients/Patients"
import PatientDetails from "./pages/patients/PatientDetails"
import PatientRecord from "./pages/patients/PatientRecord"
import AddPatient from "./pages/patients/AddPatient"
import EditPatient from "./pages/patients/EditPatient"
import DailyAppts from "./pages/appts/DailyAppts"
import AddAppt from "./pages/appts/AddAppt"
import Login from "./pages/authorization/Login"
import Signup from "./pages/authorization/Signup"

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
						<Route
							path=':patientId/update'
							element={<EditPatient />}
						/>
					</Route>
				</Route>
				<Route path='appointments' element={<ApptLayout />}>
					<Route index element={<DailyAppts />} />
					<Route path='new' element={<AddAppt />} />
				</Route>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
			</Route>
		</Route>
	)
)

function App() {
	return <RouterProvider router={router} />
}

export default App
