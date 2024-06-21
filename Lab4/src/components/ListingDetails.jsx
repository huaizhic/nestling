import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListingDetails.css';
import { Navbar } from './Navbar.jsx';
import emptyimage from '../assets/images/emptyimage.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabase';
import { percentageMatchLogic } from './percentageMatchLogic';
import axios from 'axios';
import whitecross from '../../src/assets/images/whitecross.png';

function ListingDetails({
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
  const navigate = useNavigate();
  const [listing, setListing] = useState([
    {
      projectName: 'loading',
      address: 'loading',
    },
  ]);
  const [percentageMatch, setPercentageMatch] = useState('');
  const [desiredListing, setDesiredListing] = useState([
    {
      projectName: 'loading',
      address: 'loading',
    },
  ]);

  useEffect(() => {
    const fetchIndivListing = async () => {
      //   console.log(id);
      // fetch individual property details
      let { data: currentListing, error } = await supabase
        .from('currentList')
        .select('*')
        .eq('id', id);

      console.log(currentListing);
      //   console.log(error);
      setListing(currentListing[0]);

      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();

      // //   console.log(user);
      // //   console.log(user.email);

      // let { data: data1, error: error1 } = await supabase
      //   .from("userInfo")
      //   .select("desiredProperty")
      //   .eq("email", user.email);
      // //   console.log(data1);
      // let desiredProperty = data1[0].desiredProperty[0];
      // //   console.log(percentageMatch);
      // console.log(desiredProperty);
      // setDesiredListing(desiredProperty);

      if (percentageMatch === 0) {
        // let tempData = percentageMatchLogic(
        //   currentListing,
        //   desiredProperty.location,
        //   desiredProperty.roomCount,
        //   desiredProperty.distanceRadius,
        //   desiredProperty.amenity1,
        //   desiredProperty.amenity2,
        //   desiredProperty.amenity3,
        //   desiredProperty.grossFloorArea
        // );

        let tempData = percentageMatchLogic(
          currentListing,
          locationInput,
          roomCountInput,
          distanceRadius,
          amenityInput1,
          amenityInput2,
          amenityInput3,
          grossFloorArea,
          housePrice
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

  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  //add this for the forntend to fetch from the API
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/python');
    //console.log(response.data.Suggestion);
    setArray(response.data.Suggestion);
  };

  const handleCompare = async () => {
    await fetchAPI();
    history.push(`/compare/${id}`);
  };

  if (percentageMatch === '') {
    let tempData = percentageMatchLogic(
      [listing],
      locationInput,
      roomCountInput,
      distanceRadius,
      amenityInput1,
      amenityInput2,
      amenityInput3,
      grossFloorArea,
      housePrice
    );
    console.log(tempData[0].percentageMatch);
    setPercentageMatch(tempData[0].percentageMatch);
  }

  async function handleSave(e) {
    e.preventDefault();
    // alert("works");

    alert('Property Saved! View them in favourites');
  }

  return (
    <div className="listing-details">
      <Navbar />
      <div className="infoContainer">
        <div className="imgColumn">
          {listing.imageURL === null ? (
            <img src={emptyimage} style={{ width: '95%', height: '80%' }}></img>
          ) : (
            <img
              src={listing.imageURL}
              style={{ width: '95%', height: '80%' }}
            ></img>
          )}
          <h3 className="imgprojectname">{listing.projectName}</h3>
          <h3 className="imgaddress">{listing.address}</h3>
        </div>
        <div className="save-button-listing-details">
          <button onClick={(e) => handleSave(e)}>
            <img src={whitecross} />
          </button>
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
          <div className="field">
            <h3>Price</h3>
            <span id="featuresField"></span>
          </div>
          <h3 className="data">{listing.price}</h3>
        </div>
      </div>
      <div className="percentage-match-bubble">
        {Math.round(parseFloat(percentageMatch))}%
      </div>
      <div className="compareButton">
        <button
          onClick={() => {
            navigate(`/compare/${id}`);
          }}
        >
          Compare
        </button>
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
