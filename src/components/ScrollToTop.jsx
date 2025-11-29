import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500);
    };

    // Initial check
    checkScrollPosition();

    // Listen for scroll events
    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    
    // Listen for hash changes (navigation via navbar)
    const handleHashChange = () => {
      // Check immediately and after scroll animation completes
      checkScrollPosition();
      setTimeout(checkScrollPosition, 100);
      setTimeout(checkScrollPosition, 300);
      setTimeout(checkScrollPosition, 600);
    };
    window.addEventListener('hashchange', handleHashChange);
    
    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleHashChange);
    
    // Monitor for programmatic scrolls (like scrollIntoView from navbar)
    // This catches navigation that might not trigger immediate scroll events
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const checkInterval = setInterval(() => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(currentScrollTop - lastScrollTop) > 10) {
        checkScrollPosition();
        lastScrollTop = currentScrollTop;
      }
    }, 100);

    // Also check after a delay on mount to catch initial hash navigation
    const initialCheck = setTimeout(() => {
      checkScrollPosition();
    }, 300);

    // Additional check after mount to catch any delayed navigation
    const delayedCheck = setTimeout(() => {
      checkScrollPosition();
    }, 600);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
      clearInterval(checkInterval);
      clearTimeout(initialCheck);
      clearTimeout(delayedCheck);
    };
  }, []);

  // React to location changes (React Router hash navigation)
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500);
    };

    // When location hash changes (via React Router), check scroll position
    // This catches navbar navigation that uses React Router
    checkScrollPosition();
    const timeouts = [
      setTimeout(checkScrollPosition, 100),
      setTimeout(checkScrollPosition, 300),
      setTimeout(checkScrollPosition, 600),
      setTimeout(checkScrollPosition, 1000),
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [location.hash]);

  const scrollToTop = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
};

export default ScrollToTop;

