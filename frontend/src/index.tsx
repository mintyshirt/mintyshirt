import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Web3Provider } from './Web3Context';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <Web3Provider>
            <App />
          </Web3Provider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
