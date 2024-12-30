import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTimetable = () => {
  const [formData, setFormData] = useState({
    route: "",
    creater: "",
    validFrom: "",
    validTo: "",
    isActive: true,
    buses: [],
  });

  const [currentBus, setCurrentBus] = useState({
    bus: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    arrivalTime: "",
    stops: "",
  });

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBusChange = (e) => {
    const { name, value } = e.target;
    setCurrentBus({ ...currentBus, [name]: value });
  };

  const addBus = () => {
    if (
      currentBus.bus &&
      currentBus.departureLocation &&
      currentBus.departureTime &&
      currentBus.arrivalLocation &&
      currentBus.arrivalTime
    ) {
      setFormData({
        ...formData,
        buses: [...formData.buses, { ...currentBus, stops: currentBus.stops.split(",") }],
      });
      setCurrentBus({
        bus: "",
        departureLocation: "",
        departureTime: "",
        arrivalLocation: "",
        arrivalTime: "",
        stops: "",
      });
      toast.success("Bus added to timetable!");
    } else {
      toast.error("Please fill in all bus details before adding!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://busekeapi.onrender.com/api/timetables", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Timetable created successfully!");
    } catch (error) {
      console.error("Error creating timetable:", error);
      const errorMessage = error.response?.data?.error || "Failed to create timetable. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Timetable</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Route ID</label>
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
              placeholder="Enter route ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Creator ID</label>
            <input
              type="text"
              name="creater"
              value={formData.creater}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
              placeholder="Enter creator ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valid From</label>
            <input
              type="date"
              name="validFrom"
              value={formData.validFrom}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valid To</label>
            <input
              type="date"
              name="validTo"
              value={formData.validTo}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
            />
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Add Bus Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bus ID</label>
              <input
                type="text"
                name="bus"
                value={currentBus.bus}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                placeholder="Enter bus ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Departure Location</label>
              <input
                type="text"
                name="departureLocation"
                value={currentBus.departureLocation}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                placeholder="Enter departure location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={currentBus.departureTime}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Arrival Location</label>
              <input
                type="text"
                name="arrivalLocation"
                value={currentBus.arrivalLocation}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                placeholder="Enter arrival location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
              <input
                type="time"
                name="arrivalTime"
                value={currentBus.arrivalTime}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stops (Comma-separated)</label>
              <input
                type="text"
                name="stops"
                value={currentBus.stops}
                onChange={handleBusChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
                placeholder="Enter stops"
              />
            </div>
            <button
              type="button"
              onClick={addBus}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
            >
              Add Bus
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Timetable
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateTimetable;
