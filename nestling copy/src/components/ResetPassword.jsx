import React, { useState } from 'react';
import './ResetPassword.css';
import walter from '../assets/images/walter.png'; 

function ResetPassword() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      return;
    }
    // Add logic to handle form submission (e.g., validate inputs, submit data to server)
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
  };

  return (
    <div className="reset-password">
        <div><img src={walter} alt="Walter" /></div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="newPassword">Enter new password:</label>
          <input
            type="text"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmNewPassword">Confirm new password:</label>
          <input
            type="text"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />      
        </div>
        {!passwordsMatch && <p className="error-msg">Passwords do not match. Please renter password.</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;