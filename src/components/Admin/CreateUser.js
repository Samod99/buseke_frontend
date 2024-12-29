import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user", 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users", formData);
            toast.success("User created successfully!");
            console.log("User created:", response.data);
        } catch (error) {
            console.error("Error creating user:", error);
            
            const errorMessage = error.response?.data?.error || "Failed to create user. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create User</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter user's name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter role"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create User
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateUser;
