import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [viewingBooking, setViewingBooking] = useState(null);
  const [editFormData, setEditFormData] = useState({
    busNumber: "",
    passengerIDNo: "",
    bookingIdentificationCode: "",
    date: "",
    isPaid: false,
    isUsed: false
  });
  const [searchParams, setSearchParams] = useState({
    busNumber: "",
    passengerIDNo: "",
    bookingIdentificationCode: "",
    date: ""
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    fetchBookings();
  }, [searchParams]);

  const fetchBookings = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(searchParams).filter(([_, value]) => value.trim() !== '')
      ).toString();

      const response = await axios.get(
        `https://busekeapi.onrender.com/api/bookings${queryParams ? `?${queryParams}` : ''}`, {
            headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error.response?.data?.message || "Failed to fetch bookings");
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

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setEditFormData({
      busNumber: booking.busNumber,
      passengerIDNo: booking.passengerIDNo,
      bookingIdentificationCode: booking.bookingIdentificationCode,
      date: booking.date.split('T')[0],
      isPaid: booking.isPaid,
      isUsed: booking.isUsed
    });
  };

  const handleView = (booking) => {
    setViewingBooking(booking);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://busekeapi.onrender.com/api/bookings/${editingBooking._id}`,
        editFormData, {
            headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(bookings.map(booking => 
        booking._id === editingBooking._id ? response.data.updatedBooking : booking
      ));

      setEditingBooking(null);
      setEditFormData({
        busNumber: "",
        passengerIDNo: "",
        bookingIdentificationCode: "",
        date: "",
        isPaid: false,
        isUsed: false
      });

      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error.response?.data?.message || "Failed to update booking");
      alert(error.response?.data?.message || "Failed to update booking");
    }
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setEditFormData({
      busNumber: "",
      passengerIDNo: "",
      bookingIdentificationCode: "",
      date: "",
      isPaid: false,
      isUsed: false
    });
  };

  const handleCloseView = () => {
    setViewingBooking(null);
  };

  const handleDelete = async (bookingId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
      if (!confirmDelete) return;

      await axios.delete(`https://busekeapi.onrender.com/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking.");
    }
  };

  if (!token) return <p>Please log in to view bookings.</p>;
  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Booking List</h1>

      {/* Search Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          name="passengerIDNo"
          placeholder="Search by passenger ID"
          value={searchParams.passengerIDNo}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          name="bookingIdentificationCode"
          placeholder="Search by booking code"
          value={searchParams.bookingIdentificationCode}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
        />
      </div>

      {/* View Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Booking Code:</span> {viewingBooking.bookingIdentificationCode}</p>
              <p><span className="font-medium">Bus Number:</span> {viewingBooking.busNumber}</p>
              <p><span className="font-medium">Passenger ID:</span> {viewingBooking.passengerIDNo}</p>
              <p><span className="font-medium">Date:</span> {new Date(viewingBooking.date).toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {viewingBooking.time}</p>
              <p><span className="font-medium">Seat Count:</span> {viewingBooking.seatCount}</p>
              <p><span className="font-medium">Payment Status:</span> {viewingBooking.isPaid ? 'Paid' : 'Unpaid'}</p>
              <p><span className="font-medium">Usage Status:</span> {viewingBooking.isUsed ? 'Used' : 'Not Used'}</p>
              
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseView}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <form onSubmit={handleUpdateBooking} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700">Passenger ID</label>
                <input
                  type="text"
                  name="passengerIDNo"
                  value={editFormData.passengerIDNo}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Booking Code</label>
                <input
                  type="text"
                  name="bookingIdentificationCode"
                  value={editFormData.bookingIdentificationCode}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditFormChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={editFormData.isPaid}
                  onChange={handleEditFormChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="text-sm font-medium text-gray-700">Is Paid</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isUsed"
                  checked={editFormData.isUsed}
                  onChange={handleEditFormChange}
                  className="h-4 w-4 text-blue-600"
                />
                <label className="text-sm font-medium text-gray-700">Is Used</label>
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

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Booking Code: {booking.bookingIdentificationCode}</h2>
                <p className="text-sm text-gray-600">Bus Number: {booking.busNumber}</p>
                <p className="text-sm text-gray-600">Passenger ID: {booking.passengerIDNo}</p>
                <p className="text-sm text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleView(booking)}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(booking)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(booking._id)}
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

export default BookingList;