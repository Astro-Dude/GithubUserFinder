import React from 'react';

const RecentSearches = ({ searches, onSelectSearch, clearSearches }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <h3>Recent Searches</h3>
        <button 
          onClick={clearSearches} 
          className="clear-button"
          aria-label="Clear recent searches"
        >
          Clear
        </button>
      </div>
      <ul>
        {searches.map((username, index) => (
          <li key={`${username}-${index}`}>
            <button onClick={() => onSelectSearch(username)}>
              {username}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;