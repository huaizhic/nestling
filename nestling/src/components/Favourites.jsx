import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Favourites.css';
import { ListingPanel } from './ListingPanel';

export default function Favourites () {
    return(
        <div className = "favourites">
            <div className="top"></div>
            <div className="bottom">
                <div className="header">Favourites</div>
                <div className="the-rest">
                    <div className="listing-panel">
                        <ListingPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};