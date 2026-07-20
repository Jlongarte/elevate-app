import React from 'react';
import { useHomeProducts } from '../hooks/useHomeProducts';
import { HomeProductRow } from '../components/Home/HomeProductRow';
import { HomeCarousel } from '../components/Home/HomeCarousel';
import { HomeBanner } from '../components/Home/HomeBanner';
import  InstagramPicks  from '../components/Home/InstagramPicks';
import '../styles/Home.css';

const Home: React.FC = () => {
  
  const { mostWanted, newReleases, isLoading, error } = useHomeProducts();

  return (
    <div className="home-container">
      {/* Carrusel con 3 fotos */}
      <HomeCarousel />

      {isLoading && <div className="home-status-msg">Loading collection...</div>}
      {error && <div className="home-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <div className="home-content-layout">
          
          {/*  Most Wanted */}
          <HomeProductRow 
            title="MOST WANTED" 
            subtitle="The absolute community favorites."
            products={mostWanted} 
          />

          
          <HomeBanner 
            title="SUMMER EDIT"
            ctaText="Discover now"
            imageUrl="./banner2.jpeg" 
            linkTo="/catalog"
          />

          {/* New Releases */}
          <HomeProductRow 
            title="NEW RELEASES" 
            subtitle="Fresh drops from our engineering lab."
            products={newReleases} 
          />
          <HomeBanner 
            title="MEN COLLECTION COMING SOON"
            ctaText="Discover now"
            imageUrl="./banner1.webp" 
            linkTo="/catalog"
          />
          <InstagramPicks />

        </div>
      )}
    </div>
  );
};

export default Home;