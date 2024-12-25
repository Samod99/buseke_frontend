import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure accessibility

const BusSchedule = () => {
    const [selectedBus, setSelectedBus] = useState(null);

    const busData = [
        {
            id: 1,
            busNumber: "B101",
            route: "Downtown - Central Park",
            time: "08:30 AM",
            duration: "1h 15m",
        },
        {
            id: 2,
            busNumber: "B202",
            route: "Central Park - Uptown",
            time: "10:00 AM",
            duration: "45m",
        },
        {
            id: 3,
            busNumber: "B303",
            route: "Uptown - Suburbs",
            time: "12:15 PM",
            duration: "1h",
        },
    ];

    const openModal = (bus) => {
        setSelectedBus(bus);
    };

    const closeModal = () => {
        setSelectedBus(null);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">Bus Schedule</h1>

            <div className="hidden md:block">
                {/* Table for larger screens */}
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Bus Number</th>
                            <th className="border border-gray-300 px-4 py-2">Route</th>
                            <th className="border border-gray-300 px-4 py-2">Departure Time</th>
                            <th className="border border-gray-300 px-4 py-2">Duration</th>
                            <th className="border border-gray-300 px-4 py-2">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busData.map((bus) => (
                            <tr key={bus.id} className="text-center">
                                <td className="border border-gray-300 px-4 py-2">{bus.busNumber}</td>
                                <td className="border border-gray-300 px-4 py-2">{bus.route}</td>
                                <td className="border border-gray-300 px-4 py-2">{bus.time}</td>
                                <td className="border border-gray-300 px-4 py-2">{bus.duration}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => openModal(bus)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden">
                {/* Cards for smaller screens */}
                {busData.map((bus) => (
                    <div
                        key={bus.id}
                        className="bg-white shadow-md rounded-md p-4 mb-4"
                    >
                        <h2 className="text-xl font-bold mb-2">{bus.busNumber}</h2>
                        <p className="text-gray-700">Route: {bus.route}</p>
                        <p className="text-gray-700">Departure: {bus.time}</p>
                        <p className="text-gray-700">Duration: {bus.duration}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => openModal(bus)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedBus && (
                <Modal
                    isOpen={!!selectedBus}
                    onRequestClose={closeModal}
                    className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 relative"
                    overlayClassName="fixed inset-0 bg-black-900 bg-opacity-50 flex items-center justify-center z-1"
                >
                    <h2 className="text-2xl font-bold mb-4">Bus Details</h2>
                    <p className="mb-2">Bus Number: {selectedBus.busNumber}</p>
                    <p className="mb-2">Route: {selectedBus.route}</p>
                    <p className="mb-2">Departure Time: {selectedBus.time}</p>
                    <p className="mb-4">Duration: {selectedBus.duration}</p>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default BusSchedule;
