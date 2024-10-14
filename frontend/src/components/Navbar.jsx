// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white font-bold">Logistics Platform</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li>
            <Link to="/signup" className="text-white">Signup</Link>
          </li>
          <li>
            <Link to="/login" className="text-white">Login</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
