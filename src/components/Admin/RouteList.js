import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoute, setEditingRoute] = useState(null);
  const [editFormData, setEditFormData] = useState({
    routeNumber: "",
    startLocation: "",
    endLocation: "",
    stops: ""
  });
  const [searchParams, setSearchParams] = useState({
    routeNumber: "",
    startLocation: "",
    endLocation: "",
    stops: ""
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    fetchRoutes();
  }, [token, searchParams]);

  const fetchRoutes = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      ).toString();

      const response = await axios.get(
        `http://localhost:5000/api/routes${queryParams ? `?${queryParams}` : ''}`
      );
      setRoutes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching routes:", error.response?.data?.message || "Failed to fetch routes");
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

  const handleEdit = (route) => {
    setEditingRoute(route);
    setEditFormData({
      routeNumber: route.routeNumber,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      stops: route.stops?.join(", ") || ""
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateRoute = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        ...editFormData,
        stops: editFormData.stops.split(",").map(stop => stop.trim())
      };
      const response = await axios.put(
        `http://localhost:5000/api/routes/${editingRoute._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRoutes(routes.map(route => 
        route._id === editingRoute._id ? response.data.route : route
      ));

      setEditingRoute(null);
      setEditFormData({
        routeNumber: "",
        startLocation: "",
        endLocation: "",
        stops: ""
      });

      alert("Route updated successfully!");
    } catch (error) {
      console.error("Error updating route:", error.response?.data?.message || "Failed to update route");
      alert(error.response?.data?.message || "Failed to update route");
    }
  };

  const handleCancelEdit = () => {
    setEditingRoute(null);
    setEditFormData({
      routeNumber: "",
      startLocation: "",
      endLocation: "",
      stops: ""
    });
  };

  const handleDelete = async (routeId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this route?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/routes/${routeId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      setRoutes(routes.filter((route) => route._id !== routeId));
      alert("Route deleted successfully!");
    } catch (error) {
      console.error("Error deleting route:", error);
      alert("Failed to delete route.");
    }
  };

  if (!token) return <p>Please log in to view routes.</p>;
  if (loading) return <p>Loading routes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Route List</h1>

      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="routeNumber"
          placeholder="Search by route number"
          value={searchParams.routeNumber}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="startLocation"
          placeholder="Search by start location"
          value={searchParams.startLocation}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="endLocation"
          placeholder="Search by end location"
          value={searchParams.endLocation}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="stops"
          placeholder="Search by stops"
          value={searchParams.stops}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Edit Form */}
      {editingRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Route</h2>
            <form onSubmit={handleUpdateRoute} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Route Number</label>
                <input
                  type="text"
                  name="routeNumber"
                  value={editFormData.routeNumber}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Location</label>
                <input
                  type="text"
                  name="startLocation"
                  value={editFormData.startLocation}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Location</label>
                <input
                  type="text"
                  name="endLocation"
                  value={editFormData.endLocation}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stops</label>
                <input
                  type="text"
                  name="stops"
                  value={editFormData.stops}
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

      {/* Route List */}
      <div className="space-y-4">
        {routes.map((route) => (
          <div
            key={route._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-800">Route Number: {route.routeNumber}</h2>
              <p className="text-sm text-gray-600">Start: {route.startLocation}</p>
              <p className="text-sm text-gray-600">End: {route.endLocation}</p>
              <p className="text-sm text-gray-600">Stops: {route.stops.join(", ")}</p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEdit(route)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(route._id)}
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

export default RouteList;
