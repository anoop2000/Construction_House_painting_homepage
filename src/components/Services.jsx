const services = [
  {
    title: 'House Painting',
    description: 'Vibrant palettes, precision edges, and durable finishes for every style.',
    image: '/images/service-house-painting.jpeg',
  },
  {
    title: 'Interior / Exterior Construction',
    description: 'From framing to finishing, we handle both interior and exterior builds.',
    image: '/images/service-interior-exterior.jpeg',
  },
  {
    title: 'Waterproofing & Renovation',
    description: 'Protective coatings and smart renovations that extend the life of your home.',
    image: '/images/service-waterproofing-renovation (1).jpg',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          
          <h2 className="fw-bold">Professional Services</h2>
          <p className="text-muted">Modern craftsmanship powered by detail-oriented experts.</p>
        </div>
        <div className="row g-4">
          {services.map((service) => (
            <div className="col-md-4" key={service.title}>
              <div className="card service-card h-100 border-0">
                <div className="service-image-wrapper">
                  <img
                    src={service.image}
                    className="card-img-top"
                    alt={service.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


