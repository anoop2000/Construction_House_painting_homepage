import { useState } from 'react';

const comparisonSets = [
  {
    title: 'Classic Facade Refresh',
    before: '/images/painting.jpg',
    after: '/images/painting.jpg',
    description: 'Warm neutrals and crisp trim deliver instant curb appeal.',
  },
  {
    title: 'Modern Exterior Upgrade',
    before: '/images/Modern%20Exterior%20Upgrade.jpg',
    after: '/images/Modern%20Exterior%20Upgrade.jpg',
    description: 'Bold contrast paint modernizes this contemporary home.',
  },
  {
    title: 'Interior Accent Transformation',
    before: '/images/Interior_accent.png',
    after: '/images/Interior_accent.png',
    description: 'Layered tones and premium finishes elevate open living spaces.',
  },
];

const BeforeAfterCard = ({ title, before, after, description }) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after-card p-3 bg-white rounded-4 shadow-sm h-100">
      <div className="before-after-frame position-relative overflow-hidden rounded-4 mb-3">
        <img src={before} alt={`${title} before`} className="before-after-img before-state" loading="lazy" />
        <div className="after-overlay" style={{ width: `${position}%` }}>
          <img src={after} alt={`${title} after`} className="before-after-img after-state" loading="lazy" />
        </div>
        <div className="slider-handle" style={{ left: `${position}%` }}>
          <span className="slider-dot"></span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="before-after-slider"
          aria-label={`Compare before and after for ${title}`}
        />
        <div className="label before-label">Before</div>
        <div className="label after-label">After</div>
      </div>
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
};

const BeforeAfter = () => {
  return (
    <section id="before-after" className="py-5 before-after-section">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Before & After Transformations</h2>
          <p className="text-muted subtitle">See the Difference Professional Painting Makes</p>
        </div>
        <div className="row g-4">
          {comparisonSets.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.title}>
              <BeforeAfterCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;

