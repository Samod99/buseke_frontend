import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import RequestResponseDisplay from "../components/RequestResponseDisplay"; 

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [requestData, setRequestData] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      console.log("Token is ",token);
      console.log("Decoded Token is ",decodedToken);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration(); 
  }, []);

  const onSubmit = async (data) => {
    try {
      setRequestData(data);
      console.log("Data object is", data);

      const response = await axios.post("https://busekeapi.onrender.com/api/auth/login", data);

      setResponseData(response.data);

      const { token, user } = response.data;
      console.log(response.data);

      localStorage.setItem("token", token);
      localStorage.setItem("userID", user._id);
      console.log("Token is in onSubmit ",token);
      console.log("User Id is in onSubmit ",user._id);

      if (user.role === "admin") {
        toast.success("Admin login successful! Redirecting to admin dashboard...", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/admin/account"), 3000);
      } else if (user.role === "operator") {
        toast.success("Operator login successful! Redirecting to operator dashboard...", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/operator/account"), 3000);
      } else {
        toast.error("Invalid role. Please contact support.");
      }
    } catch (error) {
      setResponseData(error.response?.data || { error: "Login failed" });
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div
      className="relative bg-cover bg-center min-h-screen px-4"
      style={{ backgroundImage: "url('https://cctsrilanka.com/wp-content/uploads/2017/12/cctsrilanka.com_.Itinerary-Public-Buses.jpg')" }}
    >
      <div className="absolute inset-0 bg-black-900 opacity-50"></div>
      <div className="max-w-7xl mx-auto relative z-10 py-8 flex flex-col justify-center items-start">
        <div className="bg-white rounded-5 shadow-lg w-full max-w-lg p-6">
          <h1 className="text-3xl font-bold text-[#333333] mb-7">Login</h1>
          <p className="text-[#333333] text-base mb-6">
            Enter your login credentials to access your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-lg font-normal text-black-900 mb-1"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                {...register("username", {
                  //required: "Username is required",
                })}
                className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.username
                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-primary"
                  }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-lg font-normal text-black-900 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  {...register("password", {
                    //required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded focus:outline-none pr-10 ${errors.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-primary"
                    }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 font-bold px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign in
            </button>

            {/* <div className="flex items-center justify-between my-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-primary h-4 w-4"
                />
                <span className="ml-2 text-sm text-[#333333]">Remember me</span>
              </label>
              <Link
                to="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Reset password
              </Link>
            </div> */}

            {/* <p className="text-left text-sm text-[#666666] mt-6">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium underline"
              >
                Sign up
              </Link>
            </p> */}
          </form>
        </div>
        
        <div className="bg-white rounded-5 shadow-lg w-full max-w-lg p-6 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Request Response Data</h2>
          <RequestResponseDisplay req={requestData} res={responseData} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
