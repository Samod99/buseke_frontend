import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestResponseDisplay from "../RequestResponseDisplay"; 

const CreateRoute = () => {
    const [formData, setFormData] = useState({
        routeNumber: "",
        startLocation: "",
        endLocation: "",
        stops: "", 
        distance: "",
        averageSpeed: "",
        duration: "",
    });

    const [reqObject, setReqObject] = useState(null);
    const [resObject, setResObject] = useState(null);

    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                stops: formData.stops.split(',').map(stop => stop.trim()) 
            };

            const requestPayload = {
                url: "https://busekeapi.onrender.com/api/routes",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: updatedFormData
            };
            setReqObject(requestPayload);

            const response = await axios.post(requestPayload.url, updatedFormData, {
                headers: requestPayload.headers,
            });

            setResObject({
                status: response.status,
                data: response.data,
            });

            toast.success("Route created successfully!");
        } catch (error) {
            console.error("Error creating route:", error);

            const errorMessage = error.response?.data?.error || "Failed to create route. Please try again.";
            setResObject({
                status: error.response?.status || 500,
                data: errorMessage,
            });
            toast.error(errorMessage);
        }
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Route</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Route Number</label>
                        <input
                            type="text"
                            name="routeNumber"
                            value={formData.routeNumber}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter route number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Location</label>
                        <input
                            type="text"
                            name="startLocation"
                            value={formData.startLocation}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter start location"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Location</label>
                        <input
                            type="text"
                            name="endLocation"
                            value={formData.endLocation}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter end location"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stops</label>
                        <input
                            type="text"
                            name="stops"
                            value={formData.stops}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter stops (comma-separated, e.g., Stop1, Stop2, Stop3)"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distance</label>
                        <input
                            type="Number"
                            name="distance"
                            value={formData.distance}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter distance"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Average Speed</label>
                        <input
                            type="Number"
                            name="averageSpeed"
                            value={formData.averageSpeed}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter average speed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                            type="Number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            //required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                            placeholder="Enter duration"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Route
                    </button>
                </form>
                <ToastContainer />
            </div>
            <RequestResponseDisplay req={reqObject} res={resObject} />
        </div>
    );
};

export default CreateRoute;
