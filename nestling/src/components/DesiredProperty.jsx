import React, { useState, useEffect } from "react";
import "./DesiredProperty.css";
import Dropdown from './Dropdown.jsx'
import supabase from "../supabase";

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
  const [selectedLocation, setLocation] = useState('');
  const [selectedDistance, setDistance] = useState('a');
  const [selectedRoomCount, setRoomCount] = useState('');
  const [selectedGFA, setGFA] = useState('');
  const [selectedAmenities1, setAmenities1] = useState('');
  const [selectedAmenities2, setAmenities2] = useState('');
  const [selectedAmenities3, setAmenities3] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("currentList").select("*");
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setCurrentList(data);
      }

      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user data:", userError.message);
      } else {
        const { data: userDesiredData, error: desiredError } = await supabase
          .from("userInfo")
          .select("desiredProperty")
          .eq("email", userData.email);

        if (desiredError) {
          console.error("Error fetching desired property data:", desiredError.message);
        } else {
          const fetchedDesiredAttributes = userDesiredData[0]?.desiredProperty[0];
          if (fetchedDesiredAttributes) {
            setLocation(fetchedDesiredAttributes.location || '');
            setAmenities1(fetchedDesiredAttributes.amenity1 || '');
            setAmenities2(fetchedDesiredAttributes.amenity2 || '');
            setAmenities3(fetchedDesiredAttributes.amenity3 || '');
            setDistance(fetchedDesiredAttributes.distanceRadius || '');
            setRoomCount(fetchedDesiredAttributes.roomCount || '');
            setGFA(fetchedDesiredAttributes.grossFloorArea || '');
          }
        }
      }
    };
    fetchData();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    desiredAttributes[0].location = selectedLocation;
    desiredAttributes[0].amenity1 = selectedAmenities1;
    desiredAttributes[0].amenity2 = selectedAmenities2;
    desiredAttributes[0].amenity3 = selectedAmenities3;
    desiredAttributes[0].distanceRadius = selectedDistance;
    desiredAttributes[0].roomCount = selectedRoomCount;
    desiredAttributes[0].grossFloorArea = selectedGFA;

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user data:", userError.message);
      return;
    }

    const { data, error } = await supabase
      .from("userInfo")
      .update({ desiredProperty: desiredAttributes })
      .eq("email", userData.email)
      .select();

    if (error) {
      console.error("Error updating desired property:", error.message);
    } else {
      alert("Update success!");
    }
  };

  //for dropdown boxes: amenities, room count, distance and location
  const locations = [
    {value: 'Ang Mo Kio', label: 'Ang Mo Kio'},
    {value: 'Bedok', label: 'Bedok'},
    {value: 'Bishan', label: 'Bishan'}, 
    {value: 'Bukit Batok', label: 'Bukit Batok'},
    {value: 'Bukit Merah', label: 'Bukit Merah'},
    {value: 'Bukit Panjang', label: 'Bukit Panjang'},
    {value: 'Choa Chu Kang', label: 'Choa Chu Kang'}, 
    {value: 'Clementi', label: 'Clementi'},
    {value: 'Geylang', label: 'Geylang'},
    {value: 'Hougang', label: 'Hougang'},
    {value: 'Jurong East', label: 'Jurong East'},
    {value: 'Jurong West', label: 'Jurong West'},
    {value: 'Kallang/Whampoa', label: 'Kallang/Whampoa'},
    {value: 'Pasir Ris', label: 'Pasir Ris'},
    {value: 'Punggol', label: 'Punggol'},
    {value: 'Queenstown', label: 'Queenstown'},
    {value: 'Sembawang', label: 'Sembawang'},
    {value: 'Sengkang', label: 'Sengkang'},
    {value: 'Serangoon', label: 'Serangoon'},
    {value: 'Tampines', label: 'Tampines'},
    {value: 'Tengah', label: 'Tengah'},
    {value: 'Toa Payoh', label: 'Toa Payoh'},
    {value: 'Woodlands', label: 'Woodlands'},
    {value: 'Yishun', label: 'Yishun'},
];

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

  return (
    <div className="desired-property">
      <div className="top"></div>
      <div className="bottom">
        <div className="header-section">
          <h2 className="header">Desired Property</h2>
        </div>
        <div className="dropdown-div">
          <h3 className="location">Location</h3>
            <Dropdown 
              options={locations}
              selectedOption={selectedLocation}
              onSelect={setLocation}
            />
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
              />
            </div>
            <div className="amenities-2">
              <Dropdown
                options={amenities}
                selectedOption={selectedAmenities2}
                onSelect={setAmenities2}
              />
            </div>
            <div className="amenities-3">
              <Dropdown
                options={amenities}
                selectedOption={selectedAmenities3}
                onSelect={setAmenities3}
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
        {!isVisible && (
          <div>
            <button onClick={toggleVisibility} className="generate-price">Generate Price</button>
          </div>
        )}
        {isVisible && (
          <div className="after-click">
            <div className="generated-price-div">
              <p className="generated-price-header">Estimated Price</p>
              <div className="estimated-price-div">
                <p className="estimated-price">~$100k</p>
              </div>
            </div>
            <div className="buttons">
              <div>
                <button className="reconfigure">Reconfigure</button>
              </div>
              <div>
                <button className="confirm">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}

export default DesiredProperty;
