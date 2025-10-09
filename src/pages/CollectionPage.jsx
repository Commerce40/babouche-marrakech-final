import React from 'react';
import { motion } from 'framer-motion';
import { ProductList } from '../components/ProductList';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const CollectionPage = ({ lang, t, onAddToCart }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <title>{t('collectionTitle')} - {t('siteTitle')}</title>
      <meta name="description" content={`Découvrez notre collection de babouches royales.`} />
      <ProductList 
        lang={lang} 
        t={t} 
        onAddToCart={onAddToCart} 
      />
    </motion.div>
  );
};

export default CollectionPage;