import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const BookingHistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get('http://localhost:5000/api/bookings/history', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, [user]);

  return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>{booking.pickupLocation} to {booking.dropOffLocation} ({booking.status})</li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistoryPage;
