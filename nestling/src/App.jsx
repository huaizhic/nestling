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
import Home from "./components/Home.jsx";
import Article from "./components/Article.jsx";
import DesiredProperty from "./components/DesiredProperty.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="npm/reset-password" element={<ResetPassword />} />
      <Route path="/email-login" element={<EmailLogin />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/current-listings" element={<CurrentListings />} />
      <Route path="/desired-house" element={<DesiredHouseForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/article" element={<Article />} />
      <Route path="/desired-property" element={<DesiredProperty />} />
    </Routes>
  );
}

export default App;
