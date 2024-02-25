import { useEffect, useState } from "react";
import Navbar from "../components/users/Navbar";
import { Outlet } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";

const UserLayout = () => {
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {isMobileView ? (
        <>
          <MobileNavbar />
          <Navbar />
        </>
      ) : (
        <Navbar />
      )}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
