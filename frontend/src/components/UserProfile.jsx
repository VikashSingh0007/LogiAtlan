// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null); // New state for handling errors

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');  // Fetch token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        // Capture and log any error
        console.error('Error fetching profile:', err.response ? err.response.data : err.message);
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}  {/* Show error message */}
      {profile ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">User Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>  // Only show "Loading..." if there's no error
      )}
    </div>
  );
};

export default UserProfile;
