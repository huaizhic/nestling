import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import walter from '../assets/images/walter.png'; 
//import supabase from '../Supabase';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };//this function is called whenever there is a change in the username input field. It updates the username state variable with the new value entered by the user

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };//this function is called whenever there is a change in the password input field. It updates the password state variable with the new value entered by the user

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signIn({
        email: username,
        password: password,
      });
      if (error) {
        setError('Incorrect username or password');
        console.error('Login failed:', error.message);
      } else {
        console.log('Login successful:', user);
        // Handle successful login (e.g., redirect to dashboard)
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Login failed:', error.message);
    }
  };//I just put this function here for now but I'm not sure how the checking will be implemented
  

  return (
    <div className="login-page">
      <div>
        <div><img src={walter} alt="Walter" /></div>
        <h1>nestling.ai</h1>
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Link to="/reset-password">Forgot Password?</Link>
          <button type="submit">Fly</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;