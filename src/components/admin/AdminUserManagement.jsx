import Button from "../Button";
import DataTable from "../DataTable";
import { blockAndUnblock, getAllUsers } from "../../app/slices/admin/adminUserManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useSwal from "../../hooks/useSwal";
import { errorMessage, successMessage } from "../../hooks/message";

const AdminUserManagement = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const { showInfo } = useSwal();

    const userData = useSelector((state) => state?.userManagement?.userData)
    console.log(userData)

    const { isLoading, isSuccess, isError, message, error } =
        useSelector((state) => state?.userManagement);

    useEffect(() => {
        if (isError) {
            errorMessage(error)
        }
        if (isSuccess) {
            successMessage(message)
        }
    }, [isError, message, error, dispatch, isSuccess]);

    const blockAndUnblockUser = async (id, status, fullName) => {
        const action = status ? 'Unblock' : 'Block';
        const result = await showInfo(`Are you sure you want to ${action} ${fullName}?`);

        if (result.isConfirmed) {
            dispatch(blockAndUnblock({ id, status }))
            .then(() => dispatch(getAllUsers())); 
        } else {
            errorMessage("Operation canceled");
        }

    }

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
            accessor: "isBlocked",
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <Button
                        onClick={() => blockAndUnblockUser(row?.original?._id, row?.original?.isBlocked, row?.original?.fullName)}
                        className={`px-5 py-1 font-poppins font-semibold text-opacity-10 rounded border border-black shadow-md ${row?.original?.isBlocked ? 'bg-red-500 hover:bg-red-400' : 'bg-green-50 hover:bg-green-40'}`}
                        text={row?.original?.isBlocked ? 'Blocked' : 'Active'}
                    />
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

