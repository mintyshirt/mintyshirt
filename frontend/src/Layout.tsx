import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NavbarCategories from './NavbarCategories';

interface LayoutProps {
  showCategories?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ showCategories = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      {showCategories && <NavbarCategories />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
