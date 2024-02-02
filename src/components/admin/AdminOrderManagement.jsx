import { useDispatch, useSelector } from "react-redux";
import DataTable from "../DataTable";
import { getAllOrders } from "../../app/slices/admin/adminOrderSlice";
import { useEffect } from "react";
import Button from "../Button";

const AdminOrderManagement = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const orderData = useSelector((state) => state?.adminOrders?.orderData)
    console.log(orderData)

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        { Header: "Order ID", accessor: "_id" },
        { Header: "Customer Name", accessor: "userId.fullName" },
        { Header: "Payment Method", accessor: "paymentMethod" },
        { Header: "Payment Status", accessor: "paymentStatus" },
        { Header: "Order Status", accessor: "orderStatus" },
        { Header: "Amount", accessor: "totalAmount" },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <Button className="px-5 py-1 font-poppins font-semibold text-opacity-10 rounded border border-black
                     shadow-md bg-blue-50 hover:bg-blue-40" text="View" />
                    <Button className="px-5 py-1 font-poppins font-semibold ml-2 text-opacity-10 rounded border border-black
                     shadow-md bg-green-50 hover:bg-green-40" text="Active" />
                </div>
            ),
        },
    ];


    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Orders</h1>
            </div>
            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={orderData} />
            </div>
        </>
    )
}

export default AdminOrderManagement;