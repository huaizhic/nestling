import React from "react";
import { Link } from "react-router-dom";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./ListingInfo.css";
import emptyimage from "../assets/images/emptyimage.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";

function ListingInfo() {
  const { id } = useParams();
  const [listing, setListing] = useState([
    {
      projectName: "loading",
      address: "loading",
    },
  ]);

  useEffect(() => {
    const fetchIndivListing = async () => {
      let { data, error } = await supabase
        .from("currentList")
        .select("*")
        .eq("id", id);
      console.log(data);
      setListing(data);
    };

    fetchIndivListing();
  }, []);

  return (
    <div className="listing-info">
      <div className="topcontainer">
        <div className="logo">
          <img src={walterlogo} alt="Walter Logo" />
        </div>
        {/* <div className="navbar">
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
                </div> */}
        <div className="profile-picture">
          <img src={greenwalter} alt="Green Walter Profile" />
          <Link to="/account-details">Account</Link>
        </div>
      </div>
      <div className="infoContainer">
        <div className="imgColumn">
          <img src={emptyimage}></img>
        </div>
        <div className="textColumn">
          <div className="field">
            <h3>Project Name</h3>
            <span id="ProjectName"></span>
          </div>
          <h3 className="data">{listing[0].projectName}</h3>
          <div className="field">
            <h3>Address</h3>
            <span id="locationField"></span>
          </div>
          <h3 className="data">{listing[0].address}</h3>
          <div className="field">
            <h3>Amenities & Their Distances</h3>
            <span id="amenitiesField"></span>
          </div>
          <div className="field">
            <h3>Room Count</h3>
            <span id="roomCountField"></span>
          </div>
          <div className="field">
            <h3>GFA (gross floor area)</h3>
            <span id="gfaField"></span>
          </div>
          <div className="field">
            <h3>Features of the house</h3>
            <span id="featuresField"></span>
          </div>
        </div>
      </div>
      <div className="compareButton">
        <button>Compare</button>
      </div>
    </div>
  );
}

export default ListingInfo;
