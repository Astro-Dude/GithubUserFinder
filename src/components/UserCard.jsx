import React from 'react';

const UserCard = ({ user, repos }) => {
  if (!user) return null;

  return (
    <div className="user-card">
      <div className="user-header">
        <img 
          src={user.avatar_url} 
          alt={`${user.login}'s avatar`} 
          className="avatar"
        />
        <div className="user-info">
          <h2>{user.name || user.login}</h2>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat">
          <span className="stat-count">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-count">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat">
          <a href={`${user.html_url}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="stat-link">
            <span className="stat-count">{user.public_repos}</span>
            <span className="stat-label">Repositories</span>
          </a>
        </div>
      </div>
      
      <div className="user-details">
        {user.company && (
          <p>
            <span className="label">Company:</span> {user.company}
          </p>
        )}
        {user.location && (
          <p>
            <span className="label">Location:</span> {user.location}
          </p>
        )}
        {user.blog && (
          <p>
            <span className="label">Website:</span>{' '}
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
              {user.blog}
            </a>
          </p>
        )}
        {user.twitter_username && (
          <p>
            <span className="label">Twitter:</span>{' '}
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
              @{user.twitter_username}
            </a>
          </p>
        )}
      </div>
      
      {repos && repos.length > 0 && (
        <div className="user-repositories">
          <h3>Repositories</h3>
          <div className="repos-list">
            {repos.slice(0, 5).map(repo => (
              <div key={repo.id} className="repo-item">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="repo-description">{repo.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="user-actions">
        <a 
          href={user.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="github-link"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;