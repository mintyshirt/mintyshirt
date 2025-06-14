import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ShopPage from './components/ShopPage';
import AccessoryCategoryPage from './components/AccessoryCategoryPage';
import CreatorsPage from './components/CreatorsPage';
import CreatorPage from './components/CreatorPage';
import CategoriesPage from './components/CategoriesPage';
import RoyaltyTokensPage from './components/RoyaltyTokensPage';
import TokenSwapPage from './components/TokenSwapPage';
import DesignHubPage from './components/DesignHubPage';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<AccessoryCategoryPage />} />
        <Route path="/creators" element={<CreatorsPage />} />
        <Route path="/creators/:slug" element={<CreatorPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/royalty-tokens" element={<RoyaltyTokensPage />} />
        <Route path="/token-swap" element={<TokenSwapPage />} />
        <Route path="/design-hub" element={<DesignHubPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
