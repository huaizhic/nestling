import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUp from "./components/SignUp.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Homepage from "./components/Homepage.jsx";
import AcctDetails from "./components/AcctDetails.jsx";
import CurrentListings from "./components/CurrentListings.jsx";
import EmailLogin from "./components/emailLogin.jsx";
import DesiredHouseForm from "./components/desiredHouseForm.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/email-login" element={<EmailLogin />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/account-details" element={<AcctDetails />} />
      <Route path="/current-listings" element={<CurrentListings />} />
      <Route path="/desired-house" element={<DesiredHouseForm />} />
    </Routes>
  );
}

export default App;
