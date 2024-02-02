import { BiSolidEdit } from "react-icons/bi";
import Button from "../Button";
import DataTable from "../DataTable";
import { getAllUsers } from "../../app/slices/admin/adminUserManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AdminUserManagement = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const userData = useSelector((state) => state?.userManagement?.userData)
    console.log(userData)



    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        { Header: "Full Name", accessor: "fullName" },
        { Header: "Email", accessor: "email" },
        { Header: "Phone", accessor: "mobile" },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <Button className="px-5 py-1 font-poppins font-semibold text-opacity-10 rounded border border-black
                     shadow-md bg-green-50 hover:bg-green-40" text="Active" />
                </div>
            ),
        },
    ];


    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Users</h1>
            </div>
            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={Array.isArray(userData) ? userData : [userData]} />
            </div>

        </>
    )
}

export default AdminUserManagement;

