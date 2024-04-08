import React from "react";
import { Link } from "react-router-dom";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./CompareFav.css";
import "./Navbar.css";
import emptyimage from "../assets/images/emptyimage.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { percentageMatchLogic } from "./percentageMatchLogic";
import { locations } from "../App";
import whitecross from "../../src/assets/images/whitecross.png";
import axios from "axios";

export let tempJSON = "";

function Compare({
  locationInput,
  setLocationInput,
  amenityInput1,
  setAmenityInput1,
  setAmenityInput2,
  setAmenityInput3,
  amenityInput2,
  amenityInput3,
  distanceRadius,
  setDistanceRadius,
  roomCountInput,
  setRoomCountInput,
  grossFloorArea,
  setGrossFloorArea,
  housePrice,
  setHousePrice,
  selection,
  setSelection,
  rerenderCompareFav,
  setRerenderCompareFav,
}) {
  // const { id } = useParams();
  if (selection.length === 0) {
    return <h1> Loading... </h1>;
  }

  const [leftListing, setLeftListing] = useState({
    projectName: "loading",
    address: "loading",
  });
  const [rightListing, setRightListing] = useState({
    projectName: "loading",
    address: "loading",
  });
  // const [percentageMatch, setPercentageMatch] = useState(0);
  const [nicoleData, setNicoleData] = useState({
    from: "compareFav",
    leftListing: [
      {
        location: selection[0].address,
        amenity1: selection[0].nearestMRT,
        amenity2: selection[0].nearestMarket,
        amenity3: selection[0].nearestSchool,
        amenity4: selection[0].nearestPark,
        amenity1Distance: selection[0].nearestMRTDistance,
        amenity2Distance: selection[0].nearestMarketDistance,
        amenity3Distance: selection[0].nearestSchoolDistance,
        amenity4Distance: selection[0].nearestParkDistance,
        roomCount: selection[0].roomCount,
        price: selection[0].price,
        GFA: selection[0].GFA,
      },
    ],
  });
  const [AIoutput, setAIoutput] = useState("");

  let withPythonFlag = false;

  useEffect(() => {
    const fetch = () => {
      setRightListing([selection[1]]);
      // console.log("nicoleData:", nicoleData);
      let tempData = {
        ...nicoleData,
        rightListing: [
          {
            location: selection[1].address,
            amenity1: selection[1].nearestMRT,
            amenity2: selection[1].nearestMarket,
            amenity3: selection[1].nearestSchool,
            amenity4: selection[1].nearestPark,
            amenity1Distance: selection[1].nearestMRTDistance,
            amenity2Distance: selection[1].nearestMarketDistance,
            amenity3Distance: selection[1].nearestSchoolDistance,
            amenity4Distance: selection[1].nearestParkDistance,
            roomCount: selection[1].roomCount,
            price: selection[1].price,
            GFA: selection[1].GFA,
          },
        ],
      };

      setLeftListing({
        location: selection[0].address,
        amenity1: selection[0].nearestMRT,
        amenity2: selection[0].nearestMarket,
        amenity3: selection[0].nearestSchool,
        amenity4: selection[0].nearestPark,
        amenity1Distance: selection[0].nearestMRTDistance,
        amenity2Distance: selection[0].nearestMarketDistance,
        amenity3Distance: selection[0].nearestSchoolDistance,
        amenity4Distance: selection[0].nearestParkDistance,
        roomCount: selection[0].roomCount,
        price: selection[0].price,
        GFA: selection[0].GFA,
      });

      setRightListing({
        location: selection[1].address,
        amenity1: selection[1].nearestMRT,
        amenity2: selection[1].nearestMarket,
        amenity3: selection[1].nearestSchool,
        amenity4: selection[1].nearestPark,
        amenity1Distance: selection[1].nearestMRTDistance,
        amenity2Distance: selection[1].nearestMarketDistance,
        amenity3Distance: selection[1].nearestSchoolDistance,
        amenity4Distance: selection[1].nearestParkDistance,
        roomCount: selection[1].roomCount,
        price: selection[1].price,
        GFA: selection[1].GFA,
      });

      console.log("tempData:", tempData);
      setNicoleData(tempData);
      tempJSON = JSON.stringify(tempData);
      console.log("tempJSON:", tempJSON);

      //   console.log("hi");
      //   console.log(listing);
    };

    fetch();
  }, [rerenderCompareFav]);

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  function withPython(tempJSON) {
    var xml = new XMLHttpRequest();
    xml.open("POST", "http://localhost:8080/python", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // receive python response
    xml.onload = function () {
      var dataReply = JSON.parse(this.responseText);
      alert("AI Output generated!");
      console.log("dataReply:", dataReply);
      setAIoutput(dataReply.Suggestion[0]);
      console.log("dataReply.Suggestion[0]:", dataReply.Suggestion[0]);
    };

    // send data to python backend
    xml.send(tempJSON);
    // console.log(xml.responseText);
    // console.log(xml.send(tempJSON));
  }

  function handleGenerate() {
    withPython(tempJSON);
  }

  return (
    <div className="compare">
      <div className="top">
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
          </ul>
        </div>
        <div className="profile-picture">
          <img src={greenwalter} alt="Green Walter Profile" />
          <Link to="/account-details">Account</Link>
        </div>
      </div>
      <div className="overall-container">
        <div className="desired-prop-col">
          <div className="listing-info-container">
            <h2>{leftListing.projectName}</h2>
            {/* <div className="save-button">
              <button onClick={(e) => handleSave(e)}>
                <img src={whitecross} />
              </button>
            </div> */}
            <div className="field">
              <h3>Location </h3>
              {/* <h3> {listing.nearestMRT}</h3> */}
              <span id="locationField"></span>
            </div>
            <h3 className="data">{leftListing.location}</h3>
            <div className="field">
              <h3>Amenities & Their Distances From Property</h3>
              {/* <button
                    onClick={() => {
                        console.log("nicoleData:", nicoleData);
                    }}
                    >
                    hi
                    </button> */}
              <span id="amenitiesField"></span>
            </div>
            <h3 className="data">
              Nearest School: {leftListing.amenity3}
              <br /> {parseFloat(leftListing.amenity3Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest MRT: {leftListing.amenity1}
              <br /> {parseFloat(leftListing.amenity1Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest Park: {leftListing.amenity4}
              <br /> {parseFloat(leftListing.amenity4Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest Market: {leftListing.amenity2}
              <br /> {parseFloat(leftListing.amenity2Distance).toFixed(1)} km
              away
            </h3>
            <div className="field">
              <h3>Room Count</h3>
              <span id="roomCountField"></span>
            </div>
            <h3 className="data">{leftListing.roomCount}</h3>
            <div className="field">
              <h3>GFA (gross floor area)</h3>
              <span id="gfaField"></span>
            </div>
            <h3 className="data">{leftListing.GFA} sqm</h3>
            <div className="field">
              <h3>Price</h3>
              <span id="price"></span>
            </div>
            <h3 className="data">{leftListing.price} </h3>
          </div>
        </div>
        <div className="listing-col">
          <div className="listing-info-container">
            <h2>{rightListing.projectName}</h2>
            {/* <div className="save-button">
              <button onClick={(e) => handleSave(e)}>
                <img src={whitecross} />
              </button>
            </div> */}
            <div className="field">
              <h3>Location </h3>
              {/* <h3> {listing.nearestMRT}</h3> */}
              <span id="locationField"></span>
            </div>
            <h3 className="data">{rightListing.location}</h3>
            <div className="field">
              <h3>Amenities & Their Distances From Property</h3>
              {/* <button
                    onClick={() => {
                        console.log("nicoleData:", nicoleData);
                    }}
                    >
                    hi
                    </button> */}
              <span id="amenitiesField"></span>
            </div>
            <h3 className="data">
              Nearest School: {rightListing.amenity3}
              <br /> {parseFloat(rightListing.amenity3Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest MRT: {rightListing.amenity1}
              <br /> {parseFloat(rightListing.amenity1Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest Park: {rightListing.amenity4}
              <br /> {parseFloat(rightListing.amenity4Distance).toFixed(1)} km
              away
            </h3>
            <h3 className="data">
              Nearest Market: {rightListing.amenity2}
              <br /> {parseFloat(rightListing.amenity2Distance).toFixed(1)} km
              away
            </h3>
            <div className="field">
              <h3>Room Count</h3>
              <span id="roomCountField"></span>
            </div>
            <h3 className="data">{rightListing.roomCount}</h3>
            <div className="field">
              <h3>GFA (gross floor area)</h3>
              <span id="gfaField"></span>
            </div>
            <h3 className="data">{rightListing.GFA} sqm</h3>
            <div className="field">
              <h3>Price</h3>
              <span id="price"></span>
            </div>
            <h3 className="data">{rightListing.price} </h3>
          </div>
        </div>
      </div>
      {/* <div className="prompt">
        Like this property? Click the + button to save it!
      </div> */}
      <div className="AI-output">
        AI OUTPUT
        <br></br>
        <button onClick={() => handleGenerate()}>Generate</button>
        <p>{AIoutput}</p>
        {/* <p>
          Property 1 offers a location in Tampines, with a room count of 4 and a
          gross floor area of 1324. It is within close proximity to Tampines
          West MRT Station (1.379991485 distance), PRIME SUPERMARKET LIMITED
          (0.867331326 distance), and DAMAI SECONDARY SCHOOL (1.220755183
          distance). Property 2, on the other hand, is also located in Tampines
          but has a room count of 3 and a larger gross floor area of 1500. It is
          within a distance radius of 2 to schools, supermarkets, and parks.
          Considering common priorities like family-friendliness, accessibility,
          and lifestyle amenities, I'd recommend Property 1 for its closer
          proximity to amenities and Property 2 for its larger floor area and
          access to schools, supermarkets, and parks. In addition, Property 1 is
          located in the East region of Singapore while Property 2 is located in
          the North East region.
        </p> */}
      </div>
    </div>
  );
}

export default Compare;
