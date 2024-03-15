import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
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
  );
}

export default Homepage;
