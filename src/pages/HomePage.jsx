import React, { useState } from 'react';
import { Suspense } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
      
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Footer from '../components/Footer.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import { sendContactForm } from '../api.js';


const Services = React.lazy(() => import('../components/Services.jsx'));
const Gallery = React.lazy(() => import('../components/Gallery.jsx'));
const BeforeAfter = React.lazy(() => import('../components/BeforeAfter.jsx'));


const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validateField = (field, value) => {
    let errorMessage = '';
    const trimmedValue = value.trim();

    if (field === 'name') {
      if (trimmedValue.length < 3) {
        errorMessage = 'Name must be at least 3 characters.';
      } else if (!NAME_REGEX.test(trimmedValue)) {
        errorMessage = 'Name can contain letters and spaces only.';
      }
    }

    if (field === 'email') {
      if (!EMAIL_REGEX.test(trimmedValue)) {
        errorMessage = 'Please enter a valid email address.';
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'email') {
      validateField(name, value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);

    if (nameError || emailError || !formData.project.trim()) {
      setStatus({ submitting: false, message: '', error: 'Please fix the errors above before submitting.' });
      return;
    }

    setStatus({ submitting: true, message: '', error: '' });
    try {
      await sendContactForm(formData);
      setStatus({
        submitting: false,
        message: 'Submitted successfully. We will get back to you soon.',
        error: '',
      });
      setFormData({ name: '', email: '', project: '' });
      setErrors({ name: '', email: '' });
    } catch (error) {
      setStatus({ submitting: false, message: '', error: 'Something went wrong. Please retry.' });
    }
  };

  const isFormValid =
    !errors.name &&
    !errors.email &&
    formData.name.trim().length >= 3 &&
    NAME_REGEX.test(formData.name.trim()) &&
    EMAIL_REGEX.test(formData.email.trim()) &&
    formData.project.trim().length > 0;

  return (
    <>
      <Navbar />
      <main className="page-content">
        <Hero />

        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#4F46E5" }}>Loading Our Services...</div>}>
        <Services />
        </Suspense>


        <WhyChooseUs />

        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#EA580C" }} >Loading Gallery...</div>}>
        <Gallery />
        </Suspense>

        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#1E3A8A" }} >Loading Before & After section...</div>}>
        <BeforeAfter />
        </Suspense>

        <Testimonials />
        <section id="contact" className="py-5 contact-section">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
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
                          minLength={3}
                        pattern="^[A-Za-z\\s]{3,}$"
                        />
                      {errors.name && <small className="text-danger">{errors.name}</small>}
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
                          pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$"
                        />
                      {errors.email && <small className="text-danger">{errors.email}</small>}
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
                      <button
                        type="submit"
                        className="btn btn-warning w-100 text-uppercase fw-semibold"
                        disabled={status.submitting || !isFormValid}
                      >
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
      <ScrollToTop />
    </>
  );
};

export default HomePage;


