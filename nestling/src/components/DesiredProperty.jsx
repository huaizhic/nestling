import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DesiredProperty.css';

/*function DesiredProperty () {
    const [selectedValue, setSelectedValue] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleButtonClick = () => {
        setSelectedValue(userInput);
    };

    return(
        <div className="desired-property">
            <div className="top">
                <p>navbar</p>
            </div>

            <div className="bottom">
                <div className="header">
                    <h2 className="header-text">Desired Property</h2>
                </div>

                <div className="location">
                    <label htmlFor="dropdown-location">Location</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                </div>

                <div className="amenities">
                    <label htmlFor="dropdown">Amenities</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Amenities</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="distance">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Distance</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="room-count">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">Room count</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>

                <div className="gfa">
                <label htmlFor="dropdown">Choose an option:</label>
                        <select id="dropdown" value={selectedValue} onChange={handleChange}>
                            <option value="">GFA</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    {selectedValue && <p>{selectedValue}</p>}
                </div>
            </div>
        </div>
    );
}*/

function DesiredProperty() {
    const [selectedValues, setSelectedValues] = useState({
        dropdown:'',
    });

    const handleDropdownChange = (dropdownId, value) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [dropdownId]: value
        }));
    };

    return (
        <div>
            <Dropdown value={selectedValues.dropdown1} onChange={handleDropdownChange} />
        </div>
    );
}

function Dropdown({ id, value, onChange }) {
    const options = ["Option 1", "Option 2", "Option 3"];

    const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(id, selectedValue);
    };

    return (
        <div className="desired-property">
            <div className="top">
                <p>navbar</p>
            </div>

            <div className="header">
                <h2 className="header-text">Desired Property</h2>
            </div>

            <div className="bottom">
                <div className="location">
                    <label htmlFor={id} className="title">Location</label>
                    <select id={id} value={value} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="amenities">
                    <label htmlFor={id} className="title">Amenities</label>
                    <select id={id} value={value} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <select id={id} value={value} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <select id={id} value={value} onChange={handleChange}>
                        <option value="">Select an option</option>
                        {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="distance">
                    <label htmlFor={id} className="title">Distance</label>
                        <select id={id} value={value} onChange={handleChange}>
                            <option value="">Select an option</option>
                            {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                    </select>
                </div>

                <div className="room-count">
                    <label htmlFor={id} className="title">Room Count</label>
                        <select id={id} value={value} onChange={handleChange}>
                            <option value="">Select an option</option>
                            {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                    </select>
                </div>

                <div className="gfa">
                    <label htmlFor={id} className="title">GFA</label>
                        <select id={id} value={value} onChange={handleChange}>
                            <option value="">Select an option</option>
                            {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                            ))}
                    </select>
                </div>

                <div className="submit">
                    <button onClick={() => console.log('Button clicked')} className="button">Generate Price</button>
                </div>
            </div>
        </div>
    );
}

export default DesiredProperty;
