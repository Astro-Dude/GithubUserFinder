import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import ThemeToggle from './components/ThemeToggle';
import './styles/app.css';

function App() {
  // Check if user has a theme preference saved in localStorage
  // or use system preference as default
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check if user prefers dark mode
    return window.matchMedia && 
      window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <ThemeToggle isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      <Home />
    </div>
  );
}

export default App;