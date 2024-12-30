import React, { useEffect, useState } from "react";
import axios from "axios";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBus, setEditingBus] = useState(null);
  const [editFormData, setEditFormData] = useState({
    busNumber: "",
    capacity: "",
    routeId: "",
    operatorId: "",
    ownershipType: ""
  });
  const [searchParams, setSearchParams] = useState({
    busNumber: "",
    capacity: "",
    routeId: "",
    operatorId: "",
    ownershipType: ""
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    fetchBuses();
  }, [searchParams]);

  const fetchBuses = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      ).toString();

      const response = await axios.get(
        `https://busekeapi.onrender.com/api/buses${queryParams ? `?${queryParams}` : ''}`
      );
      setBuses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching buses:", error.response?.data?.message || "Failed to fetch buses");
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (bus) => {
    setEditingBus(bus);
    setEditFormData({
      busNumber: bus.busNumber,
      capacity: bus.capacity,
      routeId: bus.routeId._id || bus.routeId,
      operatorId: bus.operatorId._id || bus.operatorId,
      ownershipType: bus.ownershipType
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateBus = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://busekeapi.onrender.com/api/buses/${editingBus._id}`,
        editFormData, {
            headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBuses(buses.map(bus => 
        bus._id === editingBus._id ? response.data.bus : bus
      ));

      setEditingBus(null);
      setEditFormData({
        busNumber: "",
        capacity: "",
        routeId: "",
        operatorId: "",
        ownershipType: ""
      });

      alert("Bus updated successfully!");
    } catch (error) {
      console.error("Error updating bus:", error.response?.data?.message || "Failed to update bus");
      alert(error.response?.data?.message || "Failed to update bus");
    }
  };

  const handleCancelEdit = () => {
    setEditingBus(null);
    setEditFormData({
      busNumber: "",
      capacity: "",
      routeId: "",
      operatorId: "",
      ownershipType: ""
    });
  };

  const handleDelete = async (busId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this bus?");
      if (!confirmDelete) return;

      await axios.delete(`https://busekeapi.onrender.com/api/buses/${busId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
      setBuses(buses.filter((bus) => bus._id !== busId));
      alert("Bus deleted successfully!");
    } catch (error) {
      console.error("Error deleting bus:", error);
      alert("Failed to delete bus.");
    }
  };

  if (!token) return <p>Please log in to view buses.</p>;
  if (loading) return <p>Loading buses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Bus List</h1>

      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="busNumber"
          placeholder="Search by bus number"
          value={searchParams.busNumber}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="capacity"
          placeholder="Search by capacity"
          value={searchParams.capacity}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="routeId"
          placeholder="Search by route ID"
          value={searchParams.routeId}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="operatorId"
          placeholder="Search by operator ID"
          value={searchParams.operatorId}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="ownershipType"
          placeholder="Search by ownership type"
          value={searchParams.ownershipType}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Edit Form */}
      {editingBus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Bus</h2>
            <form onSubmit={handleUpdateBus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                <input
                  type="text"
                  name="busNumber"
                  value={editFormData.busNumber}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  value={editFormData.capacity}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Route ID</label>
                <input
                  type="text"
                  name="routeId"
                  value={editFormData.routeId}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Operator ID</label>
                <input
                  type="text"
                  name="operatorId"
                  value={editFormData.operatorId}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ownership Type</label>
                <input
                  type="text"
                  name="ownershipType"
                  value={editFormData.ownershipType}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bus List */}
      <div className="space-y-4">
        {buses.map((bus) => (
          <div
            key={bus._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Bus Number: {bus.busNumber}</h2>
                <p className="text-sm text-gray-600">Capacity: {bus.capacity}</p>
                <p className="text-sm text-gray-600">Route: {bus.routeId?.routeNumber}</p>
                <p className="text-sm text-gray-600">Operator: {bus.operatorId?.username}</p>
                <p className="text-sm text-gray-600">Ownership: {bus.ownershipType}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEdit(bus)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bus._id)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
