import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar/Navbar';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';

// Quitamos la importación de BrowserRouter y las etiquetas <Router> 
// porque ya están envolviendo a <App /> desde tu archivo main.tsx
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rutas principales del catálogo */}
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<Catalog category="ALL PRODUCTS" />} />
        <Route path="/t-shirts" element={<Catalog category="T-Shirts & Tops" />} />
        <Route path="/leggings" element={<Catalog category="LEGGINGS" />} />
        <Route path="/other" element={<Catalog category="OTHER" />} />
        
        {/* Ficha técnica individual */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;