import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3Provider } from './contexts/Web3Context';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <LanguageProvider>
        <Web3Provider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Web3Provider>
      </LanguageProvider>
    </React.StrictMode>
  );
}
