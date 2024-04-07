import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Test.css";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import supabase from "../supabase";

export default function Test() {
  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  return (
    <div className="home">
      <div className="logo">
        <img src={walterlogo} alt="Walter Logo" />
      </div>
      <div className="navbar">
        <ul>
          <li>
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
          {/* <button className="" onClick={() => handleLogout()} Log Out></button> */}
          <li className="profile-picture">
            <img src={greenwalter} alt="Green Walter Profile" />
            <Link to="/account-details">Account</Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="box">
          <div className="articles-container">
            <div className="header">
              <h2 className="header-text">What's Chirping!</h2>
            </div>
            <div className="article-reg">
              <div className="article-content">
                <div>
                  <Link
                    to="https://blog.bluenest.sg/buying-private-property-procedure/"
                    className="article-header"
                  >
                    is the price truly right?
                  </Link>
                </div>
                <div>
                  <p className="article-content">
                    read testimonials from previous clients on how they could
                    find their dream home with just a simple search! and that
                    too, for a reasonable price. read testimonials from previous
                    clients on how they could find their dream home with just a
                    simple search!
                  </p>
                </div>
              </div>
            </div>

            <div className="article-reg">
              <div className="article-content">
                <div>
                  <Link to="/article" className="article-header">
                    is the price truly right?
                  </Link>
                </div>
                <div>
                  <p className="article-content">
                    read testimonials from previous clients on how they could
                    find their dream home with just a simple search! and that
                    too, for a reasonable price. read testimonials from previous
                    clients on how they could find their dream home with just a
                    simple search!
                  </p>
                </div>
              </div>
            </div>

            <div className="article-reg">
              <div className="article-content">
                <div>
                  <Link to="/article" className="article-header">
                    is the price truly right?
                  </Link>
                </div>
                <div>
                  <p className="article-content">
                    read testimonials from previous clients on how they could
                    find their dream home with just a simple search! and that
                    too, for a reasonable price. read testimonials from previous
                    clients on how they could find their dream home with just a
                    simple search!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box-a">
          <div className="header">
            <h2 className="header-text">About us!</h2>
          </div>
          <div>
            <p className="about-us-content">
              At Nestling, we believe in empowering individuals with the
              knowledge to make informed decisions about one of life's most
              significant investments – a home. Our platform specialises in
              extrapolating private housing prices and conducting meticulous
              comparisons to houses currently on the market. Whether you are a
              prospective buyer, seller, or simply a curious observer, our
              commitment is to deliver accurate, up-to-date information to guide
              you on your journey through the world of real estate. Join us as
              we transform the way you perceive, assess, and navigate the
              housing market, making your homeownership dreams a well-informed
              reality. Welcome to Nestling – Where Homes and Insights Unite. At
              Nestling, we believe in empowering individuals with the knowledge
              to make informed decisions about one of life's most significant
              investments – a home. Our platform specialises in extrapolating
              private housing prices and conducting meticulous comparisons to
              houses currently on the market. Whether you are a prospective
              buyer, seller, or simply a curious observer, our commitment is to
              deliver accurate, up-to-date information to guide you on your
              journey through the world of real estate. Join us as we transform
              the way you perceive, assess, and navigate the housing market,
              making your homeownership dreams a well-informed reality. Welcome
              to Nestling – Where Homes and Insights Unite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
