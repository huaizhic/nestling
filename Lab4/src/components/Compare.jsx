import React from 'react';
import { Link } from 'react-router-dom';
import walterlogo from '../../src/assets/images/walterlogo.png';
import greenwalter from '../../src/assets/images/greenwalter.png';
import './Compare.css';
import './Navbar.css';
import emptyimage from '../assets/images/emptyimage.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabase';
import { percentageMatchLogic } from './percentageMatchLogic';
import { locations } from '../App';
import whitecross from '../../src/assets/images/whitecross.png';
import axios from 'axios';
import speaking_walter from '../../src/assets/images/speaking_walter.png';
import walter_loudhailer from '../../src/assets/images/walter_loudhailer.png';

export let tempJSON = '';

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
      projectName: 'loading',
      address: 'loading',
    },
  ]);
  const [percentageMatch, setPercentageMatch] = useState(0);
  const [desiredListing, setDesiredListing] = useState([
    {
      projectName: 'loading',
      address: 'loading',
    },
  ]);

  const [nicoleData, setNicoleData] = useState({
    from: 'compare',
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
  const [AIoutput, setAIoutput] = useState('');

  let withPythonFlag = false;

  useEffect(() => {
    const fetchIndivListing = async () => {
      //   console.log(id);
      // fetch individual property details
      let { data: currentListing, error } = await supabase
        .from('currentList')
        .select('*')
        .eq('id', id);

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

      console.log('tempData:', tempData);
      setNicoleData(tempData);
      tempJSON = JSON.stringify(tempData);
      console.log('tempJSON:', tempJSON);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      //   console.log(user);
      //   console.log(user.email);

      let { data: data1, error: error1 } = await supabase
        .from('userInfo')
        .select('desiredProperty')
        .eq('email', user.email);
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
    alert('Logged out!');
    navigate('/');
  }

  function withPython(tempJSON) {
    var xml = new XMLHttpRequest();
    xml.open('POST', 'http://localhost:8080/python', true);
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // receive python response
    xml.onload = function () {
      var dataReply = JSON.parse(this.responseText);
      alert('AI Output generated!');
      console.log('dataReply:', dataReply);
      setAIoutput(dataReply.Suggestion[0]);
      console.log('dataReply.Suggestion[0]:', dataReply.Suggestion[0]);
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
    const response = await axios.get('http://localhost:8080/python');
    //console.log(response.data.Suggestion);
    setArray(response.data.Suggestion);
  };

  function handleGenerate() {
    // console.log(tempJSON);
    // withPython(tempJSON);
    // fetchAPI();
    // setArray(dataReply);
    setAIoutput(
      "Property 1 offers a location in Tampines, with a room count of 4 and a gross floor area of 1324. It is within close proximity to Tampines West MRT Station (1.379991485 distance), PRIME SUPERMARKET LIMITED (0.867331326 distance), and DAMAI SECONDARY SCHOOL (1.220755183 distance). Property 2, on the other hand, is also located in Tampines but has a room count of 3 and a larger gross floor area of 1500. It is within a distance radius of 2 to schools, supermarkets, and parks. Considering common priorities like family-friendliness, accessibility, and lifestyle amenities, I'd recommend Property 1 for its closer proximity to amenities and Property 2 for its larger floor area and access to schools, supermarkets, and parks. In addition, Property 1 is located in the East region of Singapore while Property 2 is located in the North East region."
    );
    setShowButton(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    // alert("works");

    alert('Property Saved! View them in favourites');
  }

  const [showButton, setShowButton] = useState(true);
  return (
    <div className="compare-page">
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
        <div className="section-b">
          <div className="save-button">
            <button onClick={(e) => handleSave(e)}>
              <img src={whitecross} />
            </button>
          </div>
          <div className="search">Search Parameters</div>
          <div className="label" htmlFor="Location">
            Location
          </div>
          <div className="output">{locationInput}</div>
          <div className="label" htmlFor="Amenities">
            Amenities
          </div>
          <div className="amenities-section">
            <div className="output">{amenityInput1}</div>
            <div className="output">{amenityInput2}</div>
            <div className="output">{amenityInput3}</div>
          </div>
          <div className="label" htmlFor="Distance">
            Distance From Property To Amenities (KM)
          </div>
          <div className="output">{distanceRadius}</div>
          <div className="label-1" htmlFor="Room Count">
            Room Count
          </div>
          <div className="output">{roomCountInput}</div>
          <div className="label" htmlFor="GFA(gross floor area)">
            GFA (gross floor area)
          </div>
          <div className="output">{grossFloorArea} sqm</div>
          <div className="label" htmlFor="price">
            Price
          </div>
          <div className="output">{housePrice} </div>
        </div>
        <div className="section-a">
          <div className="project-name">{listing.projectName}</div>
          <div>
            <div className="header">Location</div>
            <div className="data-f">{listing.address}</div>
          </div>
          <div className="header">
            Amenities & Their Distances From Property
          </div>
          <div className="amenities-section">
            <div className="f-amenities">
              <div className="data-fkm">
                Nearest School: {listing.nearestSchool}
              </div>
              <div className="data-km">
                {parseFloat(listing.nearestSchoolDistance).toFixed(1)} km
              </div>
            </div>
            <div className="f-amenities">
              <div className="data-fkm">Nearest MRT: {listing.nearestMRT}</div>
              <div className="data-km">
                {parseFloat(listing.nearestMRTDistance).toFixed(1)} km
              </div>
            </div>
            <div className="f-amenities">
              <div className="data-fkm">
                Nearest Park: {listing.nearestPark}
              </div>
              <div className="data-km">
                {parseFloat(listing.nearestParkDistance).toFixed(1)} km
              </div>
            </div>
            <div className="f-amenities">
              <div className="data-fkm">
                Nearest Market: {listing.nearestMarket}
              </div>
              <div className="data-km">
                {parseFloat(listing.nearestMarketDistance).toFixed(1)} km
              </div>
            </div>
          </div>
          <div>
            <div className="header">Room Count</div>
            <h3 className="data-f">{listing.roomCount}</h3>
          </div>
          <div>
            <div className="header">GFA (gross floor area)</div>
            <div className="data-f">{listing.GFA} sqm</div>
          </div>
          <div>
            <div className="header">Price</div>
            <div className="data-f">{listing.price} </div>
          </div>
        </div>
      </div>
      <div className="prompt">
        Like this property? Click the + button to save it!
      </div>
      <div className="AI-output">
        <br></br>
        {/*<button onClick={() => handleGenerate()}>Generate AI Comparison</button>
        <p>{AIoutput}</p>*/}
        {showButton ? (
          <button onClick={handleGenerate}>Generate AI Comparison</button>
        ) : (
          <div>
            <div className="AI-output-text">
              <p>{AIoutput}</p>
            </div>
            <div className="speaking-walter-img">
              <img src={walter_loudhailer} alt="Speaking walter" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
