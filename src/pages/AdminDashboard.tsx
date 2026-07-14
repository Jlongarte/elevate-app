import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { useAdmin } from '../hooks/useAdmin';
import Button from '../components/Common/Button';
import '../styles/AdminDashboard.css';

const Admin: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  const {
    name, setName,
    price, setPrice,
    description, setDescription,
    category, setCategory,
    image, setImage,
    countInStock, setCountInStock,
    sizes, setSizes,
    isSubmitting,
    handleCreateProduct,
  } = useAdmin();

  //Seguridad: Si no está logueado o no es administrador, redirige al Home
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCountInStock('10');
    setSizes(['S', 'M', 'L']);
  };

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>ADMIN DASHBOARD</h1>
        <p>Manage store inventory and publish new luxury apparel.</p>
      </header>

      <div className="admin-layout">
        
        {/* FORMULARIO DE CREACIÓN */}
        <div className="admin-card">
          <h2>PUBLISH NEW PRODUCT</h2>
          <hr className="admin-divider" />
          
          <form onSubmit={(e) => handleCreateProduct(e, resetForm)} className="admin-form">
            <div className="admin-fields-grid">
              
              <div className="admin-field full-width">
                <label>PRODUCT NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aeroknit Pro Shorts"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="admin-field">
                <label>PRICE (€)</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  placeholder="45.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="admin-field">
                <label>STOCK COUNT</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="10"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <div className="admin-field">
                <label>CATEGORY</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="T-Shirts & Tops">T-Shirts & Tops</option>
                  <option value="LEGGINGS">Leggings</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="admin-field">
                <label>IMAGE URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className="admin-field full-width">
                <label>DESCRIPTION</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe premium fabric traits and athletic fit details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Selector de Tallas */}
              <div className="admin-field full-width">
                <label>AVAILABLE SIZES</label>
                <div className="admin-sizes-row">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={`admin-size-btn ${sizes.includes(size) ? 'active' : ''}`}
                      onClick={() => handleSizeToggle(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
              {isSubmitting ? 'PUBLISHING PRODUCT...' : 'PUBLISH TO CATALOG'}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;