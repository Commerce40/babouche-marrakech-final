import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../utils/products';
import { useProductOptions } from '../hooks/useProductOptions';
import { Feather, ShieldCheck, Truck } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.95 },
};

const pageTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

const ProductDetailPage = ({ lang, t, onAddToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  const [mainImage, setMainImage] = useState(product ? product.image : '');
  const [selectedColor, setSelectedColor] = useState('Standard');

  const { saveOptions, getOptions } = useProductOptions();
  const colorRef = useRef();
  const sizeRef = useRef();
  const otherColorRef = useRef();

  const savedOptions = product ? getOptions(product.id) : { color: 'Standard', size: '40' };
  const similarProducts = product ? PRODUCTS.filter(p => p.id !== parseInt(id)).slice(0, 3) : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-SN').format(price);
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Produit non trouvé</h1>
        <Link to="/collection" className="mt-4 inline-block text-indigo-600 hover:underline">
          Retour à la collection
        </Link>
      </div>
    );
  }

  const handleAddToCartClick = () => {
    const finalColor = selectedColor === 'Autre'
      ? (otherColorRef.current?.value || 'Couleur personnalisée')
      : selectedColor;

    const currentOptions = {
      color: finalColor,
      size: sizeRef.current.value
    };
    saveOptions(product.id, currentOptions);
    const imageContainerRef = { current: document.getElementById('main-product-image') };
    onAddToCart(product, currentOptions, imageContainerRef);
  };
  
  const title = product.title[lang] || product.title.fr;
  const description = product.description[lang] || product.description.fr;

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="max-w-5xl mx-auto px-4 py-12"
      >
        <title>{title} - {t('siteTitle')}</title>
        <meta name="description" content={description} />
        
        <div className="text-sm mb-4">
          <Link to="/collection" className="text-gray-500 hover:text-indigo-600 transition-colors">
            &larr; Retour à la collection
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <div>
            <div 
              id="main-product-image"
              className="relative bg-gray-100 rounded-xl flex items-center justify-center p-8 aspect-square overflow-hidden"
            >
              {product.oldPrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  PROMOTION
                </div>
              )}
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainImage}
                  src={mainImage}
                  alt={title}
                  className="object-contain max-h-full max-w-full drop-shadow-xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.gallery && product.gallery.map((imgSrc, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(imgSrc)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 ${mainImage === imgSrc ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img src={imgSrc} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
            
            <div className="mt-4 flex items-baseline gap-4">
              {product.oldPrice ? (
                <>
                  <p className="text-2xl text-gray-400 line-through">{formatPrice(product.oldPrice)} FCFA</p>
                  <p className="text-4xl font-extrabold text-red-600">{formatPrice(product.price)} FCFA</p>
                </>
              ) : (
                <p className="text-4xl font-extrabold text-indigo-600">{formatPrice(product.price)} FCFA</p>
              )}
            </div>
            
            {product.shippingInfo && (
              <p className="text-sm font-semibold text-green-600 mt-2">{product.shippingInfo}</p>
            )}
            {product.specialOffer && (
              <p className="text-sm font-semibold text-indigo-600 mt-2">{product.specialOffer}</p>
            )}

            <p className="mt-6 text-gray-700 leading-relaxed border-t pt-6">{description}</p>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Feather size={20} className="text-indigo-500" />
                <span className="font-medium">Confort & Légèreté</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <ShieldCheck size={20} className="text-indigo-500" />
                <span className="font-medium">Qualité Artisanale Garantie</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Truck size={20} className="text-indigo-500" />
                <span className="font-medium">Livraison Rapide sur Dakar</span>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-5 rounded-xl border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('color')}</label>
                  <select 
                    ref={colorRef} 
                    className="w-full border-gray-300 rounded-lg" 
                    defaultValue={savedOptions.color}
                    onChange={(e) => setSelectedColor(e.target.value)}
                  >
                    <option>Standard</option>
                    <option>Jaune</option>
                    <option>Bleu</option>
                    <option>Blanc</option>
                    <option>Rouge</option>
                    <option>Vert</option>
                    <option>Noir</option>
                    <option value="Autre">Autre couleur...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('size')}</label>
                  <select ref={sizeRef} className="w-full border-gray-300 rounded-lg" defaultValue={savedOptions.size}>
                    <option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option>
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {selectedColor === 'Autre' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3 } }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.3 } }}
                    className="mb-4"
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Précisez la couleur</label>
                    <input
                      ref={otherColorRef}
                      type="text"
                      className="w-full border-gray-300 rounded-lg"
                      placeholder="Ex: Marron, Bordeaux..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button 
                onClick={handleAddToCartClick} 
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('addToCart')}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 py-16 mt-16 border-t">
        <h3 className="text-2xl font-bold text-center mb-8">Vous aimerez aussi</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarProducts.map(similarProduct => (
            <motion.div
              key={similarProduct.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + similarProduct.id * 0.1 }}
            >
              <Link to={`/produit/${similarProduct.id}`} className="group block">
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square">
                  <img 
                    src={similarProduct.image} 
                    alt={similarProduct.title.fr} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="mt-4 font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {similarProduct.title[lang] || similarProduct.title.fr}
                </h4>
                <p className="mt-1 text-gray-600 font-bold">{formatPrice(similarProduct.price)} FCFA</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;