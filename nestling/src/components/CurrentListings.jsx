import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CurrentListings.css";
import './Navbar.css';
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import { ListingPanel } from "./ListingPanel";
import supabase from "../supabase";
import { percentageMatchLogic } from "./percentageMatchLogic";
// import { tempData } from "./desiredHouseForm";

// export let currentList = [];
export let locations = [
  { value: "Ang Mo Kio", label: "Ang Mo Kio" },
  { value: "Bedok", label: "Bedok" },
  { value: "Bishan", label: "Bishan" },
  { value: "Bukit Batok", label: "Bukit Batok" },
  { value: "Bukit Merah", label: "Bukit Merah" },
  { value: "Bukit Panjang", label: "Bukit Panjang" },
  { value: "Choa Chu Kang", label: "Choa Chu Kang" },
  { value: "Clementi", label: "Clementi" },
  { value: "Geylang", label: "Geylang" },
  { value: "Hougang", label: "Hougang" },
  { value: "Jurong East", label: "Jurong East" },
  { value: "Jurong West", label: "Jurong West" },
  { value: "Kallang/Whampoa", label: "Kallang/Whampoa" },
  { value: "Pasir Ris", label: "Pasir Ris" },
  { value: "Punggol", label: "Punggol" },
  { value: "Queenstown", label: "Queenstown" },
  { value: "Sembawang", label: "Sembawang" },
  { value: "Sengkang", label: "Sengkang" },
  { value: "Serangoon", label: "Serangoon" },
  { value: "Tampines", label: "Tampines" },
  { value: "Tengah", label: "Tengah" },
  { value: "Toa Payoh", label: "Toa Payoh" },
  { value: "Woodlands", label: "Woodlands" },
  { value: "Yishun", label: "Yishun" },
];

