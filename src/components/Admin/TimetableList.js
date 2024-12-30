import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimetableList = () => {
  const [timetables, setTimetables] = useState([]);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    route: "",
    creater: "",
    validFrom: "",
    validTo: "",
    isActive: true,
    buses: []
  });

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://busekeapi.onrender.com/api/timetables");
      setTimetables(response.data);
    } catch (error) {
      toast.error("Failed to fetch timetables");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this timetable?")) {
      setLoading(true);
      try {
        await axios.delete(`https://busekeapi.onrender.com/api/timetables/${id}`);
        toast.success("Timetable deleted successfully");
        fetchTimetables();
        if (selectedTimetable?._id === id) {
          setSelectedTimetable(null);
        }
      } catch (error) {
        toast.error("Failed to delete timetable");
      }
      setLoading(false);
    }
  };

  const handleEdit = (timetable) => {
    setEditFormData({
      route: timetable.route._id,
      creater: timetable.creater._id,
      validFrom: timetable.validFrom.split('T')[0],
      validTo: timetable.validTo.split('T')[0],
      isActive: timetable.isActive,
      buses: timetable.details.map(detail => ({
        bus: detail.bus._id,
        departureLocation: detail.departureLocation,
        departureTime: detail.departureTime,
        arrivalLocation: detail.arrivalLocation,
        arrivalTime: detail.arrivalTime,
        stops: detail.stops
      }))
    });
    setSelectedTimetable(timetable);
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log("editFormDAta", editFormData);
      await axios.put(`https://busekeapi.onrender.com/api/timetables/${selectedTimetable._id}`, editFormData);
      toast.success("Timetable updated successfully");
      setIsEditModalOpen(false);
      fetchTimetables();
    } catch (error) {
      toast.error("Failed to update timetable");
    }
    setLoading(false);
  };

  const handleView = (timetable) => {
    setSelectedTimetable(timetable);
  };

  const handleBusChange = (index, field, value) => {
    const newBuses = [...editFormData.buses];
    newBuses[index] = { ...newBuses[index], [field]: value };
    setEditFormData({ ...editFormData, buses: newBuses });
  };

  const addBus = () => {
    setEditFormData({
      ...editFormData,
      buses: [...editFormData.buses, {
        bus: "",
        departureLocation: "",
        departureTime: "",
        arrivalLocation: "",
        arrivalTime: "",
        stops: []
      }]
    });
  };

  const removeBus = (index) => {
    const newBuses = editFormData.buses.filter((_, i) => i !== index);
    setEditFormData({ ...editFormData, buses: newBuses });
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Timetable List</h2>
        
        {/* Timetables Table */}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Route</th>
              <th className="border border-gray-300 px-4 py-2">Creator</th>
              <th className="border border-gray-300 px-4 py-2">Valid From</th>
              <th className="border border-gray-300 px-4 py-2">Valid To</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map((timetable) => (
              <tr key={timetable._id}>
                <td className="border border-gray-300 px-4 py-2">{timetable.route.routeNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{timetable.creater.username}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(timetable.validFrom).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(timetable.validTo).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleView(timetable)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(timetable)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(timetable._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Selected Timetable Details */}
        {selectedTimetable && !isEditModalOpen && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800">Timetable Details</h3>
            <table className="min-w-full border-collapse border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Bus</th>
                  <th className="border border-gray-300 px-4 py-2">Departure</th>
                  <th className="border border-gray-300 px-4 py-2">Arrival</th>
                  <th className="border border-gray-300 px-4 py-2">Stops</th>
                </tr>
              </thead>
              <tbody>
                {selectedTimetable.details.map((detail) => (
                  <tr key={detail._id}>
                    <td className="border border-gray-300 px-4 py-2">{detail.bus.busNumber}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.departureLocation} ({detail.departureTime})
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {detail.arrivalLocation} ({detail.arrivalTime})
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{detail.stops.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Edit Timetable</h3>
              <form onSubmit={handleUpdateSubmit}>
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Valid From</label>
                      <input
                        type="date"
                        value={editFormData.validFrom}
                        onChange={(e) => setEditFormData({...editFormData, validFrom: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Valid To</label>
                      <input
                        type="date"
                        value={editFormData.validTo}
                        onChange={(e) => setEditFormData({...editFormData, validTo: e.target.value})}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Bus Details */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Bus Details</h4>
                      <button
                        type="button"
                        onClick={addBus}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Add Bus
                      </button>
                    </div>
                    {editFormData.buses.map((bus, index) => (
                      <div key={index} className="border p-4 mb-4 rounded">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
    <label className="block text-sm font-medium mb-1">Bus Id</label>
    <input
        type="text"
        value={bus.bus || ''}  
        onChange={(e) => handleBusChange(index, 'bus', e.target.value)}
        className="w-full border rounded px-3 py-2"
    />
</div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Departure Location</label>
                            <input
                              type="text"
                              value={bus.departureLocation}
                              onChange={(e) => handleBusChange(index, 'departureLocation', e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Departure Time</label>
                            <input
                              type="time"
                              value={bus.departureTime}
                              onChange={(e) => handleBusChange(index, 'departureTime', e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Arrival Location</label>
                            <input
                              type="text"
                              value={bus.arrivalLocation}
                              onChange={(e) => handleBusChange(index, 'arrivalLocation', e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Arrival Time</label>
                            <input
                              type="time"
                              value={bus.arrivalTime}
                              onChange={(e) => handleBusChange(index, 'arrivalTime', e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Stops (comma-separated)</label>
                          <input
                            type="text"
                            value={bus.stops.join(", ")}
                            onChange={(e) => handleBusChange(index, 'stops', e.target.value.split(",").map(s => s.trim()))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBus(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                        >
                          Remove Bus
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Timetable"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default TimetableList;