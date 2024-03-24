import "./ListingPanel.css";

export const ListingPanel = ({ title, price }) => {
  return (
    <>
      <div className="listingPanel">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
          width="50%"
          height="70%"
        ></img>
        <h3>{title}</h3>
        <h3>{price}</h3>
      </div>
    </>
  );
};
