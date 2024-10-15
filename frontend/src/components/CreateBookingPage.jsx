import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const CreateBookingPage = () => {
  const { user } = useContext(AuthContext);
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [vehicle, setVehicle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/bookings', {
      userId: user._id,
      pickupLocation: pickup,
      dropOffLocation: dropoff,
      vehicleType: vehicle,
    });
  };

  return (
    <div>
      <h2>Create a Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dropoff Location"
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Vehicle Type"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
          required
        />
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
};

export default CreateBookingPage;
