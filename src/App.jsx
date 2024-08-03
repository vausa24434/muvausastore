// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import CheckPriceList from './components/CheckPriceList';
import Nav from './components/Nav';
import Pricelist from './components/Pricelist';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav /> {/* Menambahkan komponen Nav di sini */}
        <Routes>
        <Route path="/pricelist" element={<Pricelist />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/check-price-list" element={<CheckPriceList />} />
          <Route path="/" element={<ProductList />} /> {/* Halaman default */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
