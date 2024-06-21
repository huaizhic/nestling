import React, { useState } from 'react';
import './ResetPassword.css';
import walter from '../assets/images/walter.png';
import supabase from '../supabase';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
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

    alert('Password change successful!');
    navigate('/home');
  };

  return (
    <div className="reset-password">
      <div>
        <img src={walter} alt="Walter" />
      </div>
      <h2>Reset Password</h2>
      <p>
        For demo purposes, clicking the button will work irregardless of
        credentials provided.
      </p>
      {/* {passwordsMatch ? null : (
        <h3 style={{ color: "red" }}>Passwords don't match, try again!</h3>
      )} */}
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
        {!passwordsMatch && (
          <p className="error-msg">
            Passwords do not match. Please renter password.
          </p>
        )}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
