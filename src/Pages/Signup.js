import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        trigger,
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
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const onSubmit = async (data) => {
        setErrorMessage("");
        
        try {
            if (step === 1) {
                // Validate first step before moving to next
                const isValid = await trigger(["email", "password"]);
                if (isValid) {
                    setStep(2);
                }
            } else {
                // Validate entire form before submission
                const isValid = await trigger();
                if (isValid) {
                    const response = await axios.post("http://localhost:8080/api/users/register", {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        birthday: data.birthday,
                        email: data.email,
                        password: data.password,
                    });

                    console.log("Signup response: ", response.data);
                    notifySuccess("Signup successful! Redirecting to login...");
                    setTimeout(() => navigate("/login"), 3000);
                }
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Signup failed";
            setErrorMessage(message);
            notifyError(message);
            console.error("Signup error: ", message);
        }
    };

    // Password validation functions
    const validatePasswordStrength = (password) => {
        // At least 8 characters, one uppercase, one lowercase, one number, one special char
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password) || "Password must be strong (8+ chars, uppercase, lowercase, number, special char)";
    };

    // Age validation (must be 13+ years old)
    const validateAge = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 13 || "You must be at least 13 years old to sign up";
    };

    return (
        <div
            className="relative bg-cover bg-center h-screen px-4"
            style={{ backgroundImage: "url('https://godare.net/wp-content/uploads/2024/11/bg-banner.png')" }}
        >
            <div className="absolute inset-0 bg-black-900 opacity-50"></div>
            <div className="max-w-7xl mx-auto relative z-10 h-full flex justify-start items-center">
                <div className="bg-white rounded-5 shadow-lg w-full max-w-lg p-6">
                    <h1 className="text-3xl font-bold text-[#333333] mb-7">
                        Sign up -
                        <span className="font-normal ml-2">
                            {step === 1 ? "Login details" : "Personal details"}
                        </span>
                    </h1>
                    <p className="text-[#333333] text-base mb-6">
                        {step === 1
                            ? "Please enter your login details to create your account"
                            : "Please provide your personal details to complete your signup"}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {step === 1 && (
                            <>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-lg font-normal text-black-900 mb-1"
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
                                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
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
                                        htmlFor="password"
                                        className="block text-lg font-normal text-black-900 mb-1"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            {...register("password", {
                                                required: "Password is required",
                                                validate: {
                                                    strength: validatePasswordStrength
                                                }
                                            })}
                                            className={`w-full px-3 py-2 pr-10 border rounded focus:outline-none ${
                                                errors.password
                                                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-2 focus:ring-primary"
                                            }`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                    <div className="text-sm text-gray-600 mt-1">
                                        Password must:
                                        <ul className="list-disc list-inside">
                                            <li>Be at least 8 characters long</li>
                                            <li>Contain uppercase and lowercase letters</li>
                                            <li>Include a number</li>
                                            <li>Have a special character (@$!%*?&)</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-4">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-lg font-normal text-black-900 mb-1"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        {...register("firstName", {
                                            required: "First name is required",
                                            minLength: {
                                                value: 2,
                                                message: "First name must be at least 2 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "First name cannot exceed 50 characters"
                                            },
                                            pattern: {
                                                value: /^[A-Za-z\s'-]+$/,
                                                message: "First name can only contain letters, spaces, hyphens, and apostrophes"
                                            }
                                        })}
                                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
                                            errors.firstName
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-primary"
                                        }`}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-lg font-normal text-black-900 mb-1"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register("lastName", {
                                            required: "Last name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Last name must be at least 2 characters"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Last name cannot exceed 50 characters"
                                            },
                                            pattern: {
                                                value: /^[A-Za-z\s'-]+$/,
                                                message: "Last name can only contain letters, spaces, hyphens, and apostrophes"
                                            }
                                        })}
                                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
                                            errors.lastName
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-primary"
                                        }`}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="birthday"
                                        className="block text-lg font-normal text-black-900 mb-1"
                                    >
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        id="birthday"
                                        {...register("birthday", {
                                            required: "Birthday is required",
                                            validate: {
                                                age: validateAge
                                            }
                                        })}
                                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
                                            errors.birthday
                                                ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                                : "border-gray-300 focus:ring-2 focus:ring-primary"
                                        }`}
                                        max={new Date().toISOString().split('T')[0]} // Prevent future dates
                                    />
                                    {errors.birthday && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.birthday.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2.5 font-bold px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            {step === 1 ? "Next" : "Sign up"}
                        </button>

                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-4 text-center">
                                {errorMessage}
                            </p>
                        )}

                        <p className="text-left text-sm text-[#666666] mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary font-medium underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;