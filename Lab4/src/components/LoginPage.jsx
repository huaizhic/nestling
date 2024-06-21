import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import walter from '../assets/images/walter.png';
// import supabase
import supabase from '../supabase';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongLogin, setWrongLogin] = useState(false);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     console.log(user);
  //     if (user.role === 'authenticated') {
  //       navigate('/home');
  //     }
  //   };
  //   checkLogin();
  // }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }; //this function is called whenever there is a change in the username input field. It updates the username state variable with the new value entered by the user

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }; //this function is called whenever there is a change in the password input field. It updates the password state variable with the new value entered by the user

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('test');

    // console.log('Login successful:', user);
    alert('login success');
    // Handle successful login (e.g., redirect to dashboard)
    setWrongLogin(false);
    navigate('/home');

    // Original code
    // try {
    //   let { user, error } = await supabase.auth.signInWithPassword({
    //     email: username,
    //     password: password,
    //   });
    //   if (error) {
    //     // setError("Incorrect username or password");
    //     // alert("login fail");
    //     setWrongLogin(true);
    //     console.error('Login failed:', error.message);
    //   } else {
    //     console.log('Login successful:', user);
    //     alert('login success');
    //     // Handle successful login (e.g., redirect to dashboard)
    //     setWrongLogin(false);
    //     navigate('/home');
    //   }
    // } catch (error) {
    //   // setError("An error occurred while logging in");
    //   // console.error("Login failed:", error.message);
    //   alert('login catch error');
    //   console.log(error);
    // }
  };

  return (
    <div className="login-page">
      <div>
        <div>
          <img src={walter} alt="Walter" />
        </div>
        <h1>nestling.ai</h1>
        <h2>Welcome back!</h2>
        <p>
          For demo purposes, clicking the login button will work irregardless of
          credentials provided.
        </p>
        {wrongLogin ? (
          <h3 style={{ color: 'red' }}>Wrong email/password</h3>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
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
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <Link to="/email-login">Forgot Password?</Link>
          <button type="submit">Fly</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
