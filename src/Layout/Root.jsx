import { Outlet } from "react-router-dom";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";


const Root = () => {
    return (
        <div >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;