import React, { useState, useEffect } from 'react';
import './DesiredProperty.css';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown.jsx';
import supabase from '../supabase';
import { Navbar } from './Navbar';
import axios from 'axios'; // For the python environment

export let desiredAttributes = [
  {
    location: '',
    amenity1: '',
    amenity2: '',
    amenity3: '',
    distanceRadius: '',
    roomCount: '',
    grossFloorArea: '',
  },
];

function DesiredProperty() {
  const [currentList, setCurrentList] = useState([]);
  const [selectedLocation, setLocation] = useState('');
  const [selectedDistance, setDistance] = useState('');
  const [selectedRoomCount, setRoomCount] = useState('');
  const [selectedGFA, setGFA] = useState('');
  const [selectedAmenities1, setAmenities1] = useState('');
  const [selectedAmenities2, setAmenities2] = useState('');
  const [selectedAmenities3, setAmenities3] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [abhijeetData, setAbhijeetData] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase.from('currentList').select('*');
  //     if (error) {
  //       console.error('Error fetching data:', error.message);
  //     } else {
  //       setCurrentList(data);
  //       // console.log(data);
  //     }

  //     const { data: userData, error: userError } =
  //       await supabase.auth.getUser();
  //     if (userError) {
  //       console.error('Error fetching user data:', userError.message);
  //     } else {
  //       // console.log(userData);
  //       const { data: userDesiredData, error: desiredError } = await supabase
  //         .from('userInfo')
  //         .select('desiredProperty')
  //         .eq('email', userData.user.email);

  //       // console.log(userDesiredData);

  //       if (desiredError) {
  //         console.error(
  //           'Error fetching desired property data:',
  //           desiredError.message
  //         );
  //       } else {
  //         // console.log(userDesiredData);
  //         // console.log(userDesiredData[0]?.desiredProperty[0]);

  //         // const fetchedDesiredAttributes =
  //         //   userDesiredData[0]?.desiredProperty[0];
  //         // console.log(fetchedDesiredAttributes);

  //         if (userDesiredData[0].desiredProperty === null) {
  //           // setLocation("Bedok");
  //           // setAmenities1("primary school");
  //           // setAmenities2("park");
  //           // setAmenities3("supermarket");
  //           // setDistance("3");
  //           // setRoomCount("3");
  //           // setGFA("2000");
  //           // setEstimatedPrice(10000);
  //           setLocation('');
  //           setAmenities1('');
  //           setAmenities2('');
  //           setAmenities3('');
  //           setDistance('');
  //           setRoomCount('');
  //           setGFA('');
  //           setEstimatedPrice('0');
  //         } else {
  //           const fetchedDesiredAttributes =
  //             userDesiredData[0]?.desiredProperty[0];

  //           if (fetchedDesiredAttributes) {
  //             setLocation(fetchedDesiredAttributes.location || '');
  //             setAmenities1(fetchedDesiredAttributes.amenity1 || '');
  //             setAmenities2(fetchedDesiredAttributes.amenity2 || '');
  //             setAmenities3(fetchedDesiredAttributes.amenity3 || '');
  //             setDistance(fetchedDesiredAttributes.distanceRadius || '');
  //             setRoomCount(fetchedDesiredAttributes.roomCount || '');
  //             setGFA(fetchedDesiredAttributes.grossFloorArea || '');
  //           }
  //         }
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  //   let temp = [
  //     {
  //       distanceRadius: selectedDistance,
  //       grossFloorArea: selectedGFA,
  //     },
  //   ];
  //   setAbhijeetData(temp);
  //   console.log("abhijeetData:", temp);
  // };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    alert('(Demo) Update success!');
  };

  //for dropdown boxes: amenities, room count, distance and location
  const locations = [
    { value: 'Ang Mo Kio', label: 'Ang Mo Kio' },
    { value: 'Bedok', label: 'Bedok' },
    { value: 'Bishan', label: 'Bishan' },
    { value: 'Bukit Batok', label: 'Bukit Batok' },
    { value: 'Bukit Merah', label: 'Bukit Merah' },
    { value: 'Bukit Panjang', label: 'Bukit Panjang' },
    { value: 'Choa Chu Kang', label: 'Choa Chu Kang' },
    { value: 'Clementi', label: 'Clementi' },
    { value: 'Geylang', label: 'Geylang' },
    { value: 'Hougang', label: 'Hougang' },
    { value: 'Jurong East', label: 'Jurong East' },
    { value: 'Jurong West', label: 'Jurong West' },
    { value: 'Kallang/Whampoa', label: 'Kallang/Whampoa' },
    { value: 'Pasir Ris', label: 'Pasir Ris' },
    { value: 'Punggol', label: 'Punggol' },
    { value: 'Queenstown', label: 'Queenstown' },
    { value: 'Sembawang', label: 'Sembawang' },
    { value: 'Sengkang', label: 'Sengkang' },
    { value: 'Serangoon', label: 'Serangoon' },
    { value: 'Tampines', label: 'Tampines' },
    { value: 'Tengah', label: 'Tengah' },
    { value: 'Toa Payoh', label: 'Toa Payoh' },
    { value: 'Woodlands', label: 'Woodlands' },
    { value: 'Yishun', label: 'Yishun' },
  ];

  // const distance = [
  //   { value: "0-1km", label: "0-1km" },
  //   { value: "1-2km", label: "1-2km" },
  //   { value: "2-3km", label: "2-3km" },
  //   { value: "3-4km", label: "3-4km" },
  //   { value: "4-5km", label: "4-5km" },
  //   { value: "5-6km", label: "5-6km" },
  //   { value: "6-7km", label: "6-7km" },
  // ];

  const distance = [
    { value: '1', label: '< 1' },
    { value: '2', label: '< 2' },
    { value: '3', label: '< 3' },
    { value: '4', label: '< 4' },
    { value: '5', label: '< 5' },
  ];

  const roomcount = [
    { value: '3', label: '3 rooms' },
    { value: '4', label: '4 rooms' },
    { value: '5', label: '5 rooms' },
    // { value: ">5 rooms", label: ">5 rooms" },
  ];

  const amenities = [
    { value: 'station', label: 'MRT Stations' },
    { value: 'supermarket', label: 'Supermarkets' },
    { value: 'primary school', label: 'Primary schools' },
    { value: 'secondary school', label: 'Secondary schools' },
    { value: 'park', label: 'Parks' },
    { value: 'mall', label: 'Malls' },
  ];

  const handleSubmit = async () => {
    if (
      selectedAmenities1 === selectedAmenities2 ||
      selectedAmenities1 === selectedAmenities3 ||
      selectedAmenities2 === selectedAmenities3
    ) {
      alert('Cannot have same amenity choices!');
    } else {
      try {
        // const response = await axios.post(
        //   "http://localhost:8000/generate_price",
        //   {
        //     // Send user input to the backend
        //     amenities1: selectedAmenities1,
        //     amenities2: selectedAmenities2,
        //     amenities3: selectedAmenities3,
        //     distanceRadius: selectedDistance,
        //     area: selectedGFA,
        //   }
        // );

        // Update state with the estimated price returned by the backend
        setEstimatedPrice('1300000');

        // Toggle visibility after receiving response
        toggleVisibility();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSubmit2 = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/generate_price',
        {
          // Send user input to the backend
          amenities1: selectedAmenities1,
          amenities2: selectedAmenities2,
          amenities3: selectedAmenities3,
          distanceRadius: selectedDistance,
          area: selectedGFA,
        }
      );

      // Update state with the estimated price returned by the backend
      setEstimatedPrice(response.data.estimated_price);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect(() => {
  //   handleAmenities();
  // }, [selectedAmenities1, selectedAmenities2, selectedAmenities3]);

  return (
    <div className="desired-property">
      <Navbar />

      {/*<div className="bottom">*/}
      <div className="header-section">
        <div className="header-d">Desired Property</div>
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
        <h3 className="distance">Distance (km)</h3>
        <Dropdown
          options={distance}
          selectedOption={selectedDistance}
          onSelect={setDistance}
        />
      </div>

      <div className="dropdown-div">
        <h3 className="room-count">Room Count</h3>
        <Dropdown
          options={roomcount}
          selectedOption={selectedRoomCount}
          onSelect={setRoomCount}
        />
      </div>

      <div className="dropdown-div">
        <h3 className="gfa">GFA</h3>
        <input
          type="number"
          value={selectedGFA}
          className="dropdown"
          onChange={(e) => setGFA(e.target.value)}
        />
      </div>
      {/*</div>*/}

      {!isVisible && (
        <div>
          <button
            onClick={() => {
              handleSubmit();
              toggleVisibility;
            }}
            className="generate-price"
          >
            Generate Price
          </button>
        </div>
      )}
      {isVisible && (
        <div className="after-click">
          <div className="generated-price-div">
            <p className="generated-price-header">Estimated Price</p>
            <div className="estimated-price-div">
              <p className="estimated-price">~${estimatedPrice}</p>
            </div>
          </div>
          <div className="buttons">
            <div>
              <button onClick={handleSubmit2} className="reconfigure">
                Re-generate
              </button>
            </div>
            <div>
              <button onClick={handleSave} className="confirm">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesiredProperty;
