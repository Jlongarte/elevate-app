import React, { useState, useEffect } from 'react'; // Importamos hooks
import Button from '../components/Common/Button/Button';
import ProductGrid from '../components/Product/ProductGrid/ProductGrid';
import { type Product } from '../types';
import './Home.css';


const heroImages = [
  '/hero-image1.webp',
  '/hero-image2.webp',
  '/hero-image3.webp'
];


// Simulamos unos productos provisionales que cumplan la interfaz

const dummyProducts: Product[] = [
  { 
    _id: '1', 
    name: 'Malla Deportiva Compresión', 
    description: '', 
    price: 39.99, 
    category: 'Pants', 
    size: 'M', 
    stock: 10, 
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80' 
  },
  { 
    _id: '2', 
    name: 'Sujetador Impacto Alto', 
    description: '', 
    price: 29.99, 
    category: 'T-Shirts', 
    size: 'S', 
    stock: 5, 
    imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80' 
  },
  { 
    _id: '3', 
    name: 'Zapatillas Running Pro', 
    description: '', 
    price: 89.99, 
    category: 'Shoes', 
    size: 'XL', 
    stock: 3, 
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' 
  }
];

const Home: React.FC = () => {
  // --- LÓGICA DEL CAROUSEL ---
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Cambia la imagen automáticamente cada 5 segundos
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-container">
      
      {/* 1. HERO BANNER DIPNÁMICO */}
      <section 
        className="hero-section"
        style={{ 
          
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${heroImages[currentImageIndex]})` 
        }}
      >
        <div className="hero-content">
          <h1>ELEVATE YOUR GAME</h1>
          <p>Descubre la nueva colección de alto rendimiento.</p>
          <div className="hero-buttons">
            <Button variant="primary">COMPRAR MUJER</Button>
            <Button variant="secondary">COMPRAR HOMBRE</Button>
          </div>
        </div>
        
        
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)} // Permitir cambio manual
            />
          ))}
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
      <section className="categories-section">
        <h2 className="section-title">Tendencias de Temporada</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-overlay">
              <h3>SUMMER BRIGHTS</h3>
              <Button variant="light">VER AHORA</Button>
            </div>
          </div>
          <div className="category-card">
            <div className="category-overlay">
              <h3>TRAINING GEAR</h3>
              <Button variant="light">DESCUBRIR</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS  */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Los más buscados</h2>
          <a href="/catalog" className="see-all-link">Ver todo</a>
        </div>
        <ProductGrid products={dummyProducts} />
      </section>

      {/* 4. NUTRITION BANNER */}
      <section className="nutrition-banner-section">
        <div className="nutrition-banner">
          <div className="nutrition-content">
            <h2>SUPLEMENTACIÓN PREMIUM</h2>
            <p>Maximiza tu recuperación y energía.</p>
            <Button variant="primary">VER SUPLEMENTOS</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;