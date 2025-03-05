import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Fetching user data...</p>
    </div>
  );
};

export default Loader;