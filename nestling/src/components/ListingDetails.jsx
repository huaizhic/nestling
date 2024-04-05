import React from "react";
import { Link } from "react-router-dom";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./ListingDetails.css";
import emptyimage from "../assets/images/emptyimage.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { percentageMatchLogic } from "./percentageMatchLogic";
import axios from "axios";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState([
    {
      projectName: "loading",
      address: "loading",
    },
  ]);
  const [percentageMatch, setPercentageMatch] = useState(0);
  const [desiredListing, setDesiredListing] = useState([
    {
      projectName: "loading",
      address: "loading",
    },
  ]);

  useEffect(() => {
    const fetchIndivListing = async () => {
      //   console.log(id);
      // fetch individual property details
      let { data: currentListing, error } = await supabase
        .from("currentList")
        .select("*")
        .eq("id", id);

      console.log(currentListing);
      //   console.log(error);
      setListing(currentListing[0]);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      //   console.log(user);
      //   console.log(user.email);

      let { data: data1, error: error1 } = await supabase
        .from("userInfo")
        .select("desiredProperty")
        .eq("email", user.email);
      //   console.log(data1);
      let desiredProperty = data1[0].desiredProperty[0];
      //   console.log(percentageMatch);
      console.log(desiredProperty);
      setDesiredListing(desiredProperty);

      if (percentageMatch === 0) {
        let tempData = percentageMatchLogic(
          currentListing,
          desiredProperty.location,
          desiredProperty.roomCount,
          desiredProperty.distanceRadius,
          desiredProperty.amenity1,
          desiredProperty.amenity2,
          desiredProperty.amenity3,
          desiredProperty.grossFloorArea
        );

        // console.log(tempData);
        // let temp = tempData[0].percentageMatch;
        // console.log(temp);
        setPercentageMatch(tempData[0].percentageMatch);
      }
      //   console.log("hi");
    };

    fetchIndivListing();
  }, []);

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  const [count, setCount] = useState(0)
  const [array,setArray] = useState ([]);

  //add this for the forntend to fetch from the API
  const fetchAPI = async() =>{
    const response = await axios.get("http://localhost:8080/python");
    //console.log(response.data.Suggestion);
    setArray(response.data.Suggestion);
  }

  const handleCompare = async () => {
    await fetchAPI();
    history.push(`/compare/${id}`);
  }

  return (
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
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
        <div className="profile-picture">
          <img src={greenwalter} alt="Green Walter Profile" />
          <Link to="/account-details">Account</Link>
        </div>
      </div>
      <div className="infoContainer">
        <div className="imgColumn">
          {listing.imageURL === null ? (
            <img src={emptyimage} style={{ width: "95%", height: "80%" }}></img>
          ) : (
            <img
              src={listing.imageURL}
              style={{ width: "95%", height: "80%" }}
            ></img>
          )}
          <h3 className="imgprojectname">{listing.projectName}</h3>
          <h3 className="imgaddress">{listing.address}</h3>
        </div>
        <div className="textColumn">
          <div className="field">
            <h3>Project Name</h3>
            <span id="ProjectName"></span>
          </div>
          <h3 className="data">{listing.projectName}</h3>
          <div className="field">
            <h3>Location </h3>
            {/* <h3> {listing.nearestMRT}</h3> */}
            <span id="locationField"></span>
          </div>
          <h3 className="data">{listing.address}</h3>
          <div className="field">
            <h3>Amenities & Their Distances</h3>
            <span id="amenitiesField"></span>
          </div>
          <h3 className="data">
            Nearest School: {listing.nearestSchool}
            <br /> {parseFloat(listing.nearestSchoolDistance).toFixed(1)} km
            away
          </h3>
          <h3 className="data">
            Nearest MRT: {listing.nearestMRT}
            <br /> {parseFloat(listing.nearestMRTDistance).toFixed(1)} km away
          </h3>
          <h3 className="data">
            Nearest Park: {listing.nearestPark}
            <br /> {parseFloat(listing.nearestParkDistance).toFixed(1)} km away
          </h3>
          <h3 className="data">
            Nearest Market: {listing.nearestMarket}
            <br /> {parseFloat(listing.nearestMarketDistance).toFixed(1)} km
            away
          </h3>
          <div className="field">
            <h3>Room Count</h3>
            <span id="roomCountField"></span>
          </div>
          <h3 className="data">{listing.roomCount}</h3>
          <div className="field">
            <h3>GFA (gross floor area)</h3>
            <span id="gfaField"></span>
          </div>
          <h3 className="data">{listing.GFA} sqm</h3>
          {/*<div className="field">
                        <h3>Features of the house</h3>
                        <span id="featuresField"></span>
                    </div>
                    <div className="field">
                        <h3>Percentage Match</h3>
                        <span id="featuresField"></span>
                    </div>
                    {percentageMatch === 0 ? (
                        <h3 className="data">Loading</h3>
                    ) : (
                        <h3 className="data">{percentageMatch}</h3>
                    )}*/}
          <div className="field">
            <h3>District Group</h3>
            <span id="featuresField"></span>
          </div>
          <h3 className="data">{listing.districtGroup}</h3>
        </div>
      </div>
      <div className="percentage-match-bubble">{Math.round(parseFloat(percentageMatch))}%</div>
      <div className="compareButton">
      <button onClick={fetchAPI}>Compare</button>
        <p>
          {array.map((Suggestion, index) => (
            <span key={index}>{Suggestion}</span>
          ))}
          </p>
          {/*<Link to={`/compare/${id}`}><button>Compare</button></Link>
          <p>
        {array.map((Suggestion, index) => (
          <span key={index}>{Suggestion}</span>
        ))}
        </p>*/}
      </div>
    </div>
  );
      }

export default ListingDetails;
