import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  // State to store JSON data
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Read the JSON file asynchronously
    fetch('/aioutput.json')
      .then(response => response.json())
      .then(data => {
        // Set state with the JSON data
        setUserData(data);
      })
      .catch(error => {
        console.error('Error reading JSON file:', error);
      });
  }, []); // Run effect only once on component mount

  // Render user inputs with populated data
  return (
    <div>
      {userData && (
        <form>
          <label>Name:</label>
          <input type="text" value={userData.name} readOnly />

          <label>Email:</label>
          <input type="email" value={userData.email} readOnly />

          <label>Age:</label>
          <input type="number" value={userData.age} readOnly />

          <label>Gender:</label>
          <input type="text" value={userData.gender} readOnly />
        </form>
      )}
    </div>
  );
};

export default MyComponent;
