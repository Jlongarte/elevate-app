import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../../styles/Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const linkedinUrl = "https://www.linkedin.com/in/janire-gonzalez";

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('WELCOME TO THE INNER CIRCLE', {
      
    });
    setEmail('');
  };

  return (
    <footer className="elevate-footer">
      <div className="footer-container">
        
        {/* LOGO  */}
        <div className="footer-brand-section">
          <h3 className="footer-logo">ELEVATE<span>.</span></h3>
          <p className="footer-manifesto">
            Engineered core collection designed for high-performance training and athletic longevity. Elevate your standard.
          </p>
          <div className="footer-socials">
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">LN</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Instagram">IG</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="TikTok">TT</a>
          </div>
        </div>

        {/* HELP & SUPPORT */}
        <div className="footer-links-column">
          <h4>HELP & SUPPORT</h4>
          <ul>
            <li><a href={linkedinUrl} target="_blank" rel="noreferrer">FAQ & Support</a></li>
            <li><a href={linkedinUrl} target="_blank" rel="noreferrer">Delivery & Returns</a></li>
            <li><a href={linkedinUrl} target="_blank" rel="noreferrer">Track My Order</a></li>
            <li><a href={linkedinUrl} target="_blank" rel="noreferrer">Size Guides</a></li>
          </ul>
        </div>

        {/* PAGES & COLLECTIONS */}
        <div className="footer-links-column">
          <h4>COLLECTIONS</h4>
          <ul>
            <li><Link to="/catalog">All Products</Link></li>
            <li><Link to="/t-shirts">T-Shirts & Tops</Link></li>
            <li><Link to="/leggings">Leggings</Link></li>
            <li><Link to="/other">Accessories</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-newsletter-section">
          <h4>JOIN THE INNER CIRCLE</h4>
          <p>Sign up to receive exclusive access to capsule collection drops and community updates.</p>
          <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              required 
              placeholder="ENTER YOUR EMAIL..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit">JOIN</button>
          </form>
        </div>

      </div>

      {/* LÍNEA DE CRÉDITOS Y COPYRIGHT */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} ELEVATE. ALL RIGHTS RESERVED.
          </p>
          <div className="footer-legal-links">
            <a href={linkedinUrl} target="_blank" rel="noreferrer">Privacy Policy</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer">Terms of Service</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;