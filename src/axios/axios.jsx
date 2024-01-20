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

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem("AdminRefreshToken");
                    const response = await axios.post("/refresh-token", { refreshToken });

                    localStorage.setItem(tokenName, response.data.accessToken);
                    return axiosInstance(tokenName).request(originalRequest);
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                }
            }

            return Promise.reject(error);
        }
    );
    return instance;
};

export default axiosInstance;
