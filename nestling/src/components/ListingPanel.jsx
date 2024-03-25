import "./ListingPanel.css";
import emptyimage from '../assets/images/emptyimage.png';

export const ListingPanel = ({ title, price, percentageMatch }) => {
  return (
    <>
      <div className="listingPanel">
        <div className='listingPanelimage'>
        <img src={emptyimage}></img>
        </div>
        <h3>{title}</h3>
        <h3>${price}</h3>
        <span className="percentageBubble">
          Percentage Match:{" "}
          {percentageMatch === undefined
            ? "Search to find out"
            : percentageMatch + "%"}
        </span>
      </div>
    </>
  );
};
