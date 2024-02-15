import { useEffect, useState } from "react";
import Navbar from "../components/users/Navbar"
import MobileNavbar from "../components/MobileNavbar";

const UserLayout = () => {
    const [showMobileNavbar, setShowMobileNavbar] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowMobileNavbar(window.innerWidth <= 1444);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            {showMobileNavbar ? (
                <MobileNavbar />
            ) : (
                <div >
                  <Navbar/>
                </div>
            )}
        </div>
    )
}

export default UserLayout