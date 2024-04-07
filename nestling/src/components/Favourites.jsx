import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Favourites.css';
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import './Navbar.css';
//import { Capsule } from "./Capsule";

export default function Favourites () {
    async function handleLogout() {
        let { error } = await supabase.auth.signOut();
        alert("Logged out!");
        navigate("/");
    }

    const navigate = useNavigate(); 

    function handleClick() {
        navigate('/saved-properties'); // Navigate to '/other-route' on button click
    }

    return(
        <div className = "favourites">
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
            <div>
                <div className="header">Favourites</div>
                <div className="the-rest">
                        <div className="bottom">
                            <div className="box-a">
                                <div className="img"></div>
                                <div className="a-header">Article Name</div>
                                <div className="address">Address</div>
                                <div className="price">Price</div>
                                <div className="pmatch">Percentage Match</div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                                <div className="a-header">Article Name</div>
                                <div className="address">Address</div>
                                <div className="price">Price</div>
                                <div className="pmatch">Percentage Match</div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                            <div className="img"></div>
                            </div>
                    </div>
                    <div className="bottom">
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                            <div className="box-a">
                                <div className="img"></div>
                            </div>
                    </div>
                </div>
            </div>
            <div>
                <button className="button-div" onClick ={handleClick}>compare</button>
            </div>
        </div>
    );
};