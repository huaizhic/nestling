import React from 'react';
import { Link } from 'react-router-dom';
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./ListingInfo.css";

function ListingInfo(){
    return (
        <div className="listing-info">
            <div className="topcontainer">
                <div className="logo"><img src={walterlogo} alt="Walter Logo" /></div>
                <div className="navbar">
                <ul>
                    <li>
                    <Link to="/" className="home">Home</Link>
                    </li>
                    <li>
                    <Link to="/desired-property" className="desired-property">Desired Property</Link>
                    </li>
                    <li>
                    <Link to="/current-listings" className="current-listings">Current Listings</Link>
                    </li>
                    <li>
                    <Link to="/favourites" className="favourites">Favourites</Link>
                    </li>
                    <li>
                    <Link to="/" className="logout">Logout</Link>
                    </li>
                </ul>
                </div>
                <div className="profile-picture">
                <img src={greenwalter} alt="Green Walter Profile" />
                <Link to="/account-details">Account</Link>
                </div>
            </div>
        </div>
    );
}

export default ListingInfo;