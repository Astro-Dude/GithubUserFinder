import { useState, useEffect } from 'react';

const useGitHubUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (username) => {
    if (!username) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        } else if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`GitHub API error: ${response.status}`);
        }
      }
      
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, fetchUser };
};

export default useGitHubUser;