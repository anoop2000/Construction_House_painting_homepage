🏗️ Construction & House Painting Services – Landing Page - Live Link : https://construction-homepage.netlify.app/

A modern, fully responsive single-page website designed for Construction & House Painting businesses.
Built with Vite + React + Bootstrap 5 for high performance, fast development, and seamless deployment on platforms like Netlify, Vercel, or GitHub Pages.

🚀 Tech Stack
Frontend

React (Functional components + Hooks)

Vite (Lightning-fast dev server & bundler)

Bootstrap 5 (Responsive UI layout)

Bootstrap Icons

Custom CSS (App.css)

Assets & APIs

Local images in public/images

Unsplash image links for real-life visuals

API abstraction:
src/api.js (e.g., sendContactForm, fetchTestimonials)

📁 Project Structure
src/
  api.js
  App.jsx
  App.css
  main.jsx

  components/
    Navbar.jsx
    Hero.jsx
    Services.jsx
    WhyChooseUs.jsx
    Gallery.jsx
    Testimonials.jsx
    Footer.jsx

  pages/
    HomePage.jsx

🔍 Component Overview
Component	Description
HomePage.jsx	Master page assembling all sections
Navbar.jsx	Fixed-top navigation bar with smooth scrolling
Hero.jsx	Full-width banner with headline + CTA buttons
Services.jsx	Three service cards with hover zoom & shadows
WhyChooseUs.jsx	Trust highlights with icons (team, pricing, quality)
Gallery.jsx	Auto-scrolling gallery (infinite horizontal carousel with pause-on-hover)
Testimonials.jsx	Bootstrap carousel of client reviews
Footer.jsx	Business details, clickable phone/email, social icons
✨ Key Features
✔ Fully Responsive Design

Mobile-first layout

Smooth scaling from smartphones → desktops

Cards adapt from single column → multi-column

Auto-scroll gallery adjusts number of visible images dynamically

✔ Smooth Navigation

Fixed-top Bootstrap navbar

Anchor links:

#home  #services  #why-us  #gallery  #testimonials  #contact


Native smooth scrolling + scroll margin offset for precision

✔ Modern Visual Experience

High-contrast hero section with overlay

Hover effects: image zoom, card lift animation, soft shadows

Clean color palette (dark brand tones + gold accent + light backgrounds)

✔ Lead Capture & Contact

Contact form (React-controlled)

Backend-ready API structure (sendContactForm)

Clickable footer actions:

tel: → opens phone dialer

mailto: → opens compose email

Social media icons open external pages

✔ Production-Ready Setup

Optimized Vite production build

Clean separation of UI components

Easily extendable API layer

Lightweight, fast-loading, static-site compatible

🧪 Getting Started
1. Install Dependencies
npm install

2. Start the Development Server
npm run dev


Then open the URL shown in the terminal (usually http://localhost:5173
).

3. Build for Production
npm run build


Output is generated in the dist/ directory.

🚀 Deployment (Example: Netlify)

Run:

npm run build


In Netlify:

Publish directory: dist

Build command: npm run build

Deploy from:

Git repository, or

Drag-and-drop the dist folder

Supports Vercel, GitHub Pages, Render, or any static host.

📌 Customization Ideas

Replace business name, contact details, and imagery with real client data

Swap gallery pictures for actual project photos

Connect sendContactForm to serverless functions or a backend

Add analytics, multilingual content, or A/B-tested CTAs

Integrate a booking form or WhatsApp chat shortcut
