import "./ListingPanel.css";
import emptyimage from "../assets/images/emptyimage.png";
import { Link, Route, Routes } from "react-router-dom";
// import ListingInfo from "./ListingInfo";

export const ListingPanel = ({ indivData, component, displayList }) => {
  function handleCheckbox(e) {
    // console.log(e.target.value);
    indivData.checkbox = !indivData.checkbox;
    console.log(indivData.checkbox);

    let checkCounter = 0;
    displayList.forEach((property) => {
      property.checkbox === true ? (checkCounter += 1) : null;
    });
    console.log(checkCounter);

    if (checkCounter > 2) {
      alert("Cannot select more than 2 properties to compare!");
      // indivData.checkbox = !indivData.checkbox;
      // displayList.forEach((property) => {
      //   property.id === indivData.id
      //     ? (property.checkbox = indivData.checkbox)
      //     : null;
      // });
    } else {
      displayList.forEach((property) => {
        property.id === indivData.id
          ? (property.checkbox = indivData.checkbox)
          : null;
      });
      console.log(displayList);
    }
  }

  function handleCompare() {}

  return (
    <>
      <div className="listingPanel">
        <div className="panelWrapper">
          {/* <Link to="/listing-info/:id" style={{ textDecoration: "none" }}> */}
          <div className="listingPanelImage">
            {indivData.imageURL === null ? (
              <img src={emptyimage}></img>
            ) : (
              <img
                src={indivData.imageURL}
                style={{ width: "250px", height: "200px" }}
              ></img>
            )}
            {/* <img src={emptyimage}></img> */}
          </div>
          <Link
            to={`/listing-details/${indivData.id}`}
            style={{ textDecoration: "none" }}
          >
            {/* <h3>{title}</h3> */}
            <h3>{indivData.projectName}</h3>
            <h3>{indivData.address}</h3>
            <h3>{indivData.districtGroup}</h3>
            <h3>${indivData.price}</h3>
          </Link>
          {/* <h3>{id}</h3> */}
          {/*<span className="percentageBubble">
            Percentage Match:{" "}
            {percentageMatch === undefined
              ? "Search to find out"
              : percentageMatch + "%"}
            </span>*/}
          {component === "currentListings" ? (
            <span
              className={`percentageBubble ${
                indivData.percentageMatch !== undefined ? "greenBubble" : ""
              }`}
            >
              <div className="value">
                {indivData.percentageMatch !== undefined &&
                  Math.round(indivData.percentageMatch) + "%"}
              </div>
              <div className="match">
                {indivData.percentageMatch !== undefined && "match"}
              </div>
            </span>
          ) : component === "favourites" ? (
            <input
              type="checkbox"
              value={indivData.checkbox}
              onChange={(e) => handleCheckbox(e)}
            ></input>
          ) : null}
          {/* <span
            className={`percentageBubble ${
              indivData.percentageMatch !== undefined ? "greenBubble" : ""
            }`}
          >
            <div className="value">
              {indivData.percentageMatch !== undefined &&
                Math.round(indivData.percentageMatch) + "%"}
            </div>
            <div className="match">
              {indivData.percentageMatch !== undefined && "match"}
            </div>
          </span> */}
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};
