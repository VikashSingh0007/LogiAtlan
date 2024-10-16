import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import './Fireworks.css'; // Fireworks animation styles

const CreateBookingPage = () => {
  const { user } = useContext(AuthContext);
  const { vehicleType } = useParams(); 
  const navigate = useNavigate();

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('authToken');

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
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      setSuccess(true); // Set success to true to show fireworks
      
      // Show fireworks for 3 seconds, then redirect
      setTimeout(() => {
        navigate('/'); // Redirect to home page after success
      }, 3000);
    } catch (err) {
      console.error('Booking creation error:', err);
      setError('Failed to create booking. Please try again.');
    }
  };

  // Generate random fireworks at different positions
  const generateFireworks = () => {
    const fireworkElements = [];

    for (let i = 0; i < 10; i++) {
      const randomX = Math.random() * 100; // Random X position
      const randomY = Math.random() * 100; // Random Y position
      const colors = ['red', 'blue', 'green']; // Random colors
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      fireworkElements.push(
        <div
          key={i}
          className={`firework ${randomColor}`}
          style={{
            left: `${randomX}vw`,
            top: `${randomY}vh`,
          }}
        ></div>
      );
    }

    return fireworkElements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 relative">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create a Booking for{' '}
          <span className="text-indigo-600">
            {vehicleType.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </h2>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Pickup Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                required
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dropoff Location
              </label>
              <input
                type="text"
                placeholder="Dropoff Location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                required
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <input
                type="text"
                value={vehicleType.replace(/([A-Z])/g, ' $1').trim()}
                disabled
                className="mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg w-full focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Create Booking
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">Booking created successfully! 🎉</h3>
            <p className="text-gray-700 mt-2">Redirecting to the homepage...</p>

            {/* Fullscreen Fireworks */}
            <div className="fireworks-wrapper">
              {generateFireworks()}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreateBookingPage;
