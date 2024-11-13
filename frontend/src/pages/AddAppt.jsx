import { useOutletContext } from "react-router-dom"

const AddAppt = () => {
	const { patients, focusDate, year, month } = useOutletContext()

	return <div>Add</div>
}

export default AddAppt
