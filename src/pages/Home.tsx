import React from 'react';
import { useHomeProducts } from '../hooks/useHomeProducts';
import { HomeProductRow } from '../components/Home/HomeProductRow';
import { HomeCarousel } from '../components/Home/HomeCarousel';
import { HomeBanner } from '../components/Home/HomeBanner';
import '../styles/Home.css';

const Home: React.FC = () => {
  
  const { mostWanted, newReleases, isLoading, error } = useHomeProducts();

  return (
    <div className="home-container">
      {/* Carrusel superior con las 3 fotos */}
      <HomeCarousel />

      {isLoading && <div className="home-status-msg">Loading collection...</div>}
      {error && <div className="home-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <div className="home-content-layout">
          
          {/* Fila 1: Most Wanted */}
          <HomeProductRow 
            title="MOST WANTED" 
            subtitle="The absolute community favorites."
            products={mostWanted} 
          />

          {/* Banner Intermedio de Ancho Completo Centrado */}
          <HomeBanner 
            title="SUMMER EDIT"
            ctaText="Discover now"
            imageUrl="./banner2.jpeg" 
            linkTo="/catalog"
          />

          {/* Fila 2: New Releases */}
          <HomeProductRow 
            title="NEW RELEASES" 
            subtitle="Fresh drops from our engineering lab."
            products={newReleases} 
          />

        </div>
      )}
    </div>
  );
};

export default Home;