function CurrentListings({
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
  const [currentList, setCurrentList] = useState([]);
  const [fetchflag, setFetchFlag] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  // const [locationInput, setLocationInput] = useState("Tampines");
  // const [amenityInput1, setAmenityInput1] = useState("Schools");
  // const [amenityInput2, setAmenityInput2] = useState("Supermarkets");
  // const [amenityInput3, setAmenityInput3] = useState("Parks");
  // const [distanceRadius, setDistanceRadius] = useState(2);
  // const [roomCountInput, setRoomCountInput] = useState(3);
  // const [grossFloorArea, setGrossFloorArea] = useState(1500);
  const [showListings, setShowListings] = useState(false);
  {
    /*conditional render*/
  }

  useEffect(() => {
    const fetchListing = async () => {
      let { data, error } = await supabase.from("currentList").select("*");
      console.log(data);
      setCurrentList(data);
      // return data;

      // as original data as no room count, this is a scripting function to add room count based on existing GFA
      const addRoomCount = (data) => {
        // console.log(data);
        data.forEach((indivProperty) => {
          if (indivProperty.GFA < 1000) {
            indivProperty.roomCount = 3;
          } else if (indivProperty.GFA > 1000 && indivProperty.GFA < 1500) {
            indivProperty.roomCount = 4;
          } else if (indivProperty.GFA > 1500) {
            indivProperty.roomCount = 5;
          }
        });
        // console.log(data);
      };

      // addRoomCount(data);
      // console.log(data);
      // to upload newly added roomCount of each property to supabase
      // data.forEach(async (indivProperty) => {
      //   let { data1, error1 } = await supabase
      //     .from("currentList")
      //     .update({ roomCount: indivProperty.roomCount })
      //     .eq("id", indivProperty.id);

      //   // console.log(data1);
      //   // console.log(error1);
      // });
    };

    // due to duplicates in location options
    const filterLocationList = () => {};

    fetchListing();
    // addRoomCount(data);
  }, [fetchflag]);

  if (currentList.length === 0) {
    // setFetchFlag(!fetchflag);
    return <h1>Fetching data...</h1>;
  }

  const handleNormalSearch = (e) => {
    e.preventDefault();
    if (grossFloorArea <= 0 || grossFloorArea > 5000) {
      alert("Error, gross floor area can only be between 1 and 5000 sqm!");
    } else {
      let tempData = percentageMatchLogic(
        currentList,
        locationInput,
        roomCountInput,
        distanceRadius,
        amenityInput1,
        amenityInput2,
        amenityInput3,
        grossFloorArea
      );
      // console.log(tempData);
      tempData.sort((a, b) => {
        if (a.percentageMatch < b.percentageMatch) {
          return 1;
        } else if (a.percentageMatch > b.percentageMatch) {
          return -1;
        }
        // if a.percentageMatch = b.percentageMatch
        return 0;
      });
      setCurrentList(tempData);
      setShowListings(true);
      setSearchPerformed(true);
    }
  };

  const handleDesiredSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    let { data, error } = await supabase
      .from("userInfo")
      .select("desiredProperty")
      .eq("email", user.email);

    // console.log(data);
    let desiredAttributes = data[0].desiredProperty[0];
    setLocationInput(desiredAttributes.location);
    setAmenityInput1(desiredAttributes.amenity1);
    setAmenityInput2(desiredAttributes.amenity2);
    setAmenityInput3(desiredAttributes.amenity3);
    setDistanceRadius(desiredAttributes.distanceRadius);
    setRoomCountInput(desiredAttributes.roomCount);
    setGrossFloorArea(desiredAttributes.grossFloorArea);

    let tempData = percentageMatchLogic(
      currentList,
      desiredAttributes.location,
      desiredAttributes.roomCount,
      desiredAttributes.distanceRadius,
      desiredAttributes.amenity1,
      desiredAttributes.amenity2,
      desiredAttributes.amenity3,
      desiredAttributes.grossFloorArea
    );
    // console.log(tempData);
    tempData.sort((a, b) => {
      if (a.percentageMatch < b.percentageMatch) {
        return 1;
      } else if (a.percentageMatch > b.percentageMatch) {
        return -1;
      }
      // if a.percentageMatch = b.percentageMatch
      return 0;
    });
    setCurrentList(tempData);
    setShowListings(true);
    setSearchPerformed(true);
  };

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  return (
    <div className="current-listings">
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
      <div className="columns">
        <div className="search-column">
          <div className="search-container-current-listings">
            <div className="search">
              <h3>Search</h3>
            </div>
            <label htmlFor="Location">Location</label>
            <select
              id="Location"
              value={locationInput}
              style={{ color: "black" }}
              onChange={(e) => setLocationInput(e.target.value)}
            >
              <option value="option1">Preferred location</option>
              {/* <option value="option2">Woodlands</option>
              <option value="option3">Tiong Bahru</option>
              <option value="option4">Tanjong Pagar</option>
              <option value="option5">Orchard</option> */}
              {locations.map((location) => {
                // let isDuplicate = currentList.some(
                //   (property) => property.nearestMRT === indivPanel.nearestMRT
                // );
                return <option value={location.value}>{location.label}</option>;
              })}
            </select>
            <label htmlFor="Amenities">Amenities</label>
            <div className="amenities-container">
              <select
                id="Amenities"
                className="amenity-dropdown"
                style={{ color: "black" }}
                value={amenityInput1}
                onChange={(e) => {
                  if (
                    e.target.value === amenityInput2 ||
                    e.target.value === amenityInput3
                  ) {
                    alert("Cannot choose same amenity again");
                    setAmenityInput1("option1");
                  } else {
                    setAmenityInput1(e.target.value);
                  }
                }}
              >
                <option value="option1">Select an option</option>
                <option value="Schools">Schools</option>
                <option value="Supermarkets">Supermarkets</option>
                <option value="Parks">Parks</option>
                <option value="Stations">MRT Stations</option>
              </select>
              <select
                id="Amenities"
                className="amenity-dropdown"
                style={{ color: "black" }}
                value={amenityInput2}
                onChange={(e) => {
                  if (
                    e.target.value === amenityInput1 ||
                    e.target.value === amenityInput3
                  ) {
                    alert("Cannot choose same amenity again");
                    setAmenityInput2("option2");
                  } else {
                    setAmenityInput2(e.target.value);
                  }
                }}
              >
                <option value="option1">Select an option</option>
                <option value="Schools">Schools</option>
                <option value="Supermarkets">Supermarkets</option>
                <option value="Parks">Parks</option>
                <option value="Stations">MRT Stations</option>
              </select>
              <select
                id="Amenities"
                className="amenity-dropdown"
                style={{ color: "black" }}
                value={amenityInput3}
                onChange={(e) => {
                  if (
                    e.target.value === amenityInput1 ||
                    e.target.value === amenityInput2
                  ) {
                    alert("Cannot choose same amenity again");
                    setAmenityInput3("option3");
                  } else {
                    setAmenityInput3(e.target.value);
                  }
                }}
              >
                <option value="option1">Select an option</option>
                <option value="Schools">Schools</option>
                <option value="Supermarkets">Supermarkets</option>
                <option value="Parks">Parks</option>
                <option value="Stations">MRT Stations</option>
              </select>
            </div>
            <label htmlFor="Distance">Distance (KM)</label>
            <select
              id="Distance"
              style={{ color: "black" }}
              value={distanceRadius}
              onChange={(e) => setDistanceRadius(e.target.value)}
            >
              <option value="option1" style={{ color: "black" }}>
                Radius within which amenities are
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="Room Count">Room Count</label>
            <select
              id="Room Count"
              style={{ color: "black" }}
              value={roomCountInput}
              onChange={(e) => setRoomCountInput(e.target.value)}
            >
              <option value="option1">Preferred number of rooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="GFA(gross floor area)">
              Gross Floor Area (GFA) (in sq metres, for eg: 1500)
            </label>
            <input
              type="number"
              value={grossFloorArea}
              style={{ color: "black" }}
              onChange={(e) => setGrossFloorArea(e.target.value)}
            />
            <button onClick={(e) => handleNormalSearch(e)}>SEARCH</button>
          </div>
          <div className="OR">
            <h3>OR</h3>
          </div>
          <div className="desiredpropsearch">
            <button
              style={{ color: "black" }}
              onClick={(e) => handleDesiredSubmit(e)}
            >
              Search using my desired property attributes
            </button>
          </div>
        </div>
        <div className="listings-column">
          <div className="Listings">
            <h3>Current Listings</h3>
          </div>
          <div className="listings-container">
            {/* {!showListings && (
              <p className="chirpingText">Nothing chirping yet:(</p>
            )}
            {showListings &&
              currentList.map((indivPanel) => {
                return (
                  <div className="listing-panel">
                    <ListingPanel indivData={indivPanel} />
                  </div>
                );
              })} */}
            {!searchPerformed && (
              <p className="chirpingText">Nothing chirping yet:(</p>
            )}
            {showListings &&
              currentList.map((indivPanel) => {
                return (
                  <div className="listing-panel" key={indivPanel.id}>
                    <ListingPanel indivData={indivPanel} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentListings;
