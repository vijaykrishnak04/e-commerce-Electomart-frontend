import { useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import { errorMessage, successMessage } from "../../hooks/message";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import ImageCropper from "../ImageCropper";
import { useDispatch } from "react-redux";
import { AddCategory } from "../../app/slices/admin/adminCategorySlice";



const AdminCategory = () => {
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [nameModalOpen, setNameModalOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [categoryName, setCategoryName] = useState("");
    const staticAspectRatio = 1

    const dispatch = useDispatch()

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

  

    const handleSubmit = async () => {
        if (!categoryName.trim()) {
            errorMessage("Please enter a valid category name.");
            return;
        }
    
        try{
            const formData = new FormData();
            const decodedImage = atob(croppedImage.split(',')[1]);

            const arrayBuffer = new Uint8Array(decodedImage.length);
            for (let i = 0; i < decodedImage.length; i++) {
                arrayBuffer[i] = decodedImage.charCodeAt(i);
            }
            const imageBlob = new Blob([arrayBuffer], { type: 'image/png' });
            formData.append("image", imageBlob);
            formData.append("categoryName", categoryName);
            await dispatch(AddCategory(formData));
            handleCloseNameModal();
            successMessage("Category created successfully!");
        }catch(error){
            errorMessage(error.data.response.error)
        }
       
    };

    const data = []

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
                <DataTable columns={columns} data={data} />
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
                    <Button text="Save Category" onClick={handleSubmit} className="mt-4 text-white font-sans 
                    text-sm py-3 px-7 rounded-2xl bg-sky-500 hover:bg-sky-600" />
                </div>
            </Modal>
        </div>
    );
};

export default AdminCategory;
