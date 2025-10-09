import React from 'react';
import ReactDOM from 'react-dom/client';
// On importe HashRouter au lieu de BrowserRouter
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { AudioProvider } from './contexts/AudioContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* On remplace BrowserRouter par HashRouter */}
    <HashRouter>
      <AudioProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AudioProvider>
    </HashRouter>
  </React.StrictMode>
);