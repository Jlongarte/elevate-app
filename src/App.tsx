import React from 'react';
import Navbar from './components/Common/Navbar/Navbar';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
    </>
  );
};

export default App;