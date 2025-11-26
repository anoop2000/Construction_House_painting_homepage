import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Gallery from '../components/Gallery.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Footer from '../components/Footer.jsx';
import { sendContactForm } from '../api.js';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
  });
  const [status, setStatus] = useState({
    submitting: false,
    message: '',
    error: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ submitting: true, message: '', error: '' });
    try {
      await sendContactForm(formData);
      setStatus({ submitting: false, message: 'Thanks! We will get back shortly.', error: '' });
      setFormData({ name: '', email: '', project: '' });
    } catch (error) {
      setStatus({ submitting: false, message: '', error: 'Something went wrong. Please retry.' });
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-content">
        <Hero />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <section id="contact" className="py-5 contact-section">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <p className="text-uppercase text-muted mb-2">Contact</p>
                <h2 className="fw-bold mb-3">Ready to discuss your next project?</h2>
                <p className="text-muted">
                  Share a few project details and our project manager will schedule a walkthrough at your preferred time.
                </p>
                
              </div>
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="project" className="form-label">
                          Project Details
                        </label>
                        <textarea
                          className="form-control"
                          id="project"
                          name="project"
                          rows="3"
                          value={formData.project}
                          onChange={handleChange}
                          placeholder="E.g., exterior repaint, kitchen remodel..."
                          required
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-warning w-100 text-uppercase fw-semibold" disabled={status.submitting}>
                        {status.submitting ? 'Sending...' : 'Send Message'}
                      </button>
                      {status.message && <p className="text-success mt-3 mb-0">{status.message}</p>}
                      {status.error && <p className="text-danger mt-3 mb-0">{status.error}</p>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;


