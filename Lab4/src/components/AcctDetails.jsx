import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AcctDetails.css';
import walterlogo from '../../src/assets/images/walterlogo.png';
import greenwalter from '../../src/assets/images/greenwalter.png';
import supabase from '../supabase';

function AcctDetails() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [fetchDetail, setFetchDetail] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (email === '') {
        // const {
        //   data: { user },
        // } = await supabase.auth.getUser();
        setEmail('hello@gmail.com');
        // console.log(user);

        const { data: userInfo, error } = await supabase
          .from('userInfo')
          .select()
          .eq('email', 'hello@gmail.com');

        setUsername(userInfo[0].username);
        setNumber(userInfo[0].number);
        // console.log(userInfo);
      }
    };
    fetchUser();
  }, [fetchDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert('Profile change successful!');
  };

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
          <p>
            For demo purposes, clicking the button will work irregardless of
            credentials provided.
          </p>
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
              <button>
                <Link to="/reset-password">Change Password Instead</Link>
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="button">
          <button>Confirm username/number</button>
        </div>
      </form>
    </div>
  );
}

export default AcctDetails;
