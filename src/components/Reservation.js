import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const ReservationPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        passengers: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Reservation data submitted:", formData);
        toast.success("Reservation successful!"); // Show success toast
    };

    return (
        <div className="py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-lg p-8">
                <div className="flex justify-center items-center">
                    <img
                        src="https://travel-eat-love.de/wp-content/uploads/2020/04/Sri_Lanka_Bus-scaled.jpg"
                        alt="Reservation"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-6 text-center">Bus Reservation</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="time">
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="passengers">
                                Number of Passengers
                            </label>
                            <input
                                type="number"
                                id="passengers"
                                name="passengers"
                                value={formData.passengers}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Reserve Now
                        </button>
                    </form>
                </div>
            </div>
            {/* ToastContainer component to display toast notifications */}
            <ToastContainer />
        </div>
    );
};

export default ReservationPage;
