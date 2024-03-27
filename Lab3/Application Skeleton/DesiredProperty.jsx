import React, { useState, useEffect } from "react";
import {Link  } from "react-router-dom";
import "./DesiredProperty.css";
import Dropdown from "./Dropdown.jsx";

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
  const [selectedLocation, setLocation] = useState('');
  const [selectedDistance, setDistance] = useState('');
  const [selectedRoomCount, setRoomCount] = useState('');
  const [selectedGFA, setGFA] = useState('');
  const [selectedAmenities1, setAmenities1] = useState('');
  const [selectedAmenities2, setAmenities2] = useState('');
  const [selectedAmenities3, setAmenities3] = useState(1500);

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

    setLocation(fetchedDesiredAttributes.location);
    setAmenities1(fetchedDesiredAttributes.amenity1);
    setAmenities2(fetchedDesiredAttributes.amenity2);
    setAmenities3(fetchedDesiredAttributes.amenity3);
    setDistance(fetchedDesiredAttributes.distanceRadius);
    setRoomCount(fetchedDesiredAttributes.roomCount);
    setGFA(fetchedDesiredAttributes.grossFloorArea);
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

    desiredAttributes[0].location = selectedLocation;
    desiredAttributes[0].amenity1 = selectedAmenities1;
    desiredAttributes[0].amenity2 = selectedAmenities2;
    desiredAttributes[0].amenity3 = selectedAmenities3;
    desiredAttributes[0].distanceRadius = selectedDistance;
    desiredAttributes[0].roomCount = selectedRoomCount;
    desiredAttributes[0].grossFloorArea = selectedGFA;
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

  //for dropdown boxes: amenities, room count and distance
  const distance = [
    {value: '0-1km', label: '0-1km'},
    {value: '1-2km', label: '1-2km'},
    {value: '2-3km', label: '2-3km'},
    {value: '3-4km', label: '3-4km'},
    {value: '4-5km', label: '4-5km'},
    {value: '5-6km', label: '5-6km'},
    {value: '6-7km', label: '6-7km'},
  ];

  const roomcount = [
    {value: '3 rooms', label: '3 rooms'},
    {value: '4 rooms', label: '4 rooms'},
    {value: '5 rooms', label: '5 rooms'},
    {value: '>5 rooms', label: '>5 rooms'},
];

  const amenities = [
  {value: 'MRT', label:'MRT'},
  {value:'Parks', label:'Parks'},
  {value: 'Schools', label: 'Schools'},
  {value: 'Supermarkets', label:'Supermarkets'},
  ];

  //console logging a json file
  const generateJson = async (e) => {

    desiredAttributes[0].location = selectedLocation;
    desiredAttributes[0].amenity1 = selectedAmenities1;
    desiredAttributes[0].amenity2 = selectedAmenities2;
    desiredAttributes[0].amenity3 = selectedAmenities3;
    desiredAttributes[0].distanceRadius = selectedDistance;
    desiredAttributes[0].roomCount = selectedRoomCount;
    desiredAttributes[0].grossFloorArea = selectedGFA;
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
  }

    return(
        <div className="desired-property">
            <div className="top">
            </div>
            <div className="bottom">
                <div className="header-section">
                    <h2 className="header">Desired Property</h2>
                </div>
                <div className="dropdown-div">
                  <div className="location-div">
                    <h3 className="location">Location</h3>
                  </div>
                  <select
                    id="Location"
                    value={selectedLocation}
                    className="dropdown"
                    onChange={(e) => setLocation(e.target.value)}
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
                </div>
                <div className="amenities">
                    <div>
                        <h3 className="amenities-div">Amenities</h3>
                    </div>
                    <div className="amenities-dropdowns">
                        <div className="amenities-1">
                          <Dropdown
                            options={amenities}
                            selectedOption={selectedAmenities1}
                            onSelect={setAmenities1}
                            onChange={(e) => {
                              if (
                                e.target.value === selectedAmenities2 ||
                                e.target.value === selectedAmenities3
                              ) {
                                alert("Cannot choose same amenity again");
                                setAmenities1("option1");
                              } else {
                                setAmenities1(e.target.value);
                              }
                            }}
                          />
                        </div>
                        <div className="amenities-2">
                          <Dropdown
                            options={amenities}
                            selectedOption={selectedAmenities2}
                            onSelect={setAmenities2}
                            onChange={(e) => {
                              if (
                                e.target.value === selectedAmenities1 ||
                                e.target.value === selectedAmenities3
                              ) {
                                alert("Cannot choose same amenity again");
                                setAmenities2("option2");
                              } else {
                                setAmenities2(e.target.value);
                              }
                            }}
                          />
                        </div>
                        <div className="amenities-3">
                          <Dropdown
                            options={amenities}
                            selectedOption={selectedAmenities3}
                            onSelect={setAmenities3}
                            onChange={(e) => {
                              if (
                                e.target.value === selectedAmenities2 ||
                                e.target.value === selectedAmenities1
                              ) {
                                alert("Cannot choose same amenity again");
                                setAmenities3("option3");
                              } else {
                                setAmenities3(e.target.value);
                              }
                            }}
                          />
                        </div>
                    </div>
                </div>
                <div className="dropdown-div">
                  <h3 className="distance">Distance</h3>
                  <Dropdown
                    options={distance}
                    selectedOption={selectedDistance}
                    onSelect={setDistance}
                  />
                </div>

                <div className="dropdown-div">
                    <h3 className ="room-count">Room Count</h3>
                    <Dropdown
                        options={roomcount}
                        selectedOption={selectedRoomCount}
                        onSelect={setRoomCount}
                    />
                </div>

                <div className="dropdown-div">
                  <h3 className ="gfa">GFA</h3>
                  <input
                    type="number"
                    value={selectedGFA}
                    className="dropdown"
                    onChange={(e) => setGFA(e.target.value)}
                  />
                </div>
            </div>

            <div className="generate-price">
              <Link to ="/generated-price">
                <h2 onClick={() => generateJson()}>Generate Price</h2>
              </Link>
            </div>
        </div>
    );
}

export default DesiredProperty;
