import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get vehicleType from URL and for navigation
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const CreateBookingPage = () => {
  const { user } = useContext(AuthContext);
  const { vehicleType } = useParams(); // Get vehicleType from the URL
  const navigate = useNavigate(); // For redirecting after success

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const token = localStorage.getItem('authToken');  // Retrieve the token stored during login
  
      if (!token) {
        setError('No token found, please login again');
        return;
      }
  
      const res = await axios.post(
        'http://localhost:5000/api/bookings/',
        {
          userId: user._id,
          pickupLocation: pickup,
          dropOffLocation: dropoff,
          vehicleType: vehicleType, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
          },
        }
      );
  
      setSuccess('Booking created successfully!');
      setTimeout(() => {
        navigate('/');  // Redirect to home page after success
      }, 2000);
    } catch (err) {
      console.error('Booking creation error:', err);
      setError('Failed to create booking. Please try again.');
    }
  };
  

  return (
    <div>
      <h2>Create a Booking for {vehicleType.replace(/([A-Z])/g, ' $1').trim()}</h2>
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
        
        {/* Vehicle type is shown but disabled as it comes from the URL */}
        <input
          type="text"
          value={vehicleType.replace(/([A-Z])/g, ' $1').trim()}
          disabled
        />

        <button type="submit">Create Booking</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateBookingPage;
