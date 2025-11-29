const Footer = () => {
  return (
    <footer className="footer-section text-white py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div>
          <h5 className="fw-bold mb-1">PrimeBuild Construction</h5>
          <p className="mb-0 text-muted">Building spaces that inspire.</p>
        </div>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <i className="bi bi-envelope-fill me-2 text-warning"></i>
            <a href="mailto:hello@primebuild.com">hello@primebuild.com</a>
          </div>
          <div className="footer-contact-item">
            <i className="bi bi-telephone-fill me-2 text-warning"></i>
            <a href="tel:+15125550198">+1 (512) 555-0198</a>
          </div>
        </div>
        <div className="d-flex gap-3 fs-4">
          {['facebook', 'instagram'].map((network) => {
            const href =
              network === 'facebook'
                ? 'https://facebook.com'
                : 'https://instagram.com';
            return (
              <a
                key={network}
                href={href}
                className="footer-icon-link hover-lift"
                aria-label={network}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className={`bi bi-${network}`}></i>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

