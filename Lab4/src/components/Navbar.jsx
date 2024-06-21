import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Navbar.css';
import walterlogo from '../../src/assets/images/walterlogo.png';
import greenwalter from '../../src/assets/images/greenwalter.png';
import supabase from '../supabase';

export const Navbar = () => {
  async function handleLogout() {
    // let { error } = await supabase.auth.signOut();
    alert('Logged out!');
    navigate('/');
  }

  return (
    <div className="top">
      <div className="logo">
        <img src={walterlogo} alt="Walter Logo" />
      </div>
      <div className="navbar">
        <ul>
          <li className="home-n">
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/desired-property">Desired Property</Link>
          </li>
          <li>
            <Link to="/current-listings">Current Listings</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="profile-picture">
        <img src={greenwalter} alt="Green Walter Profile" />
        <Link to="/account-details">Account</Link>
      </div>
    </div>
  );
};
