import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    role: ""
  });
  const [searchParams, setSearchParams] = useState({
    username: "",
    role: "",
    email: ""
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    fetchUsers();
  }, [token, searchParams]);

  const fetchUsers = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      ).toString();

      const response = await axios.get(
        `http://localhost:5000/api/users${queryParams ? `?${queryParams}` : ''}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data?.message || "Failed to fetch users");
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

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      username: user.username,
      email: user.email,
      role: user.role
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${editingUser._id}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUsers(users.map(user => 
        user._id === editingUser._id ? response.data.user : user
      ));

      setEditingUser(null);
      setEditFormData({
        username: "",
        email: "",
        role: ""
      });

      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error.response?.data?.message || "Failed to update user");
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({
      username: "",
      email: "",
      role: ""
    });
  };

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  if (!token) return <p>Please log in to view users.</p>;
  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">User List</h1>

      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Search by username"
          value={searchParams.username}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="email"
          placeholder="Search by email"
          value={searchParams.email}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <select
          name="role"
          value={searchParams.role}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="operator">Operator</option>
        </select>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="operator">Operator</option>
                  <option value="admin">Admin</option>
                </select>
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

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || "/api/placeholder/64/64"}
                alt={user.username}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-800">{user.username}</h2>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEdit(user)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
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

export default UserList;