import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ShopPage from './components/ShopPage';
import AccessoryCategoryPage from './components/AccessoryCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<AccessoryCategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
