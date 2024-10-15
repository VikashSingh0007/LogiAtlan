// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in when the app starts
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));  // Parse and set the user if found
      } catch (e) {
        console.error("Failed to parse user JSON:", e);
        localStorage.removeItem('user');  // Remove invalid user from localStorage
      }
    }
  }, []);

  // Register a new user
  const registerUser = async (name, email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);  // Set the user after successful registration
        localStorage.setItem('user', JSON.stringify(data));  // Store user in localStorage
        console.log('User registered successfully:', data);
      } else {
        const errorText = await res.text();
        console.error('Registration failed:', errorText);
      }
    } catch (err) {
      console.error('Error during registration:', err);
    }
  };

  // Login existing user
  const loginUser = async (email, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);  // Set the user after successful login
        localStorage.setItem('user', JSON.stringify(data));  // Store user in localStorage
      } else {
        const errorText = await res.text();
        console.error('Login failed:', errorText);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);  // Remove user from state
    localStorage.removeItem('user');  // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
