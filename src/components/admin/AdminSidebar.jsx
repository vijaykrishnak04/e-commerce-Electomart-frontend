import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";

const AdminSidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <div className={`bg-black h-screen text-white p-5 pt-8 ${open ? "w-72" : "w-20"} relative`}>
                <BsArrowLeftShort
                    className="bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div className="p-7">
                <h1 className="text-2xl font-semibold"></h1>
            </div>
        </div>
    );
};

export default AdminSidebar;
