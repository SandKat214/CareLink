import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div>
            <div>RootLayout</div>
            <Outlet />
        </div>
    )
}

export default RootLayout;