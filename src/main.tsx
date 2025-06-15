import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3Provider } from './contexts/Web3Context';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Web3Provider>
        <App />
      </Web3Provider>
    </React.StrictMode>
  );
}
