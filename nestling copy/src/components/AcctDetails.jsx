import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AcctDetails.css';
import walterlogo from '../../src/assets/images/walterlogo.png'; 
import greenwalter from '../../src/assets/images/greenwalter.png';

function AcctDetails() {
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Fetch account information from the database and set the state variables
    // Example fetch code (replace with actual fetch logic):
    // fetch('api/account')
    //   .then(response => response.json())
    //   .then(data => {
    //     setUsername(data.username);
    //     setEmail(data.email);
    //     setPassword(data.password);
    //   })
    //   .catch(error => console.error('Error fetching account info:', error));
  }, []);

  return (
    <div className="acct-page">
      <div className="logo">
        <img src={walterlogo} alt="Walter Logo" />
      </div>
      <div className="profile-picture">
        <img src={greenwalter} alt="Green Walter Profile" />
      </div>
      <div className="account-details">
        <h2>Account Details</h2>
        <div className="input-wrapper">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to="/change-password">Change Password</Link>
        <Link to="/change-profile-picture">Change Profile Picture</Link>
      </div>
    </div>
  );
}

export default AcctDetails;