import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

Modal.setAppElement("#root");

const Timetable = () => {
    const [timetables, setTimetables] = useState([]);
    const [selectedTimetable, setSelectedTimetable] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        fetchTimetables();
    }, []);

    const fetchTimetables = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/timetables");
            setTimetables(response.data);
        } catch (error) {
            toast.error("Failed to fetch timetables");
        }
        setLoading(false);
    };

    const openModal = (timetable) => {
        setSelectedTimetable(timetable);
    };

    const closeModal = () => {
        setSelectedTimetable(null);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Timetable Details", 20, 10);
        const tableData = selectedTimetable.details.map((detail) => [
            detail.bus.busNumber,
            `${detail.departureLocation} at ${detail.departureTime}`,
            `${detail.arrivalLocation} at ${detail.arrivalTime}`,
            detail.stops.join(", "),
        ]);
        doc.autoTable({
            head: [["Bus Number", "Departure", "Arrival", "Stops"]],
            body: tableData,
        });
        doc.save("TimetableDetails.pdf");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">Timetables</h1>

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Departure Location</th>
                        <th className="border border-gray-300 px-4 py-2">Arrival Location</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timetables.map((timetable) => (
                        <tr key={timetable._id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">
                                {timetable.route.startLocation}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {timetable.route.endLocation}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => openModal(timetable)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for timetable details */}
            {selectedTimetable && (
                <Modal
                    isOpen={!!selectedTimetable}
                    onRequestClose={closeModal}
                    className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 relative mt-20"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Timetable Details</h2>

                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Bus Number</th>
                                <th className="border border-gray-300 px-4 py-2">Departure</th>
                                <th className="border border-gray-300 px-4 py-2">Arrival</th>
                                <th className="border border-gray-300 px-4 py-2">Stops</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTimetable.details.map((detail, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">
                                        {detail.bus.busNumber}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {detail.departureLocation} at {detail.departureTime}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {detail.arrivalLocation} at {detail.arrivalTime}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {detail.stops.join(", ")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            onClick={downloadPDF}
                        >
                            Download PDF
                        </button>
                    </div>

                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
                        onClick={closeModal}
                    >
                        ×
                    </button>
                </Modal>
            )}
            <ToastContainer />
        </div>
    );
};

export default Timetable;
