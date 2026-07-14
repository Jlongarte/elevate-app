import React from 'react';
import '../../styles/InstagramPicks.css';

const InstagramPicks: React.FC = () => {
  

  
  const instagramImages = [
    {
      id: 1,
      url: "./model1.webp",
      alt: "Athlete tying training shoes in dark studio"
    },
    {
      id: 2,
      url: "./model2.webp",
      alt: "Close-up of premium fabric workout legging"
    },
    {
      id: 3,
      url: "./model3.webp",
      alt: "High-performance athletic training session"
    },
    {
      id: 4,
      url: "./model4.webp",
      alt: "Minimalist studio portrait of activewear aesthetic"
    }
  ];

  return (
    <section className="instagram-picks-section">
      <header className="instagram-picks-header">
        <div className="header-left">
          <h2>OUR INSTAGRAM PICKS</h2>
          <p>Curated community looks, engineered performance.</p>
        </div>
        <div className="header-right">
          <a className="follow-btn">
            FOLLOW US @ELEVATE.ACTIVE
          </a>
        </div>
      </header>

      <div className="instagram-grid">
        {instagramImages.map((photo) => (
          <a 
            key={photo.id} 
            
            
            className="instagram-card"
          >
            <div className="instagram-img-wrapper">
              <img src={photo.url} alt={photo.alt} />
              
              {/* Capa decorativa en hover */}
              <div className="instagram-overlay">
                <span className="instagram-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </span>
                <span className="overlay-tag">SHOP THE LOOK</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramPicks;