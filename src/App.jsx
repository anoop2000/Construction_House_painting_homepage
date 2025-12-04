// import HomePage from './pages/HomePage.jsx';

// const App = () => {
//   return <HomePage />;
// };

// export default App;


// src/App.jsx
import React, { useEffect, useMemo, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import HomePage from './pages/HomePage.jsx';
import './theme.css';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // ignore read errors and fall back to light
  }
  return 'light';
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    const nextClass = theme === 'dark' ? 'dark-theme' : 'light-theme';
    body.classList.add(nextClass);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore write errors
    }
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ErrorBoundary>
        <HomePage />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};

export default App;
