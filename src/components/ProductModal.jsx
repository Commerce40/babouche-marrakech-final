import { useRef, useState } from 'react';

const ProductModal = ({ product, lang, onAddToCart, onClose }) => {
  const sizeRef = useRef();
  const otherColorRef = useRef();
  const [selectedColor, setSelectedColor] = useState('');

  const handleAdd = () => {
    const finalColor =
      selectedColor === 'Autre'
        ? (otherColorRef.current?.value || 'Couleur personnalisée')
        : selectedColor;

    // TRACK AddToCart
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_name: product.title.fr,
        content_category: 'Babouche',
        content_ids: [product.sku],
        value: product.price,
        currency: 'XOF',
        num_items: 1,
      });
    }

    onAddToCart(product.id, {
      color: finalColor,
      size: sizeRef.current.value
    });

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.title[lang]}</h2>

        <div>
          <label>Couleur</label>
          <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
            <option value="">Sélectionner</option>
            {product.colors.map(c => (
              <option key={c}>{c}</option>
            ))}
            <option value="Autre">Autre</option>
          </select>

          {selectedColor === 'Autre' && (
            <input ref={otherColorRef} type="text" placeholder="Couleur personnalisée" />
          )}
        </div>

        <div>
          <label>Taille</label>
          <select ref={sizeRef}>
            {product.sizes.map(size => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </div>

        <button onClick={handleAdd}>Ajouter au panier</button>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default ProductModal;
