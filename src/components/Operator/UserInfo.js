import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonalDetails = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editFormData, setEditFormData] = useState({
    username: "",
    role: "",
    email: ""
  });

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://busekeapi.onrender.com/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setEditFormData({
        username: response.data.username,
        role: response.data.role,
        email: response.data.email
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({
      username: user.username,
      role: user.role,
      email: user.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://busekeapi.onrender.com/api/users/${userId}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data?.message);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user details</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal details</h2>
      <form onSubmit={handleSubmit} className="flex items-start space-x-8">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={isEditing ? editFormData.username : user.username}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm ${
                isEditing ? 'bg-white' : 'bg-gray-100'
              } py-2 px-4`}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={isEditing ? editFormData.role : user.role}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm ${
                isEditing ? 'bg-white' : 'bg-gray-100'
              } py-2 px-4`}
              disabled={true} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={isEditing ? editFormData.email : user.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#2b241a] focus:border-[#2b241a] sm:text-sm ${
                isEditing ? 'bg-white' : 'bg-gray-100'
              } py-2 px-4`}
              disabled={!isEditing}
            />
          </div>
          {/* <div className="flex-shrink-0 space-x-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEditClick}
                className="mt-4 px-8 py-2 text-sm bg-[#2b241a] text-white rounded-md hover:bg-[#3d3425]"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 text-sm bg-[#2b241a] text-white rounded-md hover:bg-[#3d3425]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="mt-4 px-8 py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            )}
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;