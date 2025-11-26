export const sendContactForm = async (formData) => {
  // Placeholder example for sending contact data to backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Form submitted', payload: formData });
    }, 500);
  });
};

export const fetchTestimonials = async () => {
  // Placeholder example for fetching testimonials
  return Promise.resolve([
    {
      name: 'Sofia Martinez',
      feedback: 'Professional crew and spotless finish on our exterior repaint.',
      rating: 5,
    },
    {
      name: 'Rahul Patel',
      feedback: 'They handled our remodeling quickly and the quality is top-notch.',
      rating: 5,
    },
  ]);
};


