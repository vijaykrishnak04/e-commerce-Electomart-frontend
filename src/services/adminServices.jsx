import axios from "../axios/axios";

export const loginApi = (values) => {
    return axios.post("admin/login", values);
};

export const testingApi = () => {
    return axios.get("/admin/secure-route");
};

export const uploadBannerApi = (formData) => {
    return axios.post("/admin/upload-banner", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const deleteBannerApi = (id, publicId) => {
    console.log("line in service ", id, publicId);
    return axios.delete(`/admin/delete-banner/banner/${id}`, { data: { publicId } });
};

export const getBannersApi = () => {
    return axios.get("/admin/get-banners");
};

export const addCategoryApi = (data) => {
    return axios.post("/admin/add-category", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllCategoriesApi = () => {
    return axios.get("/admin/get-categories");
};

export const AddSubcategoryApi = (data) => {
    return axios.post("/admin/add-subcategory", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllSubcategoriesApi = () => {
    return axios.get("/admin/get-subcategories");
};

export const getAllUsersApi = () => {
    return axios.get("/admin/get-all-users");
};

export const getAllOrdersApi = () => {
    return axios.get("/admin/get-all-orders");
};

export const addCouponsApi = (data) => {
    return axios.post("/admin/add-coupons", data);
};

export const getAllCouponsApi = () => {
    return axios.get("/admin/get-all-coupons");
};

export const addProductApi = (data) => {
    return axios.post("/admin/add-product", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllProductApi = () => {
    return axios.get("/admin/get-all-products");
};

export const deleteCouponApi = (id) => {
    return axios.delete(`/admin/delete-coupon/${id}`);
};

export const deleteCategoryApi = ({ id, publicId }) => {
    return axios.delete(`/admin/delete-category/${id}`, { data: { publicId } });
};

export const deleteSubcategoryApi = ({ categoryId, subcategoryId, publicId }) => {
    return axios.delete(`/admin/categories/${categoryId}/subcategories/${subcategoryId}`, { data: { publicId } });
};

export const updateStatusApi = ({id, status}) => {
    console.log(id,status);
    return axios.patch(`/admin/update-status/${id}`, { data: { status } })
}