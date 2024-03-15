import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CurrentListings.css';
import walterlogo from '../../src/assets/images/walterlogo.png'; 
import greenwalter from '../../src/assets/images/greenwalter.png';

function CurrentListings(){
    return(
        <div className="current-listings">
            <div className="topcontainer">
                <div className="logo"><img src={walterlogo} alt="Walter Logo" /></div>
                <div className="profile-picture"><img src={greenwalter} alt="Green Walter Profile" /></div>
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
            </div>
        </div>
  );
}

export default CurrentListings;