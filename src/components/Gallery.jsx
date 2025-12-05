import { useEffect, useRef, useState } from 'react';

const images = [
  {
    src: '/images/kerala-home-modern.jpg',
    title: 'Elegant Kerala Contemporary Home Exterior',
    description: 'A full professional exterior repaint using weather-shield coatings, enhancing the architecture’s clean lines and natural light. Balanced tones chosen to elevate curb appeal and long-term durability.',
    caption: 'Project: Modern Kerala home exterior makeover · UV-resistant + all-weather protection',
  },
  {
    src: 'images/nalukettu_veedu.jpg',
    title: 'Heritage Nalukettu Restoration',
    description: 'A tasteful repaint preserving the cultural charm of Nalukettu architecture with fresh, breathable colors and natural finishes that highlight wooden elements.',
    caption: 'Project: Nalukettu-style home refresh · Eco-friendly + heritage-safe coating',
  },
  {
    src: 'images/traditional_interior.jpg',
    title: 'Timeless Traditional Interior Repaint',
    description: 'Smooth, polished wall finishes paired with rich, elegant tones to enhance the warmth and classic character of traditional living spaces.',
    caption: 'Project: Full interior repaint · Durable stain-resistant finish',
  },
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

  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: lightbox-fade-in 0.25s ease-out;
  }

  .lightbox-content {
    position: relative;
    width: 100%;
    max-width: 95vw;
    max-height: 95vh;
    padding: 1.5rem 2rem;
    color: #f9fafb;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    overflow: hidden;
  }

  .lightbox-close {
    position: absolute;
    top: 1.1rem;
    right: 1.2rem;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: none;
    background: rgba(15, 23, 42, 0.85);
    color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.6);
    transition: background 0.2s ease, transform 0.15s ease;
    z-index: 1;
  }

  .lightbox-close:hover {
    background: rgba(31, 41, 55, 0.95);
    transform: scale(1.03) translateY(-1px);
  }

  .lightbox-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    min-height: 0;
  }

  .lightbox-image-wrapper {
    position: relative;
    width: 100%;
    max-width: 95vw;
    height: 85vh;
    max-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .lightbox-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  .lightbox-arrow {
    border: none;
    background: rgba(15, 23, 42, 0.8);
    color: #f9fafb;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.7);
    transition: background 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
  }

  .lightbox-arrow:hover {
    background: rgba(31, 41, 55, 0.95);
    transform: translateY(-1px) scale(1.03);
  }

  .lightbox-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .lightbox-zoom-btn {
    border: none;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.9);
    color: #e5e7eb;
    cursor: pointer;
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.6);
    transition: background 0.2s ease, transform 0.15s ease, opacity 0.15s ease;
  }

  .lightbox-zoom-btn:hover:not(:disabled) {
    background: rgba(31, 41, 55, 0.95);
    transform: translateY(-1px) scale(1.03);
  }

  .lightbox-zoom-btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .lightbox-info {
    text-align: left;
    margin-top: 1.75rem;
  }

  .lightbox-info h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
  }

  .lightbox-info p {
    margin-bottom: 0.25rem;
    font-size: 0.95rem;
    color: #e5e7eb;
  }

  .lightbox-caption {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  @keyframes lightbox-fade-in {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

    .lightbox-content {
      max-width: 100%;
      max-height: 100vh;
      padding: 1rem 1.25rem 1.25rem;
    }

    .lightbox-main {
      flex-direction: column;
      gap: 0.75rem;
    }

    .lightbox-image-wrapper {
      width: 100%;
      max-width: 95vw;
      height: 75vh;
      max-height: 75vh;
    }

    .lightbox-arrow {
      width: 40px;
      height: 40px;
    }

    .lightbox-info h3 {
      font-size: 1.05rem;
    }

    .lightbox-info p {
      font-size: 0.9rem;
    }

    .lightbox-caption {
      font-size: 0.8rem;
    }
  }
`;

const getItemsPerView = (width) => {
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const Gallery = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView(window.innerWidth));
  const [translateX, setTranslateX] = useState(0);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const wrapperRef = useRef(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const newItemsPerView = getItemsPerView(width);
      setItemsPerView(newItemsPerView);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate max index - allow scrolling until the last item is visible
  const maxItemIndex = Math.max(0, images.length - itemsPerView);

  // Calculate translation by measuring actual item positions
  useEffect(() => {
    const calculateTranslation = () => {
      if (itemRefs.current[currentItemIndex] && trackRef.current) {
        const currentItem = itemRefs.current[currentItemIndex];
        const itemOffsetLeft = currentItem.offsetLeft;
        const trackPaddingLeft = 24; // 1.5rem in pixels
        const newTranslateX = -(itemOffsetLeft - trackPaddingLeft);
        setTranslateX(newTranslateX);
      } else {
        // Fallback calculation for initial render
        const getItemWidth = () => {
          const width = window.innerWidth;
          if (width >= 1024) return 320;
          if (width >= 768) return 280;
          return width - 32;
        };
        const gap = 24; // 1.5rem in pixels
        const fallbackTranslateX = -(currentItemIndex * (getItemWidth() + gap));
        setTranslateX(fallbackTranslateX);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(calculateTranslation, 0);
    });
  }, [currentItemIndex, itemsPerView]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setZoom(1);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 1));
  };

  const handleOverlayClick = () => {
    closeLightbox();
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleTouchStart = (event) => {
    if (!event.touches || event.touches.length === 0) return;
    touchStartXRef.current = event.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (event) => {
    if (!event.touches || event.touches.length === 0) return;
    touchEndXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current == null || touchEndXRef.current == null) {
      touchStartXRef.current = null;
      touchEndXRef.current = null;
      return;
    }
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50;
    if (deltaX > threshold) {
      showNextImage();
    } else if (deltaX < -threshold) {
      showPrevImage();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        showNextImage();
      } else if (event.key === 'ArrowLeft') {
        showPrevImage();
      } else if (event.key === '+' || event.key === '=') {
        handleZoomIn();
      } else if (event.key === '-' || event.key === '_') {
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  const handleNext = () => {
    setCurrentItemIndex((prev) => {
      // Move to next item, but don't go beyond maxItemIndex
      const next = Math.min(prev + 1, maxItemIndex);
      return next;
    });
  };

  const handlePrev = () => {
    setCurrentItemIndex((prev) => {
      // Move to previous item, but don't go below 0
      return Math.max(prev - 1, 0);
    });
  };

  const currentImage = images[currentIndex] || images[0];

  return (
    <section id="gallery" className="py-5 themed-gallery">
      <style>{sliderStyles}</style>
      <div className="container">
        <div className="text-center mb-4">
          
          <h2 className="fw-bold">Recent Transformations</h2>
        </div>
        <div className="gallery-slider">
          <button
            type="button"
            className="gallery-arrow left"
            onClick={handlePrev}
            disabled={currentItemIndex === 0}
            aria-label="Previous projects"
          >
            &#8592;
          </button>
          <div className="gallery-carousel" ref={wrapperRef}>
            <div 
              className="gallery-track" 
              ref={trackRef}
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {images.map((image, index) => (
                <div
                  className="gallery-item"
                  key={`${image.src}-${index}`}
                  ref={(el) => {
                    if (el) itemRefs.current[index] = el;
                  }}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openLightbox(index);
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title || `Project ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="gallery-arrow right"
            onClick={handleNext}
            disabled={currentItemIndex >= maxItemIndex}
            aria-label="Next projects"
          >
            &#8594;
          </button>
        </div>
      </div>
      {isLightboxOpen && currentImage && (
        <div className="lightbox-overlay" onClick={handleOverlayClick}>
          <div className="lightbox-content" onClick={handleContentClick}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              &#10005;
            </button>
            <div className="lightbox-main">
              <button
                type="button"
                className="lightbox-arrow"
                onClick={showPrevImage}
                aria-label="Previous image"
              >
                &#8592;
              </button>
              <div
                className="lightbox-image-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={currentImage.src}
                  alt={currentImage.title || 'Project image'}
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>
              <button
                type="button"
                className="lightbox-arrow"
                onClick={showNextImage}
                aria-label="Next image"
              >
                &#8594;
              </button>
            </div>
            <div className="lightbox-controls">
              <button
                type="button"
                className="lightbox-zoom-btn"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                &#8722;
              </button>
              <span style={{ fontSize: '0.85rem', color: '#d1d5db' }}>Zoom</span>
              <button
                type="button"
                className="lightbox-zoom-btn"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                aria-label="Zoom in"
              >
                &#43;
              </button>
            </div>
            <div className="lightbox-info">
              {currentImage.title && <h3 style={{color:"white"}} >{currentImage.title}</h3>}
              {currentImage.description && <p>{currentImage.description}</p>}
              {currentImage.caption && (
                <p className="lightbox-caption">{currentImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
