import React from 'react';
import'./DesiredProperty.css';

const Dropdown = ({ options, selectedOption, onSelect }) => {
    return (
    <div className ="dropdown-big">
        <select className="dropdown"
            value={selectedOption}
            onChange={(e) => onSelect(e.target.value)}
        >
            <option value="">Select an option</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
    );
};

export default Dropdown;