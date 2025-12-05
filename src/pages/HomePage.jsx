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
      <main className="page-content themed-page">
        <Hero />

        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#4F46E5" }}>Loading Our Services...</div>}>
        <Services />
        </Suspense>


        <Suspense fallback={<div className="py-5 text-center" style={{ color: "#EA580C" }} >Loading Gallery...</div>}>
        <Gallery />
        </Suspense>

        {/* <WhyChooseUs /> */}

        {/* <Suspense fallback={<div className="py-5 text-center" style={{ color: "#1E3A8A" }} >Loading Before & After section...</div>}>
        <BeforeAfter />
        </Suspense> */}

        {/* <Testimonials /> */}
        <section id="contact" className="py-5 contact-section">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h2 className="fw-bold mb-3">Ready to discuss your next project?</h2>
                <p className="text-muted">
                  Share a few project details and our project manager will schedule a walkthrough at your preferred time.
                </p>
                
              </div>
              <div className="col-lg-6" style={{ position: 'relative' }}>
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    backgroundColor: 'var(--form-bg)',
                    boxShadow: 'var(--form-shadow)',
                    border: '1px solid var(--form-border)',
                  }}
                >
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
                <div className="contact-fab-container">
                  <a
                    href="tel:+1 (512) 555-0198"
                    className="contact-fab contact-fab-phone"
                    aria-label="Call us"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a2 2 0 0 0 0 2.83 2 2 0 0 0 2.83 0l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </a>
                  
                  <a
                    href="https://wa.me/(512) 555-0198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-fab contact-fab-whatsapp"
                    aria-label="WhatsApp us"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
                <style>{`
                  .contact-fab-container {
                    position: absolute;
                    top: 50%;
                    right: -60px;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    z-index: 10;
                  }
                  .contact-fab {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #25D366;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    text-decoration: none;
                  }
                  .contact-fab:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                    color: white;
                  }
                  .contact-fab-phone {
                    background-color: #0d6efd;
                  }
                  .contact-fab-whatsapp {
                    background-color: #25D366;
                  }
                  @media (max-width: 991px) {
                    .contact-fab-container {
                      position: fixed;
                      bottom: 80px;
                      right: 20px;
                      top: auto;
                      transform: none;
                    }
                  }
                `}</style>
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


