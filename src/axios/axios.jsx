import axios from "axios";

const axiosInstance = (tokenName) => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_SERVER_URL,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    instance.interceptors.request.use((request) => {
        const token = localStorage.getItem(tokenName);
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    // instance.interceptors.response.use(
    //     (response) => response,
    //     (error) => {
    //         const errorResponse = error?.response;
    //         if (errorResponse?.status === 401) {
    //             console.log("Unauthorized error:", errorResponse?.data);
    //         } else if (errorResponse.status === 404) {
    //             console.log("Not found error:", errorResponse?.data);
    //         } else {
    //             console.log("Other error:", errorResponse?.data);
    //         }
    //         return Promise.reject(errorResponse?.data);
    //     }
    // );

    return instance;
};

export default axiosInstance;
