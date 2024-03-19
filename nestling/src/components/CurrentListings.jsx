import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CurrentListings.css';
import walterlogo from '../../src/assets/images/walterlogo.png'; 
import greenwalter from '../../src/assets/images/greenwalter.png';

function CurrentListings(){
    return(
        <div className="current-listings">
            <div className="topcontainer">
                <div className="logo">
                    <img src={walterlogo} alt="Walter Logo" /></div>
                <div className="navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
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
                    </ul>
                </div>
                <div className="profile-picture">
                    <img src={greenwalter} alt="Green Walter Profile" />
                    <Link to="/account-details">Account</Link>
                </div>
            </div>
            <div className="search-column">
                <div className="search-container">
                    <label htmlFor="dropdown1">Dropdown 1:</label>
                    <select id="dropdown1">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    </select>
                    <label htmlFor="dropdown2">Dropdown 2:</label>
                    <select id="dropdown2">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    </select>
                    {/* Add labels and dropdowns for the remaining dropdowns */}
                    <button>Search</button>
                </div>
            </div>
        </div>
  );
}

export default CurrentListings;