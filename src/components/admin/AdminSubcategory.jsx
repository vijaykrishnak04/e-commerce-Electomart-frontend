import { MdDelete } from "react-icons/md";
import Button from "../Button";
import DataTable from "../DataTable";
import { BiSolidEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import ImageCropper from "../ImageCropper";
import { AddSubcategory, getAllSubcategories } from "../../app/slices/admin/adminSubcategorySlice";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";
import { getAllCategories } from "../../app/slices/admin/adminCategorySlice";
import { errorMessage, successMessage } from "../../hooks/message";



const AdminSubcategory = () => {
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [nameModalOpen, setNameModalOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const staticAspectRatio = 1

    const dispatch = useDispatch()
    const hello = useSelector((state) => state?.Category?.CategoryData)
    console.log("line 25", hello);
    const { isLoading } = useSelector((state) => state?.Subcategory)

    const categoryData = useSelector((state) => state?.Category?.CategoryData)
    const subcategoryData = useSelector((state) => state?.Subcategory?.SubcategoryData)
    console.log("line 26 ", categoryData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllCategories());
                await dispatch(getAllSubcategories());
            } catch (error) {
                console.log(error)
            }
        };
    
        fetchData();
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


    const dynamicOptions = categoryData.map(category => ({
        value: category?.categoryName,
        label: category?.categoryName,
    }));

    console.log("line 64", dynamicOptions);

    const handleSubmit = async () => {
        if (!subcategoryName.trim()) {
            errorMessage("Please enter a valid category name.");
            return;
        }
        if (!selectedOption.trim()) {
            errorMessage("Please enter a valid category name.");
            return;
        }

        try {
            const formData = new FormData();
            const decodedImage = atob(croppedImage.split(',')[1]);

            const arrayBuffer = new Uint8Array(decodedImage.length);
            for (let i = 0; i < decodedImage.length; i++) {
                arrayBuffer[i] = decodedImage.charCodeAt(i);
            }
            const imageBlob = new Blob([arrayBuffer], { type: 'image/png' });
            formData.append("image", imageBlob);
            formData.append("subcategoryName", subcategoryName);
            formData.append("selectedCategory", selectedOption)
            await dispatch(AddSubcategory(formData));
            handleCloseNameModal();
            successMessage("Subcategory created successfully!");
        } catch (error) {
            errorMessage(error)
        }

    };

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row.index + 1,
        },
        {
            Header: "Subcategory Image",
            accessor: "subCategoryImage.url", 
            Cell: ({ value }) => (
                <div className="flex justify-center">
                    <img src={value} alt="Subcategory" className="w-12 h-16  object-cover rounded" />
                </div>
            ),
        },
        { Header: "Subcategory Name", accessor: "subCategoryName" }, 
        {
            Header: "Category Name",
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


 

    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Subcategories</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border border-black
                     shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Subcategory"
                    onClick={handleOpenCropperModal}
                />
            </div>

            <div className="mt-5 border  border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={subcategoryData} />
            </div>

            <Modal isOpen={cropperModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseCropperModal}>
                <ImageCropper updateAvatar={updateAvatar} dynamicAspectRatio={staticAspectRatio} />
            </Modal>

            <Modal isOpen={nameModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseNameModal}>
                <div className="flex flex-col items-center">
                    <img src={croppedImage} alt="Cropped Category" className="w-96 h-96 object-cover rounded" />
                    <Dropdown
                        selectedOption={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        options={dynamicOptions}
                    />
                    <input
                        type="text"
                        placeholder="Enter subcategory name"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        className="mt-4 w-full md:w-96 p-2 border border-gray-500 rounded"
                    />

                    <Button
                        text={isLoading ? "Saving..." : "Save Subcategory"}
                        onClick={handleSubmit}
                        className={`mt-4 text-white font-sans text-sm py-3 px-7 rounded-xl ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
                            }`}
                        disabled={isLoading}
                    />
                </div>
            </Modal>


        </>
    )
}

export default AdminSubcategory;