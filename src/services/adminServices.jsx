import axiosInstance from "../axios/axios";

export const loginApi = (values) => {
    return axiosInstance('AdminAccessToken').post("admin/login",values);
};
