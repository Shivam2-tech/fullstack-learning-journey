import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import { Outlet } from "react-router-dom";

function Layout() {

    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
        </>
    )
}
export default Layout;