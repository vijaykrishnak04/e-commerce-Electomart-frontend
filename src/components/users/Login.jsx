import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userLoginValidation } from "../../schema/user/userLoginValidation";
import Logo from '../../assets/images/logo.jpg'
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import Button from "../../components/Button";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleLogin =  async (values)=> {

}

  return (
    <div className="flex flex-col pl-3 pr-3 md:flex-row mt-20">
      <div className="md:w-1/2 bg-white visible flex md:visible items-center justify-center md:h-auto overflow-hidden">
        <img
          className="w-[9rem] md:w-[16rem]"
          src={Logo}
          alt="Placeholder Image"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 bg-white flex flex-col items-center justify-center">
        <div className="text-4xl font-semibold mb-8 text-center font-poppins">
          Login
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={userLoginValidation}
          onSubmit={(values) => handleLogin(values)}
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
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mb-2"
              />
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mb-2"
              />
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

export default Login;
