import { createContext, useState, useEffect } from 'react';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        setName(parsedUser.name);
        setEmail(parsedUser.email);  // Parse and set the user if found
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
        const { user, token } = await res.json();  // Assume the response sends back user object and token
        const userData = { name: user.name, email: user.email, token };  // Prepare user data
        setUser(userData);
        setName(user.name);
        setEmail(user.email);
        localStorage.setItem('user', JSON.stringify(userData));  // Store user data in localStorage
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
        const { user, token } = await res.json();  // Assume the response sends back user object and token
        const userData = { name: user.name, email: user.email, token };  // Prepare user data
        setUser(userData);
        setName(user.name);
        setEmail(user.email);
        localStorage.setItem('user', JSON.stringify(userData));  // Store user data in localStorage
      } else {
        const errorText = await res.text();
        console.error('Login failed:', errorText);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  // Register a new driver
  const registerDriver = async (name, email, password, phone, vehicleType) => {
    try {
      const res = await fetch('http://localhost:5000/api/driver/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone, vehicleType }),
      });

      if (res.ok) {
        const { user, token } = await res.json();  // Assume the response sends back user object and token
        const userData = { name: user.name, email: user.email, token };  // Prepare user data
        setUser(userData);
        setName(user.name);
        setEmail(user.email);
        localStorage.setItem('user', JSON.stringify(userData));  // Store user data in localStorage
      } else {
        const errorText = await res.text();
        console.error('Driver registration failed:', errorText);
      }
    } catch (err) {
      console.error('Error during driver registration:', err);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);  // Remove user from state
    setName(null);
    setEmail(null);
    localStorage.removeItem('user');  // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, name, email, registerUser, loginUser, logout, registerDriver }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;