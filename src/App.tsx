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
import TokenDetailPage from './components/TokenDetailPage';
import DesignHubPage from './components/DesignHubPage';
import IpAssetPage from './components/IpAssetPage';
import StatsPage from './components/StatsPage';
import CreatorStatsPage from './components/CreatorStatsPage';
import WalletConnectPage from './components/WalletConnectPage';
import BecomeCreatorPage from './components/BecomeCreatorPage';
import UploadDesignPage from './components/UploadDesignPage';
import ChooseRolePage from './components/ChooseRolePage';

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
        <Route path="/categories/:slug" element={<CategoriesPage />} />
        <Route path="/royalty-tokens" element={<RoyaltyTokensPage />} />
        <Route path="/tokenswap" element={<TokenSwapPage />} />
        <Route path="/tokenswap/:id" element={<TokenDetailPage />} />
        <Route path="/design-hub" element={<DesignHubPage />} />
        <Route path="/design-hub/:id" element={<IpAssetPage />} />
        <Route path="/wallet-connect" element={<WalletConnectPage />} />
        <Route path="/become-creator" element={<BecomeCreatorPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />
        <Route path="/upload-design" element={<UploadDesignPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/stats/:creatorHandle" element={<CreatorStatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
