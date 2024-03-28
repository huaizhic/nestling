import React, { useState } from "react";
import "./SignUp.css";
import walter from "../assets/images/walter.png";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., validate inputs, submit data to server)
    // console.log('Username:', username);
    // console.log('Phone Number:', phoneNumber);
    // console.log('Email:', email);
    // console.log('Password:', password);

    let { data: signupInfo, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(signupInfo);
    console.log(error);

    if (signupInfo.user.role === "authenticated") {
      const { data: userInfo, error } = await supabase
        .from("userInfo")
        .upsert({ username: username, number: phoneNumber, email: email })
        .select();

      alert("Sign Up Successful! You will be redirected to user home page");
      console.log("error:", error);
      console.log(userInfo);
      navigate("/homepage");
    } else {
      alert("sign up error");
    }
  };

  return (
    <div className="sign-up">
      <div>
        <img src={walter} alt="Walter" />
      </div>
      <h1>Nestling.ai</h1>
      <h2>New here?</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phoneNumber">Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Fly</button>
      </form>
    </div>
  );
}

export default SignUp;
