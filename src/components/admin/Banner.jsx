import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Button from "../../components/Button";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { errorMessage, successMessage } from "../../hooks/message";
import { AddBannerData, deleteBanner, getAllBanners } from "../../app/slices/admin/adminBannerSlice";
import useSwal from "../../hooks/useSwal";

const Banner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();
    const bannerState = useSelector((state) => state?.Banner?.bannerData)

    const { isLoading, isSuccess, isError, message, error } =
        useSelector((state) => state?.Banner);

    const { showInfo } = useSwal();

    useEffect(() => {
        dispatch(getAllBanners());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            errorMessage(error)
        }
        if (isSuccess) {
            successMessage(message)
        }
    }, [isError, message, error, dispatch, isSuccess]);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                const width = image.width;
                const height = image.height;

                const requiredWidth = 3757;
                const requiredHeight = 1434;

                if (width === requiredWidth && height === requiredHeight) {
                    setSelectedFile(file);
                } else {
                    errorMessage("Image dimensions must be 3757px x 1434px.")
                }
            };
        }
    };

    const handleSubmit = async () => {
        try {
            if (!selectedFile) {
                errorMessage("Please select an image.");
                return;
            }
            const formData = new FormData();
            formData.append("image", selectedFile);
            await dispatch(AddBannerData(formData));
            handleCloseModal();
            setSelectedFile(null);
            successMessage("Banner Created Successfully");

        } catch (error) {
            console.log(error);
            errorMessage(error?.response?.data?.error);
        }
    };

    const handleDelete = async (id, publicId) => {
        console.log("line 89", id, publicId)
        const result = await showInfo('Are you sure you want to delete?');
        if (result.isConfirmed) {
            dispatch(deleteBanner({ id, publicId }));
        } else {
            errorMessage("Delete operation canceled")
        }
    };

    const handleEdit = (id) => {
        console.log(`Edit item with id: ${id}`);
    };

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: "Banner Image",
            accessor: "imageUrl",
            Cell: ({ value }) => (
                <div className="flex justify-center w-full">
                    <img src={value} alt="Banner" className="w-12 h-16 object-cover rounded" />
                </div>
            ),
        },
        { Header: "Updated On", accessor: "createdAt" },
        {
            Header: "Actions",
            accessor: "Actions",
            Cell: ({ row }) => (
                <div className="flex justify-center">
                    <BiSolidEdit
                        className="text-blue-500 w-10 h-7 cursor-pointer ml-2"
                        onClick={() => handleEdit(row.original.id)}
                    />
                    <MdDelete
                        className="text-red-500 w-10 h-7 cursor-pointer"
                        onClick={() => handleDelete(row.original._id, row.original.publicId)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Banners</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Banner"
                    onClick={handleOpenModal}
                />
            </div>

            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={Array.isArray(bannerState) ? bannerState : [bannerState]} />
            </div>

            <Modal isOpen={isModalOpen} className="w-[30rem] p-9 h-[21rem] " onClose={handleCloseModal} >
                <div className="border-dashed border-2 flex justify-center border-gray-500 p-8 h-52 rounded text-center">
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <input
                            type="file"
                            id="fileInput"
                            name="image"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected Banner"
                                className="w-full h-full object-cover rounded"
                            />
                        ) : (
                            <div className="bg-white border-2 text-sm  border-gray-500 border-dashed w-32 h-32 pt-8 pl-4 rounded-full">
                                <p className="w-24">Click here to upload an image</p>
                            </div>
                        )}
                    </label>
                </div>
                <div className="flex justify-center mt-5 ">
                    <Button
                        className='bg-yellow-50 px-14 py-2 rounded-full border border-gray-500 shadow-md'
                        text='Upload'
                        loading={isLoading}
                        onClick={handleSubmit}
                    />
                </div>
            </Modal>
        </>
    );
};

export default Banner;
