import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ProductModal = ({ product, lang, t, onClose, onAddToCart }) => {
  const colorRef = useRef();
  const sizeRef = useRef();
  const modalRef = useRef();
  const imageRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  const handlePrint = () => {
  };

  const handleAddToCart = () => {
    const options = {
      color: colorRef.current.value,
      size: sizeRef.current.value
    };
    onAddToCart(product, options, imageRef); 
    onClose();
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative" 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur rounded-full p-2 text-gray-500 hover:text-gray-900 hover:bg-white transition-colors" aria-label={t('close')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-100 h-64 md:h-auto flex items-center justify-center p-8">
            <img
              ref={imageRef}
              src={product.image}
              alt={product.title[lang] || product.title.fr}
              className="object-contain max-h-full max-w-full drop-shadow-xl"
            />
          </div>
          
          <div className="p-8 flex flex-col">
            <div className="text-sm text-gray-500 font-mono mb-2">Ref: {product.sku}</div>
            <h4 className="text-3xl font-bold text-gray-900 leading-tight">{product.title[lang] || product.title.fr}</h4>
            <div className="mt-4 text-3xl font-extrabold text-indigo-600">{product.price} €</div>
            
            <p className="mt-6 text-gray-700 leading-relaxed flex-grow border-t border-gray-100 pt-4">
              {product.description[lang] || product.description.fr}
            </p>
            
            <div className="mt-8 bg-gray-50 p-5 rounded-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('color')}</label>
                  <select ref={colorRef} className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="Standard">
                    <option>Standard</option><option>Or</option><option>Bleu</option><option>Rouge</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('size')}</label>
                  <select ref={sizeRef} className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="40">
                    <option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option>
                  </select>
                </div>
              </div>
              
              <motion.button 
                onClick={handleAddToCart} 
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                {t('addToCart')}
              </motion.button>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 text-sm">
              <button onClick={handlePrint} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                {t('printable')}
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 px-4">
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};