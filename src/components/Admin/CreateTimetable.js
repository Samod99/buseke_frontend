import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";
import RequestResponseDisplay from "../RequestResponseDisplay"; 

const CreateTimetable = () => {
  const [formData, setFormData] = useState({
    route: "",
    creater: "",
    validFrom: "",
    validTo: "",
    isActive: true,
  });

  const [currentBus, setCurrentBus] = useState({
    bus: "",
    departureLocation: "",
    departureTime: "",
    arrivalLocation: "",
    arrivalTime: "",
    stops: "",
  });

  const [reqObject, setReqObject] = useState(null); 
  const [resObject, setResObject] = useState(null); 
  const [addedBuses, setAddedBuses] = useState([]);
  const token = localStorage.getItem("token");

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
      setAddedBuses([...addedBuses, { ...currentBus, stops: currentBus.stops.split(",") }]);
      setCurrentBus({
        bus: "",
        departureLocation: "",
        departureTime: "",
        arrivalLocation: "",
        arrivalTime: "",
        stops: "",
      });
      toast.success("Bus added to table!");
    } else {
      toast.error("Please fill in all bus details before adding!");
    }
  };

  const removeBus = (index) => {
    const updatedBuses = addedBuses.filter((_, i) => i !== index);
    setAddedBuses(updatedBuses);
    toast.success("Bus removed from table!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (addedBuses.length === 0) {
      toast.error("Please add at least one bus before creating timetable!");
      return;
    }

    try {
      const timetableData = {
        ...formData,
        buses: addedBuses
      };

      const requestPayload = {
        url: "https://busekeapi.onrender.com/api/routes",
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: timetableData
      };
      setReqObject(requestPayload);

      const response = await axios.post(
        "https://busekeapi.onrender.com/api/timetables",
        timetableData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setResObject({
        status: response.status,
        data: response.data,
      });
      
      // Clear the form after successful submission
      setFormData({
        route: "",
        creater: "",
        validFrom: "",
        validTo: "",
        isActive: true,
      });
      setAddedBuses([]);
      
      toast.success("Timetable created successfully!");
    } catch (error) {
      console.error("Error creating timetable:", error);
      const errorMessage = error.response?.data?.error || "Failed to create timetable. Please try again.";
      setResObject({
        status: error.response?.status || 500,
        data: errorMessage,
      });
      toast.error(errorMessage);
    }
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Timetable</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Route ID</label>
              <input
                type="text"
                name="route"
                value={formData.route}
                onChange={handleChange}
                //required
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
                //required
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
                //required
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
                //required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Add Bus Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
            <button
              type="button"
              onClick={addBus}
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
            >
              Add Bus to Table
            </button>
          </div>

          {addedBuses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Added Buses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {addedBuses.map((bus, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bus.bus}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bus.departureLocation} at {bus.departureTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {bus.arrivalLocation} at {bus.arrivalTime}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {bus.stops.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => removeBus(index)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Timetable
          </button>
        </form>
        <ToastContainer />
      </div>
      <RequestResponseDisplay req={reqObject} res={resObject} />
    </div>
  );
};

export default CreateTimetable;
