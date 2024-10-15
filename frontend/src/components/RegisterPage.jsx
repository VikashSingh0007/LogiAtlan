import React, { useState } from 'react';
import RegisterUserPage from './RegisterUserPage';
import RegisterDriverPage from './RegisterDriverPage';

const RegisterPage = () => {
  const [role, setRole] = useState('user');  // Set default role to "user"

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label htmlFor="role">Register as:</label>
        <select 
          id="role" 
          onChange={(e) => setRole(e.target.value)} 
          value={role}
        >
          <option value="user">User</option>
          <option value="driver">Driver</option>
        </select>
      </form>

      {role === 'user' ? <RegisterUserPage /> : <RegisterDriverPage />}
    </div>
  );
};

export default RegisterPage;