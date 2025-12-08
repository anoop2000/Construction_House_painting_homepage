const Hero = () => {
  return (
    <section id="home" className="hero-section text-center text-white d-flex align-items-center themed-section">
      <div className="container">
        <span className="badge mb-3 text-uppercase themed-hero-badge">Premium Services</span>
        <h1 className="display-4 fw-bold mb-3 hero-title">
          <span>Beautiful Paint.</span>
          <span>Expert Hands.</span>
          <span>Stunning Results.</span>
        </h1>
        <div className="hero-palette-loader mx-auto mb-4" aria-hidden="true">
          <div className="paint-drop drop-1"></div>
          <div className="paint-drop drop-2"></div>
          <div className="paint-drop drop-3"></div>
          <div className="paint-drop drop-4"></div>
          <div className="paint-drop drop-5"></div>
          <div className="paint-drop drop-6"></div>
          <div className="paint-drop drop-7"></div>
          <div className="paint-drop drop-8"></div>
        </div>
        <p className="lead mb-4">
          From custom builds to luxury finishes for Contruction and Painting Services.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-6">
         
          <a href="#contact" className="btn btn-outline-danger btn-lg px-4 text-uppercase fw-semibold">
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;



