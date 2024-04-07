import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Favourites.css";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import "./Navbar.css";
import { ListingPanel } from "./ListingPanel";
//import { Capsule } from "./Capsule";
import supabase from "../supabase";

// export let tempDisplayList = [];

export default function Favourites({
  selection,
  setSelection,
  rerenderCompareFav,
  setRerenderCompareFav,
}) {
  const [favIDList, setFavIDList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  let component = "favourites";

  useEffect(() => {
    async function fetchFav() {
      let { data: currentList, error } = await supabase
        .from("currentList")
        .select("*");

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const { data: userFavData, error: desiredError } = await supabase
        .from("userInfo")
        .select("savedProperties")
        .eq("email", userData.user.email);

      console.log("fav properties:", userFavData[0].savedProperties);
      let temp = userFavData[0].savedProperties;
      setFavIDList(temp);
      console.log(currentList);

      let tempDisplayList = [];
      temp.forEach((obj) => {
        currentList.forEach((property) => {
          parseInt(obj.id) === property.id
            ? tempDisplayList.push(property)
            : null;
        });
      });

      console.log("tempDisplayList:", tempDisplayList);
      setDisplayList(tempDisplayList);
    }
    fetchFav();
  }, []);

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    let finalList = [];
    displayList.forEach((property) => {
      property.checkbox === true ? finalList.push(property) : null;
    });
    // console.log(finalList);
    console.log(finalList);
    if (finalList.length !== 2) {
      alert("Please select exactly 2 properties to compare!");
    } else if (finalList.length === 2) {
      setSelection(finalList);
      navigate("/compare-fav"); // Navigate to '/other-route' on button click
      setRerenderCompareFav(!rerenderCompareFav);
    }
  }

  if (displayList.length === 0) {
    // setFetchFlag(!fetchflag);
    return (
      <>
        <h1>Fetching data...</h1>
        <br></br>
        <h3>
          If you have not added any favourites yet, please add some before
          coming here!
        </h3>
      </>
    );
  }

  return (
    <div className="favourites">
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
      <div>
        <div className="header">Favourites</div>
        <div className="the-rest">
          {displayList.map((property) => {
            return (
              <ListingPanel
                indivData={property}
                component={component}
                displayList={displayList}
              />
            );
          })}
        </div>
      </div>
      <div>
        <button className="button-div" onClick={(e) => handleSubmit(e)}>
          compare
        </button>
      </div>
    </div>
  );
}
