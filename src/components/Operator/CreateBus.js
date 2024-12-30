import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBus = () => {
    const [formData, setFormData] = useState({
        busNumber: "",
        capacity: "",
        routeId: "",
        operatorId: "", 
        seatCount: "",
        ownershipType: "", 
    });

    const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/buses", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Bus created successfully!");
        } catch (error) {
            console.error("Error creating bus:", error);
            
            const errorMessage = error.response?.data?.error || "Failed to create bus. Please try again.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Bus</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                        <input
                            type="text"
                            name="busNumber"
                            value={formData.busNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter bus number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Capacity</label>
                        <input
                            type="Number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter capacity"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Route Id</label>
                        <input
                            type="text"
                            name="routeId"
                            value={formData.routeId}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter route id"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Operator Id</label>
                        <input
                            type="text"
                            name="operatorId"
                            value={formData.operatorId}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter operator id"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Seat Count</label>
                        <input
                            type="Number"
                            name="seatCount"
                            value={formData.seatCount}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter seat count"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ownership Type</label>
                        <input
                            type="text"
                            name="ownershipType"
                            value={formData.ownershipType}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="SLTB or PRIVATE"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Bus
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CreateBus;
