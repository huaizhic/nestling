import "./ListingPanel.css";
import emptyimage from "../assets/images/emptyimage.png";
import { Link, Route, Routes } from "react-router-dom";
import ListingInfo from "./ListingInfo";

export const ListingPanel = ({ title, price, percentageMatch, id }) => {
  return (
    <>
      <div className="listingPanel">
        <div className="panelWrapper">
          {/* <Link to="/listing-info/:id" style={{ textDecoration: "none" }}> */}
          <div className="listingPanelImage">
            <img src={emptyimage}></img>
          </div>
          <Link to={`/listing-info/${id}`}>
            <h3>{title}</h3>
          </Link>
          <h3>${price}</h3>
          {/* <h3>{id}</h3> */}
          {/*<span className="percentageBubble">
            Percentage Match:{" "}
            {percentageMatch === undefined
              ? "Search to find out"
              : percentageMatch + "%"}
            </span>*/}
          <span
            className={`percentageBubble ${
              percentageMatch !== undefined ? "greenBubble" : ""
            }`}
          >
            <div className="value">
              {percentageMatch !== undefined &&
                Math.round(percentageMatch) + "%"}
            </div>
            <div className="match">
              {percentageMatch !== undefined && "match"}
            </div>
          </span>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};
