import React from 'react';
import { useHomeProducts } from '../hooks/useHomeProducts';
import { HomeProductRow } from '../components/Home/HomeProductRow';
import { HomeCarousel } from '../components/Home/HomeCarousel';
import { HomeBanner } from '../components/Home/HomeBanner';
import './Home.css';

const Home: React.FC = () => {
  // 📡 Petición HTTP limpia a Render para las filas dinámicas
  const { mostWanted, newReleases, isLoading, error } = useHomeProducts();

  return (
    <div className="home-container">
      {/* Carrusel superior con las 3 fotos */}
      <HomeCarousel />

      {isLoading && <div className="home-status-msg">Loading collection...</div>}
      {error && <div className="home-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <div className="home-content-layout">
          
          {/* Fila 1: Most Wanted (4 productos de la API) */}
          <HomeProductRow 
            title="MOST WANTED" 
            subtitle="The absolute community favorites."
            products={mostWanted} 
          />

          {/* Banner Intermedio de Ancho Completo Centrado (Ejemplo: tu Summer Edit) */}
          <HomeBanner 
            title="SUMMER EDIT"
            ctaText="Discover now"
            imageUrl="https://res.cloudinary.com/dzo0dufcr/image/upload/v1783757704/rachel_3_yoxpzi.jpg" // Puedes sustituir por tu imagen real
            linkTo="/catalog"
          />

          {/* Fila 2: New Releases (4 productos de la API) */}
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