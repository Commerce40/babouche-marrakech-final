import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { AudioProvider } from './contexts/AudioContext'; // <-- Importer
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider> {/* <-- Entourer l'application */}
        <CartProvider>
          <App />
        </CartProvider>
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);