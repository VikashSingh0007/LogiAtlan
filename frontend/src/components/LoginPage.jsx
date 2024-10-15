import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { loginUser, loginDriver } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'user') {
      await loginUser(email, password);
    } else {
      await loginDriver(email, password);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="user">User</option>
          <option value="driver">Driver</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
