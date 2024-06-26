import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Favourites.css";
import {Navbar} from './Navbar.jsx';
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
      <Navbar />
      <div>
        <div className="header-f">Favourites</div>
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
