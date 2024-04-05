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
    searchListing: {
      searchLocation: locationInput,
      searchAmenity1: amenityInput1,
      searchAmenity2: amenityInput2,
      searchAmenity3: amenityInput3,
      searchDistance: distanceRadius,
      searchRoomCount: roomCountInput,
      searchGFA: grossFloorArea,
    },

    //   currentLocation: listing.address,
    //   currentAmenity1: listing.nearestMRT,
    //   currentAmenity1Distance: listing.nearestMRTDistance,
    //   currentAmenity2Distance: listing.nearestMarketDistance,
    //   currentAmenity3Distance: listing.nearestSchoolDistance,
    //   currentAmenity4Distance: listing.nearestParkDistance,
    //   currentRoomCount: listing.roomCount,
    //   currentGFA: listing.GFA,
  });

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
      console.log("nicoleData:", nicoleData);
      let tempData = {
        ...nicoleData,
        currentListing: {
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
          currentGFA: currentListing[0].GFA,
        },
      };

      console.log("tempData:", tempData);
      setNicoleData(tempData);
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
      //   console.log(listing);
    };

    fetchIndivListing();
  }, []);

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
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
          </div>
        </div>
        <div className="listing-col">
          <div className="listing-info-container">
            <h2>{listing.projectName}</h2>
            <div className="save-button">
              <button>
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
          </div>
        </div>
      </div>
      <div className="prompt">
        Like this property? Click the + button to save it!
      </div>
      <div className="AI-output">AI OUTPUT</div>
    </div>
  );
}

export default Compare;
