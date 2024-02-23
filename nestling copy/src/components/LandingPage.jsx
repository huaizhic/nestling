import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="landing-page">
            <div><h1>nestling.ai</h1></div>
            <div><h2>Unlock the door to your future with a simple click.</h2></div>
            <div><Link to="/login"><button>Log In</button></Link></div>
            <div><button onClick={() => alert('Button clicked!')}>Log In</button></div>
            <div><button onClick={() => alert('Button clicked!')}>Sign Up</button></div>
        </div>
    );
  }

export default LandingPage;