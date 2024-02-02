import { BiSolidEdit } from "react-icons/bi";
import Button from "../Button";
import DataTable from "../DataTable";

const AdminUserManagement = () => {

    const data = []

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        { Header: "Email", accessor: "subCategoryName" }, 
        {
            Header: "Phone",
            accessor: "categoryName",
        },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <BiSolidEdit
                        className="text-blue-500 w-10 h-7 cursor-pointer ml-2"
                        onClick={() => handleEdit(row?.original?.id)}
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
                <DataTable columns={columns} data={data} />
            </div>

        </>
    )
}

export default AdminUserManagement;

