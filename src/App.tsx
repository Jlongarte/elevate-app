import {  Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar/Navbar';
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from './pages/ProductDetail';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas del Catálogo  */}
          <Route path="/catalog" element={<Catalog category="All" />} />
          <Route path="/t-shirts" element={<Catalog category="T-Shirts" />} />
          <Route path="/leggings" element={<Catalog category="Leggins" />} />
          <Route path="/other" element={<Catalog category="Other" />} />
          
          {/* Detalle de producto  */}
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  );
};

export default App;