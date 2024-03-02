import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import walter from '../../src/assets/images/walter.png'; 

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., validate inputs, submit data to server)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-page">
      <div>
        <div><img src={walter} alt="Walter" /></div>
        <h1>nestling.ai</h1>
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Fly</button>
          <Link to="/reset-password">Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;