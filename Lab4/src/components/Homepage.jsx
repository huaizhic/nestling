import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      if (user === null) {
        alert("You have not logged in yet!");
        navigate("/");
      } else if (user.role === "authenticated") {
      } else {
        alert("error verifying login session");
        navigate("/");
      }

      // if (user.role === "authenticated") {
      //   console.log("test1");
      // } else {
      //   console.log("test2");
      //   navigate("/");
      // }
    };
    checkSession();
  }, []);

  async function handleLogout() {
    let { error } = await supabase.auth.signOut();
    alert("Logged out!");
    navigate("/");
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
            <Link to="/account-details">Account</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Homepage;
