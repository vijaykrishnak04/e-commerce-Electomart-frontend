import { useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Coupon = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: "Coupon Name",
            accessor: "subcategoryImage.url",
            Cell: ({ value }) => (
                <div className="flex justify-center">
                    <img src={value} alt="Subcategory" className="w-12 h-16  object-cover rounded" />
                </div>
            ),
        },
        { Header: "Discount In %", accessor: "subcategoryName" },
        {
            Header: "Max Limit",
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
                    <MdDelete
                        className="text-red-500 w-10 h-7 cursor-pointer"
                        onClick={() => handleDelete(row?.original?.id, row?.original?.publicId)}
                    />
                </div>
            ),
        },
    ];
    const data = []

    const handleSubmit = (values) => {
        // Implement your logic to handle the form submission here
        console.log("Form Values:", values);
        // You can add further logic or send the data to your backend
        handleCloseModal(); // Close modal after submission
    };

    const CouponSchema = Yup.object().shape({
        couponCode: Yup.string().required("Coupon code is required"),
        discountPercentage: Yup.number().required("Discount percentage is required"),
        maxLimit: Yup.number().required("Max limit is required"),
        expiryDate: Yup.date().required("Expiry date is required"),
    });

    const initialValues = {
        couponCode: "",
        discountPercentage: "",
        maxLimit: "",
        expiryDate: "",
    };

    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Coupons</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border border-black
                     shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Coupon"
                    onClick={handleOpenModal}
                />
            </div>
            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={data} />
            </div>

            <Modal isOpen={isModalOpen} className="w-full p-4 md:w-[48rem] h-auto" onClose={handleCloseModal}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CouponSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="flex flex-col items-center  gap-5">
                            <div className="flex flex-col gap-5 bg-gray-100 p-3 rounded-md justify-start w-full">
                                <div className="flex justify-between items-center gap-5 px-10">
                                    <div className="w-full md:w-1/2">
                                        <label  htmlFor="couponCode">Coupon Code</label>
                                        <Field
                                            className=" w-full px-4 py-2 border border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Enter your coupon code"
                                            name="couponCode"
                                        />
                                        <div >
                                            <ErrorMessage name="couponCode" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label  htmlFor="discountPercentage">Discount In %</label>
                                        <Field
                                            className=" w-full px-4 py-2 border border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Enter your coupon code"
                                            name="discountPercentage"
                                        />
                                        <div >
                                            <ErrorMessage name="discountPercentage" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center w-full px-10 gap-5">
                                    <div className="w-full md:w-1/2">
                                        <label  htmlFor="maxLimit">Maximum Limit</label>
                                        <Field
                                            className=" w-full px-4 py-2 border border-gray-600 rounded-md"
                                            type="text"
                                            placeholder="Enter your coupon code"
                                            name="maxLimit"
                                        />
                                        <div  >
                                            <ErrorMessage name="maxLimit" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <label  htmlFor="expiryDate">Expiry Date</label>
                                        <Field
                                            className=" w-full px-4 py-2 border border-gray-600 rounded-md"
                                            type="date"
                                            placeholder="Enter your coupon code"
                                            name="expiryDate"
                                        />
                                        <div >
                                            <ErrorMessage name="expiryDate" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button className="bg-blue-500 hover:bg-blue-50 px-20 rounded-md py-2 text-white font-semibold font-poppins " text="submit" />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </Modal>

        </>
    );
};

export default Coupon;
