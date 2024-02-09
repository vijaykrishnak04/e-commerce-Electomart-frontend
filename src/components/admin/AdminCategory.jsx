import { useEffect, useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import { errorMessage, successMessage } from "../../hooks/message";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import ImageCropper from "../ImageCropper";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, deleteCategory, getAllCategories } from "../../app/slices/admin/adminCategorySlice";
import useSwal from "../../hooks/useSwal";

const AdminCategory = () => {
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [nameModalOpen, setNameModalOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const staticAspectRatio = 1;

    const dispatch = useDispatch();
    const CategoryState = useSelector((state) => state?.Category?.CategoryData);
    console.log("line 23", CategoryState);

    const { isLoading, isSuccess, isError, message, error } =
        useSelector((state) => state?.Category);

    useEffect(() => {
        if (isError) {
            errorMessage(error)
        }
        if (isSuccess) {
            successMessage(message)
        }
    }, [isError, message, error, dispatch, isSuccess]);

    const { showInfo } = useSwal();

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleOpenCropperModal = () => {
        setCropperModalOpen(true);
    };

    const handleCloseCropperModal = () => {
        setCropperModalOpen(false);
    };

    const handleOpenNameModal = () => {
        setNameModalOpen(true);
    };

    const handleCloseNameModal = () => {
        setNameModalOpen(false);
    };

    const updateAvatar = (dataUrl) => {
        setCroppedImage(dataUrl);
        handleCloseCropperModal();
        handleOpenNameModal();
    };

    const handleDelete = async (id, publicId, categoryName) => {
        const result = await showInfo(`Are you sure you want to delete ${categoryName}?`);
        if (result.isConfirmed) {
            dispatch(deleteCategory({ id, publicId }));
        } else {
            console.log("Delete operation canceled");
        }
    };

    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            errorMessage("Please enter a valid category name.");
            return;
        }

        try {
            const formData = new FormData();
            const decodedImage = atob(croppedImage.split(",")[1]);

            const arrayBuffer = new Uint8Array(decodedImage.length);
            for (let i = 0; i < decodedImage.length; i++) {
                arrayBuffer[i] = decodedImage.charCodeAt(i);
            }
            const imageBlob = new Blob([arrayBuffer], { type: "image/png" });
            formData.append("image", imageBlob);
            formData.append("categoryName", categoryName);
            await dispatch(AddCategory(formData));
            handleCloseNameModal();
        } catch (error) {
            errorMessage(error.data.response.error);
        }
    };

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: "Category Image",
            accessor: "categoryImage.url",
            Cell: ({ value }) => (
                <div className="flex justify-center w-full">
                    <img src={value} alt="Banner" className="w-12 h-16 object-cover rounded" />
                </div>
            ),
        },
        { Header: "Category Name", accessor: "categoryName" },
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
                        onClick={() =>
                            handleDelete(
                                row?.original?._id,
                                row?.original?.categoryImage?.publicId,
                                row?.original?.categoryName
                            )
                        }
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Categories</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border border-black
                     shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Category"
                    onClick={handleOpenCropperModal}
                />
            </div>

            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={Array.isArray(CategoryState) ? CategoryState : [CategoryState]} />
            </div>

            <Modal isOpen={cropperModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseCropperModal}>
                <ImageCropper updateAvatar={updateAvatar} dynamicAspectRatio={staticAspectRatio} />
            </Modal>

            <Modal isOpen={nameModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseNameModal}>
                <div className="flex flex-col items-center">
                    <img src={croppedImage} alt="Cropped Category" className="w-96 h-96 object-cover rounded" />
                    <input
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-4 w-full md:w-96 p-2 border border-gray-500 rounded"
                    />
                    <Button
                        text="Save Category"
                        onClick={handleSubmit}
                        className="mt-4 text-white font-sans 
                    text-sm py-3 px-7 rounded-2xl bg-sky-500 hover:bg-sky-600"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default AdminCategory;
