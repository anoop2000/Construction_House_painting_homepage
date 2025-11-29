import { useEffect, useRef, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
  'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
  'https://images.unsplash.com/photo-1599427303058-f04cbcf4756f',
];

const sliderStyles = `
  .gallery-slider {
    position: relative;
    padding: 0 2rem;
  }

  .gallery-carousel {
    overflow: hidden;
  }

  .gallery-track {
    display: flex;
    gap: 1.5rem;
    transition: transform 0.6s ease;
    will-change: transform;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .gallery-item {
    flex: 0 0 auto;
    width: 320px;
    height: 220px;
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.4s ease;
    display: block;
  }

  .gallery-item:hover img {
    transform: scale(1.05);
  }

  .gallery-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(15, 23, 42, 0.8);
    color: #fff;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 2;
  }

  .gallery-arrow:hover:not(:disabled) {
    transform: translateY(-50%) scale(1.05);
  }

  .gallery-arrow:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .gallery-arrow.left {
    left: 1rem;
  }

  .gallery-arrow.right {
    right: 1rem;
  }

  @media (max-width: 1024px) and (min-width: 768px) {
    .gallery-item {
      width: 280px;
      height: 190px;
    }
  }

  @media (max-width: 767px) {
    .gallery-slider {
      padding: 0 1rem;
    }

    .gallery-item {
      width: 100%;
      max-width: none;
      height: 180px;
    }

    .gallery-arrow {
      width: 42px;
      height: 42px;
    }
  }
`;

const getItemsPerView = (width) => {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const Gallery = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView(window.innerWidth));
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
      if (wrapperRef.current) {
        setWrapperWidth(wrapperRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.offsetWidth);
    }
    setPageIndex((prev) => {
      const maxPageIndex = Math.max(0, Math.ceil(images.length / itemsPerView) - 1);
      return Math.min(prev, maxPageIndex);
    });
  }, [itemsPerView]);

  const maxPageIndex = Math.max(0, Math.ceil(images.length / itemsPerView) - 1);

  const handleNext = () => {
    setPageIndex((prev) => Math.min(prev + 1, maxPageIndex));
  };

  const handlePrev = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const translateX = wrapperWidth ? -(pageIndex * wrapperWidth) : 0;

  return (
    <section id="gallery" className="py-5">
      <style>{sliderStyles}</style>
      <div className="container">
        <div className="text-center mb-4">
          <p className="text-uppercase text-muted mb-2">Gallery</p>
          <h2 className="fw-bold">Recent Transformations</h2>
        </div>
        <div className="gallery-slider">
          <button
            type="button"
            className="gallery-arrow left"
            onClick={handlePrev}
            disabled={pageIndex === 0}
            aria-label="Previous projects"
          >
            &#8592;
          </button>
          <div className="gallery-carousel" ref={wrapperRef}>
            <div className="gallery-track" style={{ transform: `translateX(${translateX}px)` }}>
              {images.map((image, index) => (
                <div className="gallery-item" key={`${image}-${index}`}>
                  <img src={image} alt={`Project ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="gallery-arrow right"
            onClick={handleNext}
            disabled={pageIndex === maxPageIndex}
            aria-label="Next projects"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
