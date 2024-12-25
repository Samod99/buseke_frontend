import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const ChangePwd = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange'
    });

    const notifySuccess = (message) => {
        toast.success(message, { 
            position: "top-right",
            autoClose: 3000,
        });
    };

    const notifyError = (message) => {
        toast.error(message, { 
            position: "top-right",
            autoClose: 3000,
        });
    };

    // Password validation functions (matching Signup component)
    const validatePasswordStrength = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password) || "Password must be strong (8+ chars, uppercase, lowercase, number, special char)";
    };

    // Ensure new password is different from current password
    const validateNewPassword = (newPassword) => {
        const currentPassword = watch("currentPassword");
        return newPassword !== currentPassword || "New password must be different from current password";
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const onSubmit = async (data) => {
        setErrorMessage("");
        
        try {
            const response = await axios.post("http://localhost:8080/reset-password", {
                email: data.email,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });

            console.log("Reset password response: ", response.data);
            notifySuccess("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Password reset failed";
            setErrorMessage(message);
            notifyError(message);
            console.error("Reset password error: ", message);
        }
    };

    return (
        <div
            className="relative bg-cover bg-center px-4"
            
        >
          
            <div className="">
                <div className="">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 mb-5">
                        Reset Password
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                    validate: {
                                        noWhitespace: (value) => 
                                            !value.includes(' ') || "Email cannot contain spaces"
                                    }
                                })}
                                className={`w-full px-3 py-2 pr-10 border rounded sm:text-sm bg-gray-100 py-2 px-4 focus:outline-none ${
                                    errors.email
                                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-2 focus:ring-primary"
                                }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4 relative">
                            <label
                                htmlFor="currentPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    id="currentPassword"
                                    {...register("currentPassword", {
                                        required: "Current password is required",
                                        validate: {
                                            strength: validatePasswordStrength
                                        }
                                    })}
                                    className={`w-full px-3 py-2 pr-10 border rounded sm:text-sm bg-gray-100 py-2 px-4 focus:outline-none ${
                                        errors.currentPassword
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-2 focus:ring-primary"
                                    }`}
                                    placeholder="Enter your current password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleCurrentPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.currentPassword && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.currentPassword.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4 relative">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="newPassword"
                                    {...register("newPassword", {
                                        required: "New password is required",
                                        validate: {
                                            strength: validatePasswordStrength,
                                            differentFromCurrent: validateNewPassword
                                        }
                                    })}
                                    className={`w-full px-3 py-2 pr-10 border rounded sm:text-sm bg-gray-100 py-2 px-4 focus:outline-none ${
                                        errors.newPassword
                                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                            : "border-gray-300 focus:ring-2 focus:ring-primary"
                                    }`}
                                    placeholder="Enter your new password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleNewPasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-sm text-red-500 mt-1 text-left">
                                    {errors.newPassword.message}
                                </p>
                            )}
                            
                        </div>

                        <button
                            type="submit"
                            className="mt-4 px-8 py-2 text-sm bg-[#2b241a] text-white rounded-md"
                        >
                            Reset Password
                        </button>

                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-4 text-left">
                                {errorMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChangePwd;