// Product.jsx
import { useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import ImageCropper from "../ImageCropper";
import Dropdown from "../Dropdown";
import ProductSpecification from "./ProductSpecification";

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
    const staticAspectRatio = 1;

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

    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Products</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Product"
                    onClick={handleOpenModal}
                />
            </div>

            <div className="mt-5 border border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={data} />
            </div>

            <Modal isOpen={isModalOpen} className="w-full p-4 md:w-[90rem] h-auto" onClose={handleCloseModal}>
                <div className="flex">
                    <div className="w-1/2 gap-5 bg-blue-200 px-10 p-3 flex flex-col">
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

                    <div className="w-1/2 bg-yellow-200">
                        <div className="flex justify-evenly mt-5">
                            {croppedImages.map((image, index) => (
                                <div key={index} className="border p-3 rounded-md w-40 h-36 border-black" onClick={() => handleOpenCropperModal(index)}>
                                    {image && <img src={image} alt={`Cropped Image ${index}`} className="w-full h-full object-cover" />}
                                </div>
                            ))}
                        </div>


                        {/* <div>
                            <Button text="Submit" className="px-3 py-2 bg-yellow-40" />
                        </div> */}
                        <div className="flex gap-x-5 mt-8 px-16">
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

                        </div>

                        <div className="mt-4">
                            <button className="px-3 py-2 bg-yellow-40" onClick={() => setSpecModalOpen(true)}>
                                Add Specification
                            </button>
                        </div>

                        {/* Display Product Specifications */}
                        {specifications.map((spec, index) => (
                            <ProductSpecification key={index} title={spec.title} description={spec.description} />
                        ))}

                        {/* Modal for Adding Specification */}
                        <Modal isOpen={specModalOpen} className="w-[40rem] p-9 h-auto" onClose={() => setSpecModalOpen(false)}>
                            <div>
                                <label>Title:</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <button onClick={() => handleAddSpecification()}>Save</button>
                        </Modal>

                    </div>
                </div>
            </Modal>

            {cropperModalOpen && (
                <Modal
                    isOpen={cropperModalOpen}
                    className="w-[40rem] p-9 h-auto"
                    onClose={handleCloseCropperModal}
                >
                    <ImageCropper updateAvatar={updateImage} dynamicAspectRatio={staticAspectRatio} />
                </Modal>
            )}
        </>
    );
};

export default Product;
