import { Outlet } from "react-router-dom";

const PatientsLayout = () => {
    return (
        <div>
            <div>Patients Layout</div>
            <Outlet />
        </div>
    );
}

export default PatientsLayout;