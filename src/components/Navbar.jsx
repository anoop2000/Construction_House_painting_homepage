import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import Collapse from 'bootstrap/js/dist/collapse';
import { ThemeContext } from '../App.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const collapseRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const closeMobileMenu = () => {
    if (collapseRef.current) {
      Collapse.getOrCreateInstance(collapseRef.current)?.hide();
    }
  };

  const handleNavClick = (section) => {
    navigate({ hash: section }); // updates /#/contact etc. via React Router
    document
      .getElementById(section)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' }); // ensure the section becomes visible
    closeMobileMenu();
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm fixed-top themed-nav">
      <div className="container">
        <a
          className="navbar-brand fw-bold text-uppercase"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          PrimeBuild
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
          ref={collapseRef}
        >
          <ul className="navbar-nav gap-3 align-items-lg-center">
            {['home', 'services', 'why-us', 'gallery', 'contact'].map((section) => (
              <li className="nav-item" key={section}>
                <a
                  className="nav-link fw-semibold text-uppercase small"
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(section);
                  }}
                >
                  {section === 'why-us' ? 'Why Choose Us' : section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <svg
                className="theme-toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A8 8 0 0 1 11.21 3 6.5 6.5 0 1 0 21 12.79z" />
              </svg>
            ) : (
              <svg
                className="theme-toggle-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2.25v2.5M12 19.25v2.5M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2.25 12h2.5M19.25 12h2.5M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;