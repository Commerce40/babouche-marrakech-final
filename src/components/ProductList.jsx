import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../utils/products';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ProductList = ({ lang, t, onAddToCart }) => {
  return (
    <section id="collection" className="mb-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('collectionTitle')}</h3>
        <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            lang={lang}
            t={t}
            onAddToCart={onAddToCart}
          />
        ))}
      </motion.div>
    </section>
  );
};
