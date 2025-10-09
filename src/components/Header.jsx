import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAudio } from '../contexts/AudioContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '/Babouche-Marrakech.png';

const CONTACT_WHATSAPP = "https://wa.me/221761421653?text=";

const LangButton = ({ code, label, currentLang, setLang }) => (
  <button
    onClick={() => setLang(code)}
    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
      currentLang === code 
        ? 'bg-indigo-600 text-white shadow-sm' 
        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

export const Header = ({ lang, setLang, t }) => {
  const { cart, cartIconRef } = useCart();
  const { isMuted, toggleMute } = useAudio();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const navLinkClasses = ({ isActive }) => 
    `hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600'}`;
  
  const cartLinkClasses = ({ isActive }) => 
    `relative transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`;

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoImage} alt="Logo Babouche Marrakech" className="w-10 h-10" />
          {/* La </div> a été supprimée d'ici */}
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Babouche Marrakech</h1>
            <p className="text-xs text-gray-500">Babouches Royales</p>
          </div>
        </Link>
        
        <div className="hidden md:flex gap-8 font-medium items-center">
            <NavLink to="/" className={navLinkClasses}>Accueil</NavLink>
            <NavLink to="/collection" className={navLinkClasses}>Collection</NavLink>
            <NavLink to="/a-propos" className={navLinkClasses}>Notre Histoire</NavLink>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex rounded-md shadow-sm" role="group">
            <LangButton code="fr" label="FR" currentLang={lang} setLang={setLang} />
            <LangButton code="ar" label="AR" currentLang={lang} setLang={setLang} />
            <LangButton code="wo" label="WO" currentLang={lang} setLang={setLang} />
          </div>
          
          <motion.button 
            onClick={toggleMute}
            className="relative w-6 h-6 text-gray-600 hover:text-indigo-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Couper le son"
          >
            <AnimatePresence initial={false}>
              {isMuted ? (
                <motion.div key="muted" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                </motion.div>
              ) : (
                <motion.div key="unmuted" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          
          <NavLink to="/panier" className={cartLinkClasses} ref={cartIconRef}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  key={totalItems}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};