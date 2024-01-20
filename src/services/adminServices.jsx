import axiosInstance from "../axios/axios";

export const loginApi = (values) => {
    return axiosInstance('adminJwtToken').post("admin/login",values);
};
