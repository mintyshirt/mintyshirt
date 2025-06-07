import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DesignHub from './pages/DesignHub';
import TokenSwap from './pages/TokenSwap';
import Stats from './pages/Stats';
import Categories from './pages/Categories';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="designhub" element={<DesignHub />} />
        <Route path="tokenswap" element={<TokenSwap />} />
        <Route path="stats" element={<Stats />} />
        <Route path="categories" element={<Categories />} />
        <Route path="shop" element={<div className="p-8">Boutique à venir...</div>} />
        <Route path="*" element={<div className="p-8">Page introuvable</div>} />
      </Route>
    </Routes>
  );
};

export default App;
