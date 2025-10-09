import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductOptions } from '../hooks/useProductOptions';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

export const ProductCard = ({ product, lang, t, onAddToCart }) => {
  const cardRef = useRef(null);
  const { getOptions } = useProductOptions();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-SN').format(price);
  };

  return (
    <motion.article variants={cardVariants} ref={cardRef}>
      <Link 
        to={`/produit/${product.id}`}
        className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 overflow-hidden flex flex-col h-full"
      >
        <div className="relative h-64 bg-gray-100 overflow-hidden" data-product-image-container>
          {product.oldPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              PROMO
            </div>
          )}
          <motion.img
            src={product.image}
            alt={product.title[lang] || product.title.fr}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {product.title[lang] || product.title.fr}
          </h4>
          
          {product.shippingInfo && (
            <p className="text-xs font-semibold text-green-600 mt-1">{product.shippingInfo}</p>
          )}
          {product.specialOffer && (
            <p className="text-xs font-semibold text-indigo-600 mt-1">{product.specialOffer}</p>
          )}

          <div className="flex-grow"></div>
          
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
            <div>
              {product.oldPrice ? (
                <>
                  <p className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)} FCFA</p>
                  <p className="text-xl font-extrabold text-red-600">{formatPrice(product.price)} FCFA</p>
                </>
              ) : (
                <p className="text-xl font-extrabold text-gray-900">{formatPrice(product.price)} FCFA</p>
              )}
            </div>
            <motion.button 
              onClick={(e) => {
                e.preventDefault();
                const savedOptions = getOptions(product.id); 
                onAddToCart(product, savedOptions, cardRef);
              }}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              {t('addToCart')}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};