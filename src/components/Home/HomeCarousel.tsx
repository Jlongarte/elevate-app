import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CarouselSlide {
  id: number;
  tagline: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkTo: string;
}

export const HomeCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  
  const slides: CarouselSlide[] = [
    {
      id: 1,
      tagline: "CORE COLLECTION 2026",
      title: "ELEVATE YOUR PERFORMANCE",
      subtitle: "Premium athleisure engineered for relentless training.",
      imageUrl: "./hero-image1.webp",
      linkTo: "/catalog"
    },
    {
      id: 2,
      tagline: "CLOUD KNIT SEAMLESS",
      title: "ZERO DISTRACTIONS",
      subtitle: "Experience second-skin fit with ultra-breathable fabrics.",
      imageUrl: "./hero-image2.webp",
      linkTo: "/catalog"
    },
    {
      id: 3,
      tagline: "SUMMER ESSENTIALS",
      title: "BUILT FOR INTENSITY",
      subtitle: "Moisture-wicking gear that moves effortlessly with you.",
      imageUrl: "./hero-image3.webp",
      linkTo: "/catalog"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="home-carousel">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.imageUrl})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-tagline">{slide.tagline}</span>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-description">{slide.subtitle}</p>
            <button className="hero-cta-btn" onClick={() => navigate(slide.linkTo)}>
              SHOP NOW
            </button>
          </div>
        </div>
      ))}

      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <button 
            key={idx} 
            className={`dot ${idx === currentSlide ? 'active' : ''}`} 
            onClick={() => setCurrentSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
};