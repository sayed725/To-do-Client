import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
        </div>
    );
};

export default Main;