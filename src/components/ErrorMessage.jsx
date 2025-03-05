import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <h3>Error</h3>
      <p>{message || 'An error occurred while fetching data.'}</p>
    </div>
  );
};

export default ErrorMessage;