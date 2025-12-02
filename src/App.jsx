// import HomePage from './pages/HomePage.jsx';

// const App = () => {
//   return <HomePage />;
// };

// export default App;


// src/App.jsx
import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import HomePage from './pages/HomePage.jsx'; // or lazy(() => import(...)) if you later choose

const App = () => {
  return (
    <ErrorBoundary>
      {/* If you ever lazy‑load HomePage, wrap it in Suspense here */}
      {/* <Suspense fallback={<div className="text-center py-5">Loading page...</div>}> */}
        <HomePage />
      {/* </Suspense> */}
    </ErrorBoundary>
  );
};

export default App;
