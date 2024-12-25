import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react"; // Added icon import

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Hardcoded credentials
    const credentials = {
        admin: {
            email: "admin@example.com",
            password: "admin123",
        },
        operator: {
            email: "operator@example.com",
            password: "operator123",
        },
    };

    const onSubmit = (data) => {
        if (
            data.email === credentials.admin.email &&
            data.password === credentials.admin.password
        ) {
            toast.success("Admin login successful! Redirecting to account page...", {
                position: "top-right",
                autoClose: 3000,
            });
            setTimeout(() => navigate("/admin/account"), 3000);
        } else if (
            data.email === credentials.operator.email &&
            data.password === credentials.operator.password
        ) {
            toast.success(
                "Operator login successful! Redirecting to profile page...",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
            setTimeout(() => navigate("/operartor/account"), 3000);
        } else {
            toast.error("Invalid email or password!", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <div
            className="relative bg-cover bg-center h-screen px-4"
            style={{ backgroundImage: "url('https://cctsrilanka.com/wp-content/uploads/2017/12/cctsrilanka.com_.Itinerary-Public-Buses.jpg')" }}
        >
            <div className="absolute inset-0 bg-black-900 opacity-50"></div>
            <div className="max-w-7xl mx-auto relative z-10 h-full flex justify-start items-center">
                <div className="bg-white rounded-5 shadow-lg w-full max-w-lg p-6">
                    <h1 className="text-3xl font-bold text-[#333333] mb-7">Login</h1>
                    <p className="text-[#333333] text-base mb-6">
                        Enter your login credentials to access your account
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-lg font-normal text-black-900 mb-1"
                            >
                                Email or phone number
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                {...register("email", {
                                    required: "Email or phone number is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.email
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-2 focus:ring-primary"
                                    }`}
                                placeholder="Enter your email or phone number"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
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
                                        required: "Password is required",
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

                        <div className="flex items-center justify-between my-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-primary h-4 w-4"
                                />
                                <span className="ml-2 text-sm text-[#333333]">Remember me</span>
                            </label>
                            <Link
                                to="/Reset-password"
                                className="text-sm text-primary hover:underline"
                            >
                                Reset password
                            </Link>
                        </div>

                        <p className="text-left text-sm text-[#666666] mt-6">
                            Don’t have an account?{" "}
                            <Link
                                to="/Signup"
                                className="text-primary font-medium underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
