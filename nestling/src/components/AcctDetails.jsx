import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AcctDetails.css";
import walterlogo from "../../src/assets/images/walterlogo.png";
import greenwalter from "../../src/assets/images/greenwalter.png";
import supabase from "../supabase";

function AcctDetails() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [fetchDetail, setFetchDetail] = useState(false);

  useEffect(() => {
    // Fetch account information from the database and set the state variables
    // Example fetch code (replace with actual fetch logic):
    // fetch('api/account')
    //   .then(response => response.json())
    //   .then(data => {
    //     setUsername(data.username);
    //     setEmail(data.email);
    //     setPassword(data.password);
    //   })
    //   .catch(error => console.error('Error fetching account info:', error));
    const fetchUser = async () => {
      if (email === "") {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setEmail(user.email);
        // console.log(user);

        const { data: userInfo, error } = await supabase
          .from("userInfo")
          .select()
          .eq("email", user.email);

        setUsername(userInfo[0].username);
        setNumber(userInfo[0].number);
        // console.log(userInfo);
      }
    };
    fetchUser();
  }, [fetchDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { data, error } = await supabase.from("userInfo").upsert({
    //   email: email,
    //   username: username,
    //   number: number,
    // });

    // const { data: emailChange, error: emailError } =
    //   await supabase.auth.updateUser({
    //     email: email,
    //     // password: "new-password",
    //     // data: { hello: "world" },
    //   });

    // console.log(emailChange);
    // console.log(emailError);

    const { data, error } = await supabase
      .from("userInfo")
      .update({
        username: username,
        number: number,
      })
      .eq("email", email);

    if (error === null) {
      alert("Profile change successful!");
    }

    console.log(data);
    console.log(error);
  };

  // if (email === "") {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   // console.log(user);
  //   setEmail(user.email);
  // }

  return (
    <div className="acct-details">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="logo">
          <img src={walterlogo} alt="Walter Logo" />
        </div>
        <div className="user-info">
          <div className="profile-pic">
            <img src={greenwalter} alt="Green Walter Profile" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Number</label>
            <input
              type="text"
              id="password"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="links-wrapper">
            <div className="link-wrapper-1">
              <Link to="/reset-password">Change Password Instead</Link>
            </div>
          </div>
        </div>
        <div className="button">
          <button>Confirm username/number</button>
        </div>
      </form>
    </div>
  );
}

export default AcctDetails;
