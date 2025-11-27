import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Collapse from 'bootstrap/js/dist/collapse';

const Navbar = () => {
  const navigate = useNavigate();
  const collapseRef = useRef(null);

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
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
          <ul className="navbar-nav gap-3">
            {['home', 'services', 'why-us', 'gallery', 'testimonials', 'contact'].map((section) => (
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;