import React, { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignUp from './components/SignUp.jsx';
import ResetPassword from './components/ResetPassword.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element = {<LandingPage />} />
      <Route path="/login" element = {<LoginPage />} />
      <Route path="/sign-up" element = {<SignUp />} />
      <Route path="/reset-password" element = {<ResetPassword />} />
    </Routes>
  );
}

export default App;