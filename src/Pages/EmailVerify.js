import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data: ", data);
        // Redirect to home page upon successful email verification
        navigate("/");
    };

    return (
        <div
            className="relative bg-cover bg-center h-screen px-4"
            style={{ backgroundImage: "url('https://godare.net/wp-content/uploads/2024/11/bg-banner.png')" }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black-900 opacity-50"></div>

            {/* Container for content */}
            <div className="max-w-7xl mx-auto relative z-10 h-full flex justify-start items-center">
                {/* Form container */}
                <div className="bg-white rounded-5 shadow-lg w-full max-w-lg p-6">
                    <h1 className="text-3xl font-bold text-[#333333] mb-7">Email Verification</h1>
                    <p className="text-[#333333] text-base mb-6">
                        Enter the OTP code we have sent to your email, in order to verify your account.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* OTP Verification */}
                        <div className="mb-4">
                            <label
                                htmlFor="otp"
                                className="block text-lg font-normal text-black-900 mb-1"
                            >
                                OTP Code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                {...register("otp", {
                                    required: "OTP is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/, // Example: Ensures the OTP is a 6-digit number
                                        message: "Invalid OTP format. Please enter a 6-digit code.",
                                    },
                                })}
                                className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.otp
                                    ? "border-red-500 focus:ring-2 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-primary"
                                    }`}
                                placeholder="Enter your OTP code"
                            />
                            {errors.otp && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        {/* Verify button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2.5 font-bold px-4 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Verify OTP
                        </button>

                        {/* Sign up */}
                        <p className="text-left text-sm text-[#666666] mt-6">
                            Don’t have an account?{" "}
                            <Link to="/Login" className="text-primary font-medium underline">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
