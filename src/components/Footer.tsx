import React from 'react';
import { FaYoutube, FaTiktok, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#2C1D59] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-wrap justify-center space-x-4">
          <a href="#" className="hover:underline">À propos</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Conditions générales de vente</a>
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">Token-gated affiliate program</a>
        </div>
        <div className="flex justify-center space-x-4 text-2xl">
          <a href="#" aria-label="YouTube" className="hover:text-purple-300"><FaYoutube /></a>
          <a href="#" aria-label="TikTok" className="hover:text-purple-300"><FaTiktok /></a>
          <a href="#" aria-label="Instagram" className="hover:text-purple-300"><FaInstagram /></a>
          <a href="#" aria-label="X" className="hover:text-purple-300"><FaTwitter /></a>
          <a href="#" aria-label="Facebook" className="hover:text-purple-300"><FaFacebook /></a>
        </div>
        <form className="flex justify-center space-x-2">
          <input type="email" placeholder="Ton email" className="px-2 py-1 rounded text-black" />
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-1 rounded">S'inscrire</button>
        </form>
        <p className="text-center text-sm">MintyShirt est propulsé par Story Protocol</p>
      </div>
    </footer>
  );
}
