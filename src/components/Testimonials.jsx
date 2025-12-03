const testimonials = [
  {
    name: 'Daniel Rivers',
    role: 'Homeowner, Austin',
    feedback:
      'They coordinated our painting and patio extension flawlessly. Every milestone was communicated and the finish is immaculate.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Priya Desai',
    role: 'Designer, Seattle',
    feedback:
      'Reliable, detail-oriented, and respectful of our space. The waterproofing and interior refresh were finished ahead of schedule.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">What Clients Say</h2>
        </div>
        <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {testimonials.map((testimonial, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={testimonial.name}>
                <div className="testimonial-card mx-auto bg-white shadow-sm rounded-4 p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img src={testimonial.avatar} alt={testimonial.name} className="rounded-circle me-3 testimonial-avatar" />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <small className="text-muted mt-1 d-block">{testimonial.role}</small>
                    </div>
                  </div>
                  <p className="mb-3">{testimonial.feedback}</p>
                  <div className="text-warning fs-5">
                    {'★★★★★'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-outline-dark btn-sm" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              Prev
            </button>
            <button className="btn btn-dark btn-sm" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;



