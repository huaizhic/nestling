import "./desiredHouseForm.css";
import { percentageMatchLogic } from "./percentageMatchLogic";
import { useState, useEffect } from "react";
import { sampleHousesData } from "../sampleHousesData";

export const kilometreRadius = [4, 3, 2, 1, 0];
export const noOfRooms = [5, 4, 3, 2, 1];
export const amenities = ["school", "supermarket", "park", "mrt"];
export let tempData = [];

function desiredHouseForm() {
  const [housesData, setHousesData] = useState([]);
  const [location, setLocation] = useState("tampines");
  const [roomCount, setRoomCount] = useState(4);
  const [distance, setDistance] = useState(1);
  const [firstAmenityChoice, setFirstAmenityChoice] = useState("school");
  const [secondAmenityChoice, setSecondAmenityChoice] = useState("supermarket");
  const [thirdAmenityChoice, setThirdAmenityChoice] = useState("park");
  const [floorArea, setFloorArea] = useState(1500);
  const [rerenderHousesData, triggerRerenderHousesData] = useState(false);

  // if (tempData === undefined) {
  //   let tempData = [];  // cannot do this as it will run infinitely, causing tempData array to always be empty
  // }

  // handle percentageMatch re-rendering upon clicking submit button
  useEffect(() => {
    tempData.length === 0
      ? setHousesData(sampleHousesData)
      : setHousesData(tempData);

    // console.log(tempData.length);
    // console.log(tempData);
  }, [rerenderHousesData]);

  function handleSubmit(e) {
    e.preventDefault();
    tempData = percentageMatchLogic(
      location,
      roomCount,
      distance,
      firstAmenityChoice,
      secondAmenityChoice,
      thirdAmenityChoice,
      floorArea
    );

    // console.log("tempData:", tempData);
    // console.log("tempData.length:", tempData.length); // 2

    // setHousesData(tempData);
    triggerRerenderHousesData(!rerenderHousesData);
    // console.log(sampleHousesData);
  }

  return (
    <>
      <div className="main">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <h2>Select your ideal house</h2>
          <h3>Location</h3>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <h3>Amenities</h3>
          km radius:
          <select
            value={distance}
            type="number"
            onChange={(e) => {
              setDistance(e.target.value);
              // console.log(kilometreRadius[2] + kilometreRadius[2]);
            }}
          >
            <option value="default"></option>
            {kilometreRadius.map((number) => (
              <option type="number" value={number}>
                {number}
              </option>
            ))}
            {/* <option>2</option>
          <option>1</option> */}
          </select>
          <br></br>
          first
          <select
            value={firstAmenityChoice}
            onChange={(e) => setFirstAmenityChoice(e.target.value)}
          >
            <option value="default"></option>
            {amenities.map((amenity) => (
              <option value={amenity}>{amenity}</option>
            ))}
          </select>
          second
          <select
            value={secondAmenityChoice}
            onChange={(e) => setSecondAmenityChoice(e.target.value)}
          >
            <option value="default"></option>
            {amenities.map((amenity) => (
              <option value={amenity}>{amenity}</option>
            ))}
          </select>
          third
          <select
            value={thirdAmenityChoice}
            onChange={(e) => setThirdAmenityChoice(e.target.value)}
          >
            <option value="default"></option>
            {amenities.map((amenity) => (
              <option value={amenity}>{amenity}</option>
            ))}
          </select>
          <h3>Room count</h3>
          <select
            value={roomCount}
            onChange={(e) => setRoomCount(e.target.value)}
          >
            <option></option>
            {noOfRooms.map((number) => (
              <option>{number}</option>
            ))}
            {/* <option>2</option>
          <option>1</option> */}
          </select>
          <h3>Gross Floor Area</h3>
          <input
            placeholder="in sq metres"
            type="number"
            value={floorArea}
            onChange={(e) => setFloorArea(e.target.valueAsNumber)}
          ></input>
          <br></br>
          <br></br>
          <br></br>
          <button>Submit for percentage match</button>
        </form>
        <div className="housesList">
          {housesData.map((house) => {
            return (
              <div className="indivHouseListing">
                <h2 className="location">Location: {house.location}</h2>
                <h3 className="percentageMatchText">
                  Percentage Match:{" "}
                  {house.percentageMatch === undefined
                    ? "Not calculated yet"
                    : house.percentageMatch + "%"}
                </h3>
                <h3 className="amenities">
                  Amenities:
                  {house.amenities.map((amenity) => {
                    return (
                      <>
                        <h4>Amenity type:{amenity.type}</h4>
                        <h4>Amenity distance:{amenity.distance} km </h4>
                      </>
                    );
                  })}
                </h3>
                <h3 className="roomCount">Room count: {house.roomCount}</h3>
                <h3 className="floorSpace">
                  Floor Space: {house.grossFloorArea} sq metres
                </h3>

                {/* <h3></h3> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default desiredHouseForm;
