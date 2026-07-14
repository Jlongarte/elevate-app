import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/HomeBanner.css'; 

interface HomeBannerProps {
  title: string;
  ctaText: string;
  imageUrl: string;
  linkTo: string;
}

export const HomeBanner: React.FC<HomeBannerProps> = ({ title, ctaText, imageUrl, linkTo }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="home-fullwidth-banner" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="banner-fullwidth-overlay" />
      <div className="banner-fullwidth-content">
        <h2 className="banner-fullwidth-title">{title.toUpperCase()}</h2>
        <button className="banner-fullwidth-btn" onClick={() => navigate(linkTo)}>
          {ctaText}
        </button>
      </div>
    </div>
  );
};