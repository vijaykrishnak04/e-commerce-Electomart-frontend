import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import ImageCropper from "../ImageCropper";
import Dropdown from "../Dropdown";
import ProductSpecification from "./ProductSpecification";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedImages, setCroppedImages] = useState([null, null, null]);
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [currentCropperIndex, setCurrentCropperIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [specifications, setSpecifications] = useState([]);
    const [specModalOpen, setSpecModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedClothSizes, setSelectedClothSizes] = useState(["XL", "L", "M", "S", "XS", "XXL"]);
    const [selectedFootwareSizes, setSelectedFootwareSizes] = useState([1, 2, 3, 5, 6]);
    const [deliveryTime, setDeliveryTime] = useState("");
    const [size, setSize] = useState("");
    const staticAspectRatio = 1;

    const handleRemoveSize = (size) => {
        setSelectedClothSizes(selectedClothSizes.filter((selectedSize) => selectedSize !== size));
    };

    const handleRemoveFootwareSize = (size) => {
        setSelectedFootwareSizes(selectedFootwareSizes.filter((selectedSize) => selectedSize !== size));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenCropperModal = (index) => {
        setCropperModalOpen(true);
        setCurrentCropperIndex(index);
    };

    const handleCloseCropperModal = () => {
        setCropperModalOpen(false);
    };

    const updateImage = (dataUrl) => {
        const newCroppedImages = [...croppedImages];
        newCroppedImages[currentCropperIndex] = dataUrl;
        setCroppedImages(newCroppedImages);
        handleCloseCropperModal();
    };

    const handleAddSpecification = () => {
        if (title && description) {
            setSpecifications([...specifications, { title, description }]);
            setTitle("");
            setDescription("");
            setSpecModalOpen(false);
        }
    };

    const columns = [];
    const data = [];
    const categoryOptions = [
        { value: "category1", label: "Category 1" },
        { value: "category2", label: "Category 2" },
        { value: "category3", label: "Category 3" },
    ];

    const subcategoryOptions = [
        { value: "subcat1", label: "Subcategory 1" },
        { value: "subcat2", label: "Subcategory 2" },
        { value: "subcat3", label: "Subcategory 3" },
    ];

    const deliveryTimingOptions = [
        { value: "subcat1", label: "IN Stock" },
        { value: "subcat2", label: "Arranging Stock" },
        { value: "subcat3", label: "Out of Stock" },
    ];

    const sizeTypeOptions = [
        { value: "size 1", label: "Footware" },
        { value: "size 2", label: "Cloth" },
    ];

    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Products</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border
                     border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Product"
                    onClick={handleOpenModal}
                />
            </div>

            <div className="mt-5 border border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={data} />
            </div>

            <Modal isOpen={isModalOpen} className="w-full p-4 md:w-[90rem] h-auto" onClose={handleCloseModal}>
                <div className="bg-gray-200 p-5">
                    <div className="flex">
                        <div className="w-1/2 gap-5 px-10 p-3 flex flex-col">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="expiryDate">Product Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your Product Name"
                                    className="w-full h-11 rounded-md pl-2"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="expiryDate">Product Price</label>
                                <input type="text" placeholder="eg: 5000" className="w-full h-11 rounded-md pl-2" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="expiryDate">Stock</label>
                                <input type="text" placeholder="eg: 35" className="w-full h-11 rounded-md pl-2" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="expiryDate">Product Description</label>
                                <textarea
                                    name=""
                                    id=""
                                    placeholder="eg: high quality..."
                                    cols="30"
                                    rows="5"
                                    className="w-full rounded-md p-5"
                                ></textarea>
                            </div>
                        </div>

                        <div className="w-1/2">
                            <div className="flex flex-wrap justify-around mt-5">
                                {croppedImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="border p-3 rounded-md w-40 h-36 border-black"
                                        onClick={() => handleOpenCropperModal(index)}
                                    >
                                        {image ? (
                                            <img
                                                src={image}
                                                alt={`Cropped Image ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center flex-col justify-center w-full h-full">
                                                <div className="text-gray-500">
                                                    <AiOutlineCloudUpload className="w-28 animate-bounce h-10" />
                                                </div>
                                                <p className="text-gray-500 text-sm  font-semibold ">Upload Image</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-x-5 mt-8">
                                <Dropdown
                                    selectedOption={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    options={categoryOptions}
                                    defaultLabel="Select category"
                                />

                                <Dropdown
                                    selectedOption={selectedSubcategory}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    options={subcategoryOptions}
                                    defaultLabel="Select Subcategory"
                                />

                                <Dropdown
                                    selectedOption={deliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                    options={deliveryTimingOptions}
                                    defaultLabel="Select Timing"
                                    className="rounded-md"
                                />
                                <Dropdown
                                    selectedOption={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    options={sizeTypeOptions}
                                    defaultLabel="Size Type"
                                    className="rounded-md"
                                />
                            </div>

                            {size !== "size 0" && (
                                <div className="flex justify-center mt-5">
                                    {((size === "size 1" && selectedFootwareSizes.length > 0) ||
                                        (size === "size 2" && selectedClothSizes.length > 0)) && (
                                            <div className="bg-white w-96 h-auto p-4 rounded-full border border-gray-300 flex justify-center flex-wrap">
                                                {size === "size 1" &&
                                                    selectedFootwareSizes.map((size) => (
                                                        <div key={size} className="flex items-center m-2">
                                                            <div className="bg-yellow-100 flex justify-between rounded-full px-3 pt-1 w-20 h-8 mr-2">
                                                                <h1 className="text-sm">{size}</h1>
                                                                <IoIosCloseCircleOutline
                                                                    className="mt-1 text-red-600"
                                                                    onClick={() => handleRemoveFootwareSize(size)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}

                                                {size === "size 2" &&
                                                    selectedClothSizes.map((size) => (
                                                        <div key={size} className="flex items-center m-2">
                                                            <div className="bg-yellow-100 flex justify-between rounded-full px-3 pt-1 w-20 h-8 mr-2">
                                                                <h1 className="text-sm">{size}</h1>
                                                                <IoIosCloseCircleOutline
                                                                    className="mt-1 text-red-600"
                                                                    onClick={() => handleRemoveSize(size)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        )}
                                </div>
                            )}

                            <div className="mt-8 flex justify-center">
                                <button
                                    className="px-3 py-2 bg-green-40 border border-black font-sans border-opacity-50
                                 rounded-md font-semibold"
                                    onClick={() => setSpecModalOpen(true)}
                                >
                                    Add Specification
                                </button>
                            </div>

                            <div className="flex flex-col mb-5 overflow-auto h-20 items-center justify-center">
                                {specifications.map((spec, index) => (
                                    <ProductSpecification
                                        index={index}
                                        key={index}
                                        title={spec.title}
                                        description={spec.description}
                                    />
                                ))}
                            </div>

                            <Modal
                                isOpen={specModalOpen}
                                className="w-[40rem] bg-[#d3d3d3]  p-9 h-auto"
                                onClose={() => setSpecModalOpen(false)}
                            >
                                <div className="flex flex-col gap-2">
                                    <label>Title:</label>
                                    <input
                                        type="text"
                                        value={title}
                                        className="w-full h-11 rounded-md pl-2"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Description:</label>
                                    <textarea
                                        value={description}
                                        className="w-full h-11 rounded-md pl-2"
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex mt-5 justify-center">
                                    <Button
                                        className="px-16 py-2 hover:bg-yellow-50 rounded-md bg-yellow-40"
                                        text="Save"
                                        onClick={handleAddSpecification}
                                    />
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button
                            className="px-16 py-2 font-poppins font-semibold text-opacity-10 rounded-full border
                     border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                            text="Submit"
                        />
                    </div>
                </div>
            </Modal>

            {cropperModalOpen && (
                <Modal isOpen={cropperModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseCropperModal}>
                    <ImageCropper updateAvatar={updateImage} dynamicAspectRatio={staticAspectRatio} />
                </Modal>
            )}
        </>
    );
};

export default Product;
