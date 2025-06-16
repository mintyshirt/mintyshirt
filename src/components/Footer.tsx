import React from 'react';
import { FaYoutube, FaTiktok, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useTranslations } from '../contexts/LanguageContext';

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-[#2C1D59] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-wrap justify-center space-x-4">
          <a href="#" className="hover:underline">{t.footer.about}</a>
          <a href="#" className="hover:underline">{t.footer.faq}</a>
          <a href="#" className="hover:underline">{t.footer.contact}</a>
          <a href="#" className="hover:underline">{t.footer.terms}</a>
          <a href="#" className="hover:underline">{t.footer.legal}</a>
          <a href="#" className="hover:underline">{t.footer.affiliate}</a>
        </div>
        <div className="flex justify-center space-x-4 text-2xl">
          <a href="#" aria-label="YouTube" className="hover:text-purple-300"><FaYoutube /></a>
          <a href="#" aria-label="TikTok" className="hover:text-purple-300"><FaTiktok /></a>
          <a href="#" aria-label="Instagram" className="hover:text-purple-300"><FaInstagram /></a>
          <a href="#" aria-label="X" className="hover:text-purple-300"><FaTwitter /></a>
          <a href="#" aria-label="Facebook" className="hover:text-purple-300"><FaFacebook /></a>
        </div>
        <form className="flex justify-center space-x-2">
          <input type="email" placeholder={t.footer.emailPlaceholder} className="px-2 py-1 rounded text-black" />
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-1 rounded">{t.footer.subscribe}</button>
        </form>
        <p className="text-center text-sm">{t.footer.poweredBy}</p>
      </div>
    </footer>
  );
}
