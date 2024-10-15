import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isDriver, setIsDriver] = useState(false);

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
        setName(parsedUser.name);
        setEmail(parsedUser.email);
        setIsDriver(parsedUser.isDriver || false); // Set if the logged-in entity is a driver
      } catch (e) {
        console.error("Failed to parse user JSON:", e);
        localStorage.removeItem('user');
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
        localStorage.setItem('authToken', token);  // Store the token separately in localStorage
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
        const { user, token } = await res.json();  // Ensure token is retrieved here
        const userData = { name: user.name, email: user.email, token };  // Prepare user data
        setUser(userData);
        setName(user.name);
        setEmail(user.email);
        localStorage.setItem('authToken', token);  // Store token in localStorage
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
        const { user, token } = await res.json();
        const userData = { name: user.name, email: user.email, token, isDriver: true }; // Set isDriver as true
        setUser(userData);
        setName(user.name);
        setEmail(user.email);
        setIsDriver(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', token);  // Store the token separately in localStorage
      } else {
        console.error('Driver registration failed:', await res.text());
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
    setIsDriver(false);
    localStorage.removeItem('user');  // Remove user from localStorage
    localStorage.removeItem('authToken');  // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, name, email, isDriver, registerUser, loginUser, logout, registerDriver }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
