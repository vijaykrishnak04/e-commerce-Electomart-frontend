import { AiOutlineCloudUpload } from "react-icons/ai";
import { useEffect, useState } from "react";
import Button from "../Button";
import DataTable from "../DataTable";
import Modal from "../Modal";
import ImageCropper from "../ImageCropper";
import { errorMessage, successMessage } from "../../hooks/message";
import ProductSpecification from "./ProductSpecification";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { AddProducts, getAllProducts } from "../../app/slices/admin/adminProductSlice";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { getAllCategories } from "../../app/slices/admin/adminCategorySlice";
import { getAllSubcategories } from "../../app/slices/admin/adminSubcategorySlice";

const Product = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedImages, setCroppedImages] = useState([null, null, null]);
    const [cropperModalOpen, setCropperModalOpen] = useState(false);
    const [currentCropperIndex, setCurrentCropperIndex] = useState(0);
    const [specifications, setSpecifications] = useState([]);
    const [specModalOpen, setSpecModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showImage, setShowImage] = useState(false)
    const [title, setTitle] = useState("");
    const [displayProductId, setDisplayProductId] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedClothSizes, setSelectedClothSizes] = useState(["XL", "L", "M", "S", "XS", "XXL"]);
    const [selectedFootwareSizes, setSelectedFootwareSizes] = useState([1, 2, 3, 5, 6]);
    const [size, setSize] = useState("");
    const staticAspectRatio = 1;

    const dispatch = useDispatch()
    const categories = useSelector((state) => state?.Category?.CategoryData)
    const subcategories = useSelector((state) => state?.Subcategory?.SubcategoryData)
    const products = useSelector((state) => state?.adminProducts?.productData)


    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories())
        dispatch(getAllSubcategories())
    }, [dispatch]);


    const initialValues = {
        productName: '',
        productPrice: '',
        stock: '',
        productDescription: '',
        category: '',
        subcategory: '',
        deliveryTime: '',
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        productPrice: Yup.string()
            .required('Product Price is required')
            .matches(/^[0-9]+$/, 'Product Price must contain only numbers'),
        stock: Yup.string()
            .required('Stock is required')
            .matches(/^[0-9]+$/, 'Stock must contain only numbers'),
        productDescription: Yup.string().required('Product Description is required'),
        category: Yup.string().required('Category is Required'),
        subcategory: Yup.string().required('Subcategory is Required'),
        deliveryTime: Yup.string().required('Delivery Time is Required'),
    });


    const handleSubmit = (values) => {
        try {
            if (croppedImages.every((image) => image !== null)) {
                const formData = new FormData();
                croppedImages.forEach((croppedImage, index) => {
                    const decodedImage = atob(croppedImage.split(',')[1]);
                    const arrayBuffer = new Uint8Array(decodedImage.length);

                    for (let i = 0; i < decodedImage.length; i++) {
                        arrayBuffer[i] = decodedImage.charCodeAt(i);
                    }

                    const imageBlob = new Blob([arrayBuffer], { type: 'image/png' });
                    formData.append("images", imageBlob);
                });
                formData.append("productName", values?.productName);
                formData.append("productPrice", values?.productPrice);
                formData.append("stock", values?.stock);
                formData.append("productDescription", values?.productDescription);
                formData.append("category", values?.category);
                formData.append("subcategory", values?.subcategory);
                formData.append("deliveryTime", values?.deliveryTime);
                formData.append("specifications", JSON.stringify(specifications));
                if (size === "Footware") {
                    formData.append("size", selectedFootwareSizes);
                    formData.append("sizeType", size);
                } else if (size === "Cloth") {
                    formData.append("size", selectedClothSizes);
                    formData.append("sizeType", size);
                }

                dispatch(AddProducts(formData));
                successMessage("Product Added Successfully")
                handleCloseModal()
            } else {
                errorMessage("Please Select all 3 Images")
                console.error("Please select all 3 images");
            }
        } catch (error) {
            errorMessage("Something went wrong")
            console.error(error);
        }
    };


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

    const handleOpenShowImage = (productId) => {
        setShowImage(true);
        setDisplayProductId(productId);
    };

    const handleCloseShowImage = () => {
        setShowImage(false)
    }

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
        } else {
            errorMessage("Please Check Input are filled")
        }
    };

    const columns = [
        {
            Header: "No",
            Cell: ({ row }) => row?.index + 1,
        },
        {
            Header: "Image",
            accessor: "categoryImage.url",
            Cell: ({ row }) => (
                <div className="flex justify-center w-full">
                    <FaEye className="text-blue-500 w-6 h-10" onClick={() => handleOpenShowImage(row?.original?._id)} />
                </div>
            ),
        },
        { Header: "Product Name", accessor: "productName" },
        { Header: "Price", accessor: "productPrice" },
        { Header: "Stock", accessor: "stock" },
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
    const data = [];

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const newCroppedImages = [...croppedImages];
            newCroppedImages[index] = reader.result;
            setCroppedImages(newCroppedImages);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className="flex justify-between item-center p-4">
                <h1 className="text-black text-2xl font-poppins font-Bold">Products</h1>
                <Button
                    className="px-5 py-2 font-poppins font-semibold text-opacity-10 rounded border
                     border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                    text="Add Product"
                    types='button'
                    onClick={handleOpenModal}
                />
            </div>

            <div className="mt-5 border border-black p-5 rounded text-center mx-auto bg-white">
                <DataTable columns={columns} data={products} />
            </div>

            <Modal isOpen={isModalOpen} className="w-full p-4 md:w-[90rem] h-auto" onClose={handleCloseModal}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue }) => (
                        <Form>
                            <div className="bg-gray-200 p-5">
                                <div className="flex">
                                    <div className="w-1/2 gap-5 px-10 p-3 flex flex-col">
                                        <div className="flex flex-col gap-2 ">
                                            <label htmlFor="expiryDate">Product Name</label>
                                            <Field
                                                type="text"
                                                placeholder="Enter your Product Name"
                                                className="w-full h-11 rounded-md pl-2"
                                                name='productName'
                                            />
                                            <div>
                                                <ErrorMessage name="productName" component="div" className="text-red-500" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="expiryDate">Product Price</label>
                                            <Field type="text" placeholder="eg: 5000" name='productPrice' className="w-full h-11 rounded-md pl-2" />
                                            <div>
                                                <ErrorMessage name="productPrice" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="expiryDate">Stock</label>
                                            <Field type="text" placeholder="eg: 35" name='stock' className="w-full h-11 rounded-md pl-2" />
                                            <div>
                                                <ErrorMessage name="stock" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="expiryDate">Product Description</label>
                                            <Field
                                                name="productDescription"
                                                placeholder="eg: high quality..."
                                                cols="30"
                                                rows="5"
                                                className="w-full rounded-md p-5"
                                            />
                                            <div>
                                                <ErrorMessage name="productDescription" component="div" className="text-red-500" />
                                            </div>
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
                                                            name="images"
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
                                                    <div className="mt-3">
                                                        <ErrorMessage name={`images[${index}]`} component="div" className="text-red-500" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center  gap-4">
                                            <div className="flex flex-col gap-x-5 mt-8">
                                                <label htmlFor="category">Category</label>
                                                <Field
                                                    as="select"
                                                    name="category"
                                                    className="rounded-md"
                                                >
                                                    <option value="" label="Select category" />
                                                    {categories.map((category) => (
                                                        <option key={category.id} value={category.categoryName} >{category.categoryName}</option>
                                                    ))}
                                                </Field>
                                                <div>
                                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                                </div>
                                            </div>


                                            <div className="flex flex-col gap-x-5 mt-8">
                                                <label htmlFor="subcategory">Subcategory</label>
                                                <Field
                                                    as="select"
                                                    name="subcategory"
                                                    className="rounded-md"
                                                >
                                                    <option value="" label="Select Subcategory" />
                                                    {subcategories.map((subcategory) => (
                                                        <option key={subcategory.subcategoryId} value={subcategory.subcategoryName} >{subcategory.subcategoryName}</option>
                                                    ))}
                                                </Field>
                                                <div>
                                                    <ErrorMessage name="subcategory" component="div" className="text-red-500 text-sm" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-x-5 mt-8">
                                                <label htmlFor="deliveryTime">Delivery Timing</label>
                                                <Field
                                                    as="select"
                                                    name="deliveryTime"
                                                    className="rounded-md"
                                                >
                                                    <option value="" label="Select Timing" />
                                                    <option value="In Stock" label="In Stock" />
                                                    <option value="Arranging Stock" label="Arranging Stock" />
                                                    <option value="Out Of Stock" label="Out of Stock" />
                                                </Field>
                                                <div>
                                                    <ErrorMessage name="deliveryTime" component="div" className="text-red-500 text-sm" />
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-x-5 mt-8">
                                                <label htmlFor="size">Size Type</label>
                                                <Field
                                                    name="size"
                                                    as="select"
                                                    onChange={(e) => setSize(e.target.value)}
                                                    className="rounded-md"
                                                >
                                                    <option value="" label="Select Size Type" />
                                                    <option value="Footware" label="Footware" />
                                                    <option value="Cloth" label="Cloth" />
                                                </Field>
                                                <div>
                                                    <ErrorMessage name="size" component="div" className="text-red-500 " />
                                                </div>
                                            </div>
                                        </div>
                                        {["Footware", "Cloth"].includes(size) && (
                                            <div className="flex justify-center mt-5">
                                                {((size === "Footware" && selectedFootwareSizes.length > 0) ||
                                                    (size === "Cloth" && selectedClothSizes.length > 0)) && (
                                                        <div className="bg-white w-96 h-auto p-4 rounded-full border border-gray-300 flex justify-center flex-wrap">
                                                            {size === "Footware" &&
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

                                                            {size === "Cloth" &&
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
                                            <Button
                                                className="px-3 py-2 bg-green-40 border border-black font-sans border-opacity-50
                                                rounded-md font-semibold"
                                                types='button'
                                                onClick={() => setSpecModalOpen(true)}
                                                text="Add Specification"
                                            />


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
                                            className="w-[40rem] bg-[#b9b7b7]  p-9 h-auto"
                                            onClose={() => setSpecModalOpen(false)}
                                        >
                                            <div className="flex flex-col gap-2">
                                                <label>Title:</label>
                                                <Field
                                                    type="text"
                                                    value={title}
                                                    name='title'
                                                    className="w-full h-11 rounded-md pl-2"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                                <div>
                                                    <ErrorMessage name="title" component="div" className="text-red-500" />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label>Description:</label>
                                                <Field
                                                    value={description}
                                                    name="description"
                                                    className="w-full h-11 rounded-md pl-2"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                                <div>
                                                    <ErrorMessage name="description" component="div" className="text-red-500 " />
                                                </div>
                                            </div>

                                            <div className="flex mt-5 justify-center">
                                                <Button
                                                    className="px-16 py-2 hover:bg-yellow-50 rounded-md bg-yellow-40"
                                                    text="Save"
                                                    types='button'
                                                    onClick={handleAddSpecification}
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-5">
                                    <Button
                                        types='submit'
                                        className="px-16 py-2 font-poppins font-semibold text-opacity-10 rounded-full border
                                    border-black shadow-md bg-yellow-50 hover:bg-yellow-40"
                                        text="Submit"
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <Modal isOpen={showImage} className="w-[40rem] p-9 h-auto" onClose={handleCloseShowImage}>
                <div className="grid grid-cols-3 gap-4">
                    {displayProductId && products.some(product => product._id === displayProductId) ? (
                        products
                            .find(product => product._id === displayProductId)
                            .images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            ))
                    ) : (
                        <p>No images available for the selected product.</p>
                    )}
                </div>
            </Modal>
            {cropperModalOpen && (
                <Modal isOpen={cropperModalOpen} className="w-[40rem] p-9 h-auto" onClose={handleCloseCropperModal}>
                    <ImageCropper onChange={handleImageChange} updateAvatar={updateImage} dynamicAspectRatio={staticAspectRatio} />
                </Modal>
            )}
        </>
    );
};

export default Product;
