import React from 'react';
import { Link } from 'react-router-dom';
import walter from '../../src/assets/images/walter.png';
import interiordesign from '../../src/assets/images/interiordesign.png';
import './LandingPage.css'; // Import the CSS file for styling

function LandingPage() {
    return (
        <div className="landing-page" style={{backgroundImage: `url(${interiordesign})`}}>
            <div><img src={walter} alt="Walter" /></div>
            <div><h1>nestling.ai</h1></div>
            <div><h2>Unlock the door to your future with a simple click.</h2></div>
            <div className="button-container">
                <Link to="/login"><button>Login</button></Link>
                <Link to="/sign-up"><button>Signup</button></Link>
            </div>
        </div>
    );
}

export default LandingPage;

