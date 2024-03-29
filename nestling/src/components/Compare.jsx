import React from "react";
import { Link } from "react-router-dom";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./Compare.css";
import emptyimage from "../assets/images/emptyimage.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { percentageMatchLogic } from "./percentageMatchLogic";

function Compare(){
    return(
        <div className="listing-details">
            <div className="topcontainer">
                <div className="logo">
                <img src={walterlogo} alt="Walter Logo" />
                </div>
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
                        <li>
                            <Link to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
                <div className="profile-picture">
                <img src={greenwalter} alt="Green Walter Profile" />
                <Link to="/account-details">Account</Link>
                </div>
            </div>
            <div className="overall-container">
                < div className="desired-prop-col">
                    <div className="desired-prop-container">
                        hello
                    </div>
                </div>
                < div className="listing-col">
                    <div className="listing-info-container">
                        hello
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Compare;