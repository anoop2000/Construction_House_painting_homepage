import { useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
  'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
  'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
];

const marqueeStyles = `
  .gallery-marquee-wrapper {
    overflow: hidden;
  }

  .gallery-marquee-track {
    display: flex;
    gap: 1.5rem;
    will-change: transform;
    animation: gallery-scroll 40s linear infinite;
  }

  .gallery-marquee-item {
    flex: 0 0 auto;
    width: 80vw;
    max-width: 340px;
  }

  .gallery-marquee-item img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 1.5rem;
    transition: transform 0.4s ease;
  }

  .gallery-marquee-item:hover img {
    transform: scale(1.05);
  }

  @keyframes gallery-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (min-width: 768px) {
    .gallery-marquee-item {
      width: 40vw;
      max-width: 360px;
    }
  }

  @media (min-width: 992px) {
    .gallery-marquee-item {
      width: 30vw;
      max-width: 380px;
    }
  }
`;

const Gallery = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollingImages = [...images, ...images];

  return (
    <section id="gallery" className="py-5">
      <style>{marqueeStyles}</style>
      <div className="container">
        <div className="text-center mb-4">
          <p className="text-uppercase text-muted mb-2">Gallery</p>
          <h2 className="fw-bold">Recent Transformations</h2>
        </div>
        <div
          className="gallery-marquee-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="gallery-marquee-track"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {scrollingImages.map((image, index) => (
              <div className="gallery-marquee-item" key={`${image}-${index}`}>
                <img src={image} alt={`Project ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;


