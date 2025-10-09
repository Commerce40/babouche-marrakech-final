import React, { useState, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { useCart } from './contexts/CartContext';
import { useAudio } from './contexts/AudioContext';
import { translations } from './utils/translations';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import SizeGuidePage from './pages/SizeGuidePage';
import FaqPage from './pages/FaqPage'; // <-- Importer FAQ
import ReturnPolicyPage from './pages/ReturnPolicyPage'; // <-- Importer Politique de retour

const ProductModal = React.lazy(() =>
  import('./components/ProductModal').then(module => ({ default: module.ProductModal }))
);

const cartSound = new Audio('/sounds/add-to-cart.mp3');
cartSound.volume = 0.5;

export default function App() {
  const [lang, setLang] = useState("fr");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { addToCart, cartIconRef } = useCart();
  const { playWelcomeSound, backgroundMusicRef, welcomeSoundRef } = useAudio();
  const location = useLocation();

  const [flyingImage, setFlyingImage] = useState(null);

  useEffect(() => {
    if (!sessionStorage.getItem('welcomePlayed')) {
      setTimeout(() => {
        playWelcomeSound();
        sessionStorage.setItem('welcomePlayed', 'true');
      }, 1000);
    }
  }, [playWelcomeSound]);

  const t = (key) => translations[lang][key] || translations["fr"][key] || key;

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };
  
  const handleAddToCartWithAnimation = (product, options, startElementRef) => {
    addToCart(product, options);
    showToast(t('addedToCart'));

    cartSound.currentTime = 0;
    cartSound.play().catch(e => console.error("Erreur de lecture du son:", e));

    const startElement = startElementRef.current;
    if (startElement && cartIconRef.current) {
      const startRect = startElement.getBoundingClientRect();
      const endRect = cartIconRef.current.getBoundingClientRect();
      
      setFlyingImage({
        src: product.image,
        startX: startRect.left + startRect.width / 2,
        startY: startRect.top + startRect.height / 2,
        endX: endRect.left + endRect.width / 2,
        endY: endRect.top + endRect.height / 2,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <AnimatePresence>
        {flyingImage && (
          <motion.img
            src={flyingImage.src}
            className="fixed top-0 left-0 w-24 h-24 object-cover rounded-full z-50 shadow-lg bg-white p-1"
            initial={{ x: flyingImage.startX - 48, y: flyingImage.startY - 48, scale: 0.5, opacity: 0.8 }}
            animate={{ x: flyingImage.endX - 24, y: flyingImage.endY - 24, scale: 0.1, opacity: 0.5, rotate: 360 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, duration: 0.8 }}
            onAnimationComplete={() => setFlyingImage(null)}
          />
        )}
      </AnimatePresence>

      <Header lang={lang} setLang={setLang} t={t} />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage t={t} />} />
            <Route 
              path="/collection" 
              element={<CollectionPage 
                lang={lang} 
                t={t} 
                onAddToCart={handleAddToCartWithAnimation} 
              />} 
            />
            <Route 
              path="/produit/:id" 
              element={<ProductDetailPage 
                lang={lang} 
                t={t} 
                onAddToCart={handleAddToCartWithAnimation} 
              />} 
            />
            <Route 
              path="/panier" 
              element={<CartPage 
                lang={lang} 
                t={t} 
                onShowToast={showToast} 
              />} 
            />
            <Route path="/a-propos" element={<AboutPage t={t} />} />
            <Route path="/guide-des-tailles" element={<SizeGuidePage t={t} />} />
            <Route path="/faq" element={<FaqPage t={t} />} />
            <Route path="/politique-de-retour" element={<ReturnPolicyPage t={t} />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
      
      <Suspense fallback={<div />}>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            lang={lang}
            t={t}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCartWithAnimation}
          />
        )}
      </Suspense>
      
      <Toast message={toast.message} show={toast.show} />

      <audio ref={backgroundMusicRef} src="/sounds/background-music.mp3" loop />
      <audio ref={welcomeSoundRef} src="/sounds/welcome-voice.mp3" />
    </div>
  );
}