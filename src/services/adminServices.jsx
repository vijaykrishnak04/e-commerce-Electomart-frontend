import axios from "../axios/axios";

export const loginApi = (values) => {
    return axios.post("admin/login",values);
};

export const testingApi = () => {
    return axios.get('/admin/secure-route')
}
