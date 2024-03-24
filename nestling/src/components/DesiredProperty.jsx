import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DesiredProperty.css";

// import "./CurrentListings.css";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import { ListingPanel } from "./ListingPanel";
import supabase from "../supabase";
import { percentageMatchLogic } from "./percentageMatchLogic";
// import { tempData } from "./desiredHouseForm";

// export let currentList = [];

export let desiredAttributes = [
  {
    location: "",
    amenity1: "",
    amenity2: "",
    amenity3: "",
    distanceRadius: "",
    roomCount: "",
    grossFloorArea: "",
  },
];

function DesiredProperty() {
  const [currentList, setCurrentList] = useState([]);
  const [fetchflag, setFetchFlag] = useState(false);
  const [locationInput, setLocationInput] = useState("EXPO MRT STATION");
  const [amenityInput1, setAmenityInput1] = useState("Schools");
  const [amenityInput2, setAmenityInput2] = useState("Supermarkets");
  const [amenityInput3, setAmenityInput3] = useState("Parks");
  const [distanceRadius, setDistanceRadius] = useState(2);
  const [roomCountInput, setRoomCountInput] = useState(3);
  const [grossFloorArea, setGrossFloorArea] = useState(1500);

  useEffect(() => {
    // const fetchUser = async () => {
    //   const {
    //     data: { user },
    //   } = await supabase.auth.getUser();
    //   console.log(user);
    // };

    const fetchListing = async () => {
      let { data, error } = await supabase.from("currentList").select("*");
      //   console.log(data);
      setCurrentList(data);
    };

    // due to duplicates in location options
    const filterLocationList = () => {};

    const fetchDesiredAtrributes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);

      let { data, error } = await supabase
        .from("userInfo")
        .select("desiredProperty")
        .eq("email", user.email);
      //   console.log(data);
      console.log(data[0].desiredProperty[0]);
      let fetchedDesiredAttributes = data[0].desiredProperty[0];

      setLocationInput(fetchedDesiredAttributes.location);
      setAmenityInput1(fetchedDesiredAttributes.amenity1);
      setAmenityInput2(fetchedDesiredAttributes.amenity2);
      setAmenityInput3(fetchedDesiredAttributes.amenity3);
      setDistanceRadius(fetchedDesiredAttributes.distanceRadius);
      setRoomCountInput(fetchedDesiredAttributes.roomCount);
      setGrossFloorArea(fetchedDesiredAttributes.grossFloorArea);
    };
    fetchListing();
    fetchDesiredAtrributes();
  }, [fetchflag]);

  if (currentList.length === 0) {
    // setFetchFlag(!fetchflag);
    return <h1>Fetching data...</h1>;
  }

  const handleSave = async (e) => {
    e.preventDefault();

    desiredAttributes[0].location = locationInput;
    desiredAttributes[0].amenity1 = amenityInput1;
    desiredAttributes[0].amenity2 = amenityInput2;
    desiredAttributes[0].amenity3 = amenityInput3;
    desiredAttributes[0].distanceRadius = distanceRadius;
    desiredAttributes[0].roomCount = roomCountInput;
    desiredAttributes[0].grossFloorArea = grossFloorArea;
    console.log(desiredAttributes);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    const { data, error } = await supabase
      .from("userInfo")
      .update({ desiredProperty: desiredAttributes })
      .eq("email", user.email)
      .select();

    console.log(data);
    console.log(error);

    if (data) {
      alert("update success!");
    } else if (error) {
      alert("error: ", error);
    } else {
      alert("there was a problem updating");
    }
  };

  return (
    <div className="">
      <div className="">
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
            <div className="">
              <h1>Desired Property</h1>
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
              {currentList.map((indivPanel) => {
                // let isDuplicate = currentList.some(
                //   (property) => property.nearestMRT === indivPanel.nearestMRT
                // );
                return (
                  <option value={indivPanel.nearestMRT}>
                    {indivPanel.nearestMRT}
                  </option>
                );
              })}
            </select>
            <label htmlFor="Amenities">Amenities</label>
            <select
              id="Amenities"
              style={{ color: "black" }}
              value={amenityInput1}
              onChange={(e) => {
                if (
                  e.target.value === amenityInput2 ||
                  e.target.value === amenityInput3
                ) {
                  alert("Cannot choose same amenity again");
                  setAmenityInput2("option1");
                } else {
                  setAmenityInput1(e.target.value);
                }
              }}
            >
              <option value="option1">Preferred amenities</option>
              <option value="Schools">Schools</option>
              <option value="Supermarkets">Supermarkets</option>
              <option value="Parks">Parks</option>
              <option value="Stations">Stations</option>
            </select>
            <select
              id="Amenities"
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
              <option value="option2">Preferred amenities</option>
              <option value="Schools">Schools</option>
              <option value="Supermarkets">Supermarkets</option>
              <option value="Parks">Parks</option>
              <option value="Stations">Stations</option>
            </select>
            <select
              id="Amenities"
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
              {/* <option value="option1">Preferred amenities</option>
              <option value="option2">Secondary Schools</option>
              <option value="option3">Primary Schools</option>
              <option value="option4">Supermarkets</option>
              <option value="option5">Parks</option>
              <option value="option6">Malls</option> */}
              <option value="option3">Preferred amenities</option>
              <option value="Schools">Schools</option>
              <option value="Supermarkets">Supermarkets</option>
              <option value="Parks">Parks</option>
              <option value="Stations">Stations</option>
            </select>
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
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label htmlFor="GFA(gross floor area)">
              Gross Floor Area (GFA) (in sq metres, for eg: 1500)
            </label>
            {/* <select id="GFA(gross floor area)" style={{ color: "black" }}>
              <option value="option1"></option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select> */}
            <input
              type="number"
              value={grossFloorArea}
              onChange={(e) => setGrossFloorArea(e.target.value)}
            />
            <button onClick={(e) => handleSave(e)}>SAVE</button>
            <button>ESTIMATE PRICE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesiredProperty;

/*function DesiredProperty () {
    const [selectedValue, setSelectedValue] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleButtonClick = () => {
        setSelectedValue(userInput);
    };

    return(
        <div className="desired-property">
            <div className="top">
                <p>navbar</p>
            </div>

            <div className="bottom">
                <div className="header">
                    <h2 className="header-text">Desired Property</h2>
                </div>

                <div className="location">
                    <label htmlFor="dropdown-location">Location</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                </div>

                <div className="amenities">
                    <label htmlFor="dropdown">Amenities</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Amenities</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="distance">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Distance</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="room-count">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Room count</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="gfa">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">GFA</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>
            </div>
        </div>
    );
}*/

// function DesiredProperty() {
//   const [selectedValues, setSelectedValues] = useState({
//     dropdown: "",
//   });

//   const handleDropdownChange = (dropdownId, value) => {
//     setSelectedValues((prevState) => ({
//       ...prevState,
//       [dropdownId]: value,
//     }));
//   };

//   return (
//     <div>
//       <Dropdown
//         value={selectedValues.dropdown1}
//         onChange={handleDropdownChange}
//       />
//     </div>
//   );
// }

// function Dropdown({ id, value, onChange }) {
//   const options = ["Option 1", "Option 2", "Option 3"];

//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     onChange(id, selectedValue);
//   };

//   return (
//     <div className="desired-property">
//       <div className="top">
//         <p>navbar</p>
//       </div>

//       <div className="header">
//         <h2 className="header-text">Desired Property</h2>
//       </div>

//       <div className="bottom">
//         <div className="location">
//           <label htmlFor={id} className="title">
//             Location
//           </label>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="amenities">
//           <label htmlFor={id} className="title">
//             Amenities
//           </label>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="distance">
//           <label htmlFor={id} className="title">
//             Distance
//           </label>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="room-count">
//           <label htmlFor={id} className="title">
//             Room Count
//           </label>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="gfa">
//           <label htmlFor={id} className="title">
//             GFA
//           </label>
//           <select id={id} value={value} onChange={handleChange}>
//             <option value="">Select an option</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="submit">
//           <button className="button">Save</button>
//           <button
//             onClick={() => console.log("Button clicked")}
//             className="button"
//           >
//             Generate Price
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DesiredProperty;
