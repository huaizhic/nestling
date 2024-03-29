import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUp from "./components/SignUp.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import Homepage from "./components/Homepage.jsx";
import AcctDetails from "./components/AcctDetails.jsx";
import CurrentListings from "./components/CurrentListings.jsx";
import EmailLogin from "./components/EmailLogin.jsx";
import Home from "./components/Home.jsx";
import Article from "./components/Article.jsx";
import DesiredProperty from "./components/DesiredProperty.jsx";
import Account from "./components/AcctDetails.jsx";
import ListingInfo from "./components/ListingInfo.jsx";
import Favourites from "./components/Favourites.jsx";
import ListingDetails from "./components/ListingDetails.jsx";
import Compare from "./components/Compare.jsx";


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
      <Route path="/home" element={<Home />} />
      <Route path="/article" element={<Article />} />
      <Route path="/account-details" element={<Account />} />
      <Route path="/desired-property" element={<DesiredProperty />} />
      <Route path="/listing-info" element={<ListingInfo />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/listing-info/:id" element={<ListingInfo />} />
      <Route path="/listing-details/:id" element={<ListingDetails />} />
      <Route path="/compare/:id" element={<Compare />} />
    </Routes>
  );
}

export default App;
