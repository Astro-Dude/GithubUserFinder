import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import RecentSearches from '../components/RecentSearches';
import useGitHubUser from '../hooks/useGitHubUser';

const Home = () => {
  const { user, repos, loading, error, fetchUser } = useGitHubUser();
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('githubRecentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Error parsing saved searches:', e);
        localStorage.removeItem('githubRecentSearches');
      }
    }
  }, []);

  // Handle search and update recent searches
  const handleSearch = (username) => {
    fetchUser(username);
    
    // Update recent searches
    setRecentSearches(prevSearches => {
      // Remove duplicate if exists
      const filteredSearches = prevSearches.filter(s => s !== username);
      // Add new search to beginning
      const newSearches = [username, ...filteredSearches].slice(0, 5);
      // Save to localStorage
      localStorage.setItem('githubRecentSearches', JSON.stringify(newSearches));
      return newSearches;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('githubRecentSearches');
  };

  return (
    <div className="home-container">
      <div className="app-header">
        <h1>GitHub User Finder</h1>
        <p>Enter a GitHub username to view their profile information</p>
      </div>
      
      <div className="search-section">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
        <RecentSearches 
          searches={recentSearches} 
          onSelectSearch={handleSearch} 
          clearSearches={clearRecentSearches} 
        />
      </div>
      
      <div className="result-section">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {user && !loading && !error && <UserCard user={user} repos={repos} />}
        {!user && !loading && !error && (
          <div className="empty-state">
            <p>No user data to display. Try searching for a GitHub username!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;