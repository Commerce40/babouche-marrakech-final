import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/Babouche-Marrakech.png" alt="Logo Babouche Marrakech" className="w-8 h-8" />
              <span className="font-bold text-gray-900">Babouche Marrakech</span>
            </div>
            <p className="text-sm text-gray-500">L'élégance royale du Maroc à vos pieds.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-indigo-600">Accueil</Link></li>
              <li><Link to="/collection" className="hover:text-indigo-600">Collection</Link></li>
              <li><Link to="/a-propos" className="hover:text-indigo-600">Notre Histoire</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Aide & Infos</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/faq" className="hover:text-indigo-600">FAQ</Link></li>
              <li><Link to="/guide-des-tailles" className="hover:text-indigo-600">Guide des tailles</Link></li>
              <li><Link to="/politique-de-retour" className="hover:text-indigo-600">Politique de retour</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Suivez-nous</h4>
            <div className="flex gap-4 text-gray-500">
              <a href="https://instagram.com/babouche_marrakech_?=" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-900" aria-label="Facebook">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Babouche Marrakech — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};