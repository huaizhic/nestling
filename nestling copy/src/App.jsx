import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;