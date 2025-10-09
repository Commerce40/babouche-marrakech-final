import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Cart } from '../components/Cart';
import { ShoppingCart } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const CartPage = ({ lang, t, onShowToast }) => {
  const { cart } = useCart();

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <title>{t('cart')} - {t('siteTitle')}</title>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4 flex items-center gap-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        >
          <ShoppingCart size={36} className="text-indigo-600" />
          {t('cart')}
        </motion.h1>

        {cart.length === 0 ? (
          <motion.div 
            className="text-center bg-white p-12 rounded-xl border"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }}
          >
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-600 mb-6">{t('emptyCart')}</p>
            <Link 
              to="/collection" 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              {t('viewCollection')}
            </Link>
          </motion.div>
        ) : (
          <Cart lang={lang} t={t} onShowToast={onShowToast} />
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;