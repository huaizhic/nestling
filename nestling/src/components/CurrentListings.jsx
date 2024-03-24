import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CurrentListings.css";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import { ListingPanel } from "./ListingPanel";
import supabase from "../supabase";

// export let currentList = [];

function CurrentListings() {
  const [currentList, setCurrentList] = useState([]);
  const [fetchflag, setFetchFlag] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      let { data, error } = await supabase.from("currentList").select("*");
      console.log(data);
      setCurrentList(data);
    };
    fetchListing();
  }, [fetchflag]);

  if (currentList.length === 0) {
    // setFetchFlag(!fetchflag);
    return <h1>Fetching data...</h1>;
  }

  return (
    <div className="current-listings">
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
          </ul>
        </div>
        <div className="profile-picture">
          <img src={greenwalter} alt="Green Walter Profile" />
          <Link to="/account-details">Account</Link>
        </div>
      </div>
      <div className="columns">
        <div className="search-column">
          <div className="search-container">
            <div className="search">
              <h1>Search</h1>
            </div>
            <label htmlFor="Location">Location</label>
            <select id="Location" style={{ color: "black" }}>
              <option value="option1">Preferred location</option>
              <option value="option2">Woodlands</option>
              <option value="option3">Tiong Bahru</option>
              <option value="option4">Tanjong Pagar</option>
              <option value="option5">Orchard</option>
            </select>
            <label htmlFor="Amenities">Amenities</label>
            <select id="Amenities" style={{ color: "black" }}>
              <option value="option1">Preferred amenities</option>
              <option value="option2">Secondary Schools</option>
              <option value="option3">Primary Schools</option>
              <option value="option4">Supermarkets</option>
              <option value="option5">Parks</option>
              <option value="option6">Malls</option>
            </select>
            <label htmlFor="Distance">Distance</label>
            <select id="Distance" style={{ color: "black" }}>
              <option value="option1" style={{ color: "black" }}>
                Radius within which amenities are
              </option>
              <option value="option2">1km</option>
              <option value="option3">2km</option>
              <option value="option4">3km</option>
              <option value="option5">4km</option>
              <option value="option6">5km</option>
            </select>
            <label htmlFor="Room Count">Room Count</label>
            <select id="Room Count" style={{ color: "black" }}>
              <option value="option1">Preferred number of rooms</option>
              <option value="option2">3</option>
              <option value="option3">4</option>
              <option value="option4">5</option>
            </select>
            <label htmlFor="GFA(gross floor area)">GFA(gross floor area)</label>
            <select id="GFA(gross floor area)" style={{ color: "black" }}>
              <option value="option1"></option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <button>SEARCH</button>
          </div>
          <div className="OR">
            <h3>OR</h3>
          </div>
          <div className="desiredpropsearch">
            <button style={{ color: "black" }}>
              Search using my desired property attributes
            </button>
          </div>
        </div>
        <div className="listings-column">
          <div className="Listings">
            <h1>Current Listings</h1>
          </div>
          <div className="listings-container">
            {/* <ListingPanel />
            <ListingPanel />
            <ListingPanel />
            <ListingPanel />
            <ListingPanel /> */}
            {currentList.map((indivPanel) => {
              return (
                <ListingPanel
                  title={indivPanel.projectName}
                  price={indivPanel.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentListings;
