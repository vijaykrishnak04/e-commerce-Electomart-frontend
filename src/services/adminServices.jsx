import axios from "../axios/axios";

export const loginApi = (values) => {
    return axios.post("admin/login", values);
};

export const testingApi = () => {
    return axios.get('/admin/secure-route')
}

export const uploadBannerApi = (formData) => {
    return axios.post('/admin/upload-banner', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', 
        },
    });
};
