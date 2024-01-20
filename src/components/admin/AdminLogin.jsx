// AdminLogin.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Logo from "../../assets/images/site-logo.png";
import { IoPerson } from "react-icons/io5";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { adminLoginValidationSchema } from "../../schema/admin/adminLoginValidaton";
import { loginApi } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";
import { message } from 'antd'
import axiosInstance from "../../axios/axios";




const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleAdminLogin = async (values) => {
        try {
          const response = await loginApi(values);
          console.log(response)
    
          if (response && response.status === 200) {
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
    
            localStorage.setItem("AdminAccessToken", accessToken);
            localStorage.setItem("AdminRefreshToken", refreshToken);
    

            const updatedAxiosInstance = axiosInstance("AdminAccessToken");
    
            const secureResponse = await updatedAxiosInstance.get("/admin/secure-route");
    
            console.log("Secure route response:", secureResponse.data);
    
            message.success(response?.data?.message);
            navigate("/admin/dashboard");
          } else {
            console.error("Unexpected response:", response);
            message.error("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.log(error.response.data.message);
          message.error(error.response.data.message);
        }
      };

    return (
        <div className="flex flex-col pl-3 pr-3 md:flex-row h-screen">
            <div className="md:w-1/2 bg-white visible flex md:visible items-center justify-center md:h-auto overflow-hidden">
                <img className="w-[18rem] md:w-[33rem] h-auto" src={Logo} alt="Placeholder Image" />
            </div>

            <div className="w-full md:w-1/2 p-8 bg-white flex flex-col items-center justify-center">
                <div className="text-4xl font-semibold mb-8 text-center font-poppins">Admin Login</div>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={adminLoginValidationSchema}
                    onSubmit={(values) => handleAdminLogin(values)}
                >
                    <Form className="w-full max-w-md">
                        <div className="mb-6 relative">
                            <div className="relative">
                                <Field
                                    type="text"
                                    placeholder="Email"
                                    className="w-full h-12 p-5 bg-gray-200 rounded-md pr-10"
                                    name="email"
                                />
                                <IoPerson className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500" />
                            </div>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mb-2" />
                        </div>

                        <div className="mb-6 relative">
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full h-12 p-5 bg-gray-200 rounded-md pr-10"
                                    name="password"
                                />
                                {showPassword ? (
                                    <GoEye
                                        className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <GoEyeClosed
                                        className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500 cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mb-2" />
                        </div>
                        <div className="w-full mb-6">
                            <Button
                                type="submit"
                                text="Login"
                                className="w-full h-12 hover:bg-yellow-40 bg-yellow-50 rounded-full text-black text-lg font-medium"
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default AdminLogin;
