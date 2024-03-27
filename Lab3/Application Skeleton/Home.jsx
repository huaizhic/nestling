import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import star from '../../src/assets/images/star-icon.png'; 

function Home () {
    return (
        <div className="home">
            <div className="navbar">
                <p>navbar</p>
            </div>

            <div className="bottom">
                <div className="blog">
                    <div className="header">
                        <h2 className="header-text">What's Chirping!</h2>
                    </div>

                    <div className="article-reg">
                        <div className="star">
                            <img src={star} alt="Star icon" />
                        </div>
                        <div className ="article-content">
                            <div>
                                <Link to="/article" className="article-header">is the price truly right?</Link>
                            </div>
                            <div>
                                <p className="article-content">read testimonials from previous clients on how they could find their dream home with just a simple search! and that too, for a reasonable price. read testimonials from previous clients on how they could find their dream home with just a simple search!</p>
                            </div>
                        </div>
                    </div>

                    <div className="article-reg">
                        <div className="star">
                            <img src="../../src/assets/image/star-icon.png" alt="Star icon" />
                        </div>
                        <div className ="article-content">
                            <div>
                                <Link to="/article" className="article-header">is the price truly right?</Link>
                            </div>
                            <div>
                                <p className="article-content">read testimonials from previous clients on how they could find their dream home with just a simple search! and that too, for a reasonable price. read testimonials from previous clients on how they could find their dream home with just a simple search!</p>
                            </div>
                        </div>
                    </div>

                    <div className="article-reg">
                        <div className="star">
                            <img src="../../src/assets/image/star-icon.png" alt="Star icon" />
                        </div>
                        <div className ="article-content">
                            <div>
                                <Link to="/article" className="article-header">is the price truly right?</Link>
                            </div>
                            <div>
                                <p className="article-content">read testimonials from previous clients on how they could find their dream home with just a simple search! and that too, for a reasonable price. read testimonials from previous clients on how they could find their dream home with just a simple search!</p>
                            </div>
                        </div>
                    </div>

                    <div className="article-small">
                        <div className="star">
                            <img src="../../src/assets/image/star-icon.png" alt="Star icon" />
                        </div>
                        <div className ="article-content">
                            <div>
                                <Link to="/article" className="article-header">is the price truly right?</Link>
                            </div>
                            <div>
                                <p className="article-content">read testimonials from previous clients on how they could find their dream home with just a simple search!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-us">
                    <div className="header">
                        <h2 className="header-text">About us!</h2>
                    </div>
                    <div>
                        <p className="about-us-content">At Nestling, we believe in empowering individuals with the knowledge to make informed decisions about one of life's most significant investments – a home. Our platform specialises in extrapolating private housing prices and conducting meticulous comparisons to houses currently on the market.  Whether you are a prospective buyer, seller, or simply a curious observer, our commitment is to deliver accurate, up-to-date information to guide you on your journey through the world of real estate. Join us as we transform the way you perceive, assess, and navigate the housing market, making your homeownership dreams a well-informed reality. Welcome to Nestling – Where Homes and Insights Unite. At Nestling, we believe in empowering individuals with the knowledge to make informed decisions about one of life's most significant investments – a home. Our platform specialises in extrapolating private housing prices and conducting meticulous comparisons to houses currently on the market.  Whether you are a prospective buyer, seller, or simply a curious observer, our commitment is to deliver accurate, up-to-date information to guide you on your journey through the world of real estate. Join us as we transform the way you perceive, assess, and navigate the housing market, making your homeownership dreams a well-informed reality. Welcome to Nestling – Where Homes and Insights Unite.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;