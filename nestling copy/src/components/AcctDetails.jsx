import React, { useState, useEffect } from 'react';
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
    <div className="acct-details">
      <div className="logo"><img src={walterlogo} alt="Walter Logo" /></div>
      <div className="user-info">
        <div className="profile-pic"><img src={greenwalter} alt="Green Walter Profile" /></div>
        <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className="links-wrapper">
        <div className="link-wrapper-1"> 
            <Link to="/change-password">Change Password</Link>
        </div>
        </div>
      </div>
      <div className="button"><button>Fly</button></div>
    </div>
  );
}

export default AcctDetails;