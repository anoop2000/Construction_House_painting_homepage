const highlights = [
  { icon: 'bi-people-fill', title: 'Experienced Team', text: 'Licensed pros with decades of combined expertise.' },
  { icon: 'bi-wallet2', title: 'Affordable Pricing', text: 'Transparent quotes with flexible payment options.' },
  { icon: 'bi-alarm-fill', title: 'On-Time Delivery', text: 'Structured timelines and weekly progress updates.' },
  { icon: 'bi-brush-fill', title: 'Quality Materials', text: 'Premium paints, fixtures, and sustainable finishes.' },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-5 why-us-section themed-section">
      <div className="container">
        <div className="text-center mb-5">
          
          <h2 className="fw-bold">We Build With Integrity</h2>
        </div>
        <div className="row g-4">
          {highlights.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.title}>
              <div className="p-4 rounded-4 shadow-sm h-100 text-center why-card themed-card">
                <div className="icon-circle mx-auto mb-3">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted mb-0 themed-card-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;


