const Hero = () => {
  return (
    <section id="home" className="hero-section text-center text-white d-flex align-items-center">
      <div className="container">
        <span className="badge bg-warning text-dark mb-3 text-uppercase">Premium Services</span>
        <h1 className="display-4 fw-bold mb-3">
          Construction & House Painting Services You Can Trust
        </h1>
        <p className="lead mb-4">
          From custom builds to luxury finishes, we deliver craftsmanship that lasts.
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



