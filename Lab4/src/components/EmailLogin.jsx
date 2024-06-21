import React, { useState } from 'react';
import './EmailLogin.css';
import walter from '../assets/images/walter.png';
import supabase from '../supabase';

function emailLogin() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (passwordsMatch === false && e.target.value === confirmNewPassword) {
      setPasswordsMatch(true);
    }
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    if (passwordsMatch === false && e.target.value === newPassword) {
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('(Demo) Email has been sent!');
  };

  return (
    <div className="reset-password">
      <div>
        <img src={walter} alt="walter" />
      </div>
      <h1>Nestling.ai</h1>
      <h2>Log In via Email</h2>
      <p>As this is a demo, this page will not work</p>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="newPassword">Enter email:</label>
          <input
            type="text"
            // id="newPassword"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Send log in link</button>
      </form>
    </div>
  );
}

export default emailLogin;
