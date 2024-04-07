import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import './SavedProperties.css';
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";

//import { Capsule } from "./Capsule";

export default function SavedProperties () {
    async function handleLogout() {
        let { error } = await supabase.auth.signOut();
        alert("Logged out!");
        navigate("/");
    }

    return(
        <div className="saved-properties">
            <div className="top">
                <div className="logo">
                    <img src={walterlogo} alt="Walter Logo" />
                </div>
                <div className="navbar">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/desired-property">Desired Property</Link></li>
                        <li><Link to="/current-listings">Current Listings</Link></li>
                        <li><Link to="/favourites">Favourites</Link></li>
                        <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>
                <div className="profile-picture">
                    <img src={greenwalter} alt="Green Walter Profile" />
                    <Link to="/account-details">Account</Link>
                </div>
            </div>
            <div className="bottom">
                <div className="property">
                    <div className="header">Property Name</div>
                    <div className="box">
                        <div>Location</div>
                        <div>Amenity 1</div>
                        <div>Amenity 2</div>
                        <div>Amenity 3</div>
                        <div>Distance Radius</div>
                        <div>Room Count</div>
                        <div>GFA</div>
                    </div>
                </div>
                <div className="box"></div>
            </div>
        </div>
    );
};