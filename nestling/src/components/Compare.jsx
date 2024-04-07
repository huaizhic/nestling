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
}) {
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

  const [nicoleData, setNicoleData] = useState({
    email: "",
    searchListing: [
      {
        searchLocation: locationInput,
        searchAmenity1: amenityInput1,
        searchAmenity2: amenityInput2,
        searchAmenity3: amenityInput3,
        searchDistance: distanceRadius,
        searchRoomCount: roomCountInput,
        searchPrice: housePrice,
        searchGFA: grossFloorArea,
      },
    ],
  });
  const [AIoutput, setAIoutput] = useState("");

  let withPythonFlag = false;

  useEffect(() => {
    const fetchIndivListing = async () => {
      //   console.log(id);
      // fetch individual property details
      let { data: currentListing, error } = await supabase
        .from("currentList")
        .select("*")
        .eq("id", id);

      //   console.log(currentListing);
      //   console.log(error);
      setListing(currentListing[0]);
      // console.log("nicoleData:", nicoleData);
      let tempData = {
        ...nicoleData,
        currentListing: [
          {
            currentLocation: currentListing[0].address,
            currentAmenity1: currentListing[0].nearestMRT,
            currentAmenity2: currentListing[0].nearestMarket,
            currentAmenity3: currentListing[0].nearestSchool,
            currentAmenity4: currentListing[0].nearestPark,
            currentAmenity1Distance: currentListing[0].nearestMRTDistance,
            currentAmenity2Distance: currentListing[0].nearestMarketDistance,
            currentAmenity3Distance: currentListing[0].nearestSchoolDistance,
            currentAmenity4Distance: currentListing[0].nearestParkDistance,
            currentRoomCount: currentListing[0].roomCount,
            currentPrice: currentListing[0].price,
            currentGFA: currentListing[0].GFA,
          },
        ],
      };

      console.log("tempData:", tempData);
      setNicoleData(tempData);
      tempJSON = JSON.stringify(tempData);
      console.log("tempJSON:", tempJSON);
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
      // console.log(desiredProperty);
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
      //   console.log(listing);
    };

    fetchIndivListing();
  }, []);

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
      alert("dataReply received, check console");
      console.log("dataReply:", dataReply);
      setAIoutput(dataReply.Suggestion[0]);
      console.log("dataReply.Suggestion[0]:", dataReply.Suggestion[0]);
    };

    // send data to python backend
    xml.send(tempJSON);
    // console.log(xml.responseText);
    // console.log(xml.send(tempJSON));
  }

  // if (tempJSON.length !== 0 && withPythonFlag === false) {
  //   withPython();
  // }

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/python");
    //console.log(response.data.Suggestion);
    setArray(response.data.Suggestion);
  };

  function handleGenerate() {
    // console.log(tempJSON);
    withPython(tempJSON);
    // fetchAPI();
    // setArray(dataReply);
  }

  async function handleSave(e) {
    e.preventDefault();
    // alert("works");
    const { data: userData, error: userError } = await supabase.auth.getUser();

    const { data: userFavData, error: desiredError } = await supabase
      .from("userInfo")
      .select("savedProperties")
      .eq("email", userData.user.email);

    let temp = userFavData[0].savedProperties;
    // console.log(temp);
    let gotDuplicates = temp.some((property) => property.id === id);
    // console.log(gotDuplicates);
    if (gotDuplicates) {
      alert("Cannot save duplicate property to favourites!");
    } else {
      temp.push({ id: id });
      // console.log(temp.length);
      const { data, error } = await supabase
        .from("userInfo")
        .update({ savedProperties: temp })
        .eq("email", userData.user.email)
        .select();

      // console.log(data);
      // console.log(error);
      if (data) {
        alert("Property Saved! View them in favourites");
      } else if (error) {
        alert("Error saving property! Error:", error);
      }
    }
  }

  return (
    <div className="compare">
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
          <div className="search-container">
            <div className="search">
              <h2>Search</h2>
            </div>
            <label htmlFor="Location">Location</label>
            <span>{locationInput}</span>

            <label htmlFor="Amenities">Amenities</label>
            <span>{amenityInput1}</span>
            <span>{amenityInput2}</span>
            <span>{amenityInput3}</span>

            <label htmlFor="Distance">
              Preferred Distance From Property To Amenities (KM)
            </label>
            <span>{distanceRadius}</span>

            <label htmlFor="Room Count">Room Count</label>
            <span>{roomCountInput}</span>
            <label htmlFor="GFA(gross floor area)">
              GFA (gross floor area)
            </label>
            <span>{grossFloorArea} sqm</span>
            <label htmlFor="price">Price</label>
            <span>{housePrice} </span>
          </div>
        </div>
        <div className="listing-col">
          <div className="listing-info-container">
            <h2>{listing.projectName}</h2>
            <div className="save-button">
              <button onClick={(e) => handleSave(e)}>
                <img src={whitecross} />
              </button>
            </div>
            <div className="field">
              <h3>Location </h3>
              {/* <h3> {listing.nearestMRT}</h3> */}
              <span id="locationField"></span>
            </div>
            <h3 className="data">{listing.address}</h3>
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
              <br /> {parseFloat(listing.nearestParkDistance).toFixed(1)} km
              away
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
            <div className="field">
              <h3>Price</h3>
              <span id="price"></span>
            </div>
            <h3 className="data">{listing.price} </h3>
          </div>
        </div>
      </div>
      <div className="prompt">
        Like this property? Click the + button to save it!
      </div>
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
