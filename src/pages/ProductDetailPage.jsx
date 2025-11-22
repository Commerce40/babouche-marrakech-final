import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../utils/products';

const trackViewContent = (product) => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: product.title.fr,
      content_category: 'Babouche',
      content_ids: [product.sku],
      value: product.price,
      currency: 'XOF',
    });
  }
};

const ProductDetailPage = ({ lang, t, onAddToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  const sizeRef = useRef();
  const otherColorRef = useRef();

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (product) {
      trackViewContent(product);
    }
  }, [product]);

  if (!product) {
    return <div>Produit introuvable</div>;
  }

  const handleAddToCartClick = () => {
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

    const currentOptions = {
      color: finalColor,
      size: sizeRef.current.value,
    };

    onAddToCart(product.id, currentOptions);
  };

  return (
    <div className="product-detail">
      <h1>{product.title[lang]}</h1>

      <img src={product.images[0]} alt={product.title[lang]} />

      <p>{product.description[lang]}</p>

      <p><b>Prix : </b>{product.price} XOF</p>

      <div>
        <label>Taille</label>
        <select ref={sizeRef}>
          {product.sizes.map(size => (
            <option key={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Couleur</label>
        <select
          value={selectedColor || ''}
          onChange={e => setSelectedColor(e.target.value)}
        >
          <option value="">Sélectionner</option>
          {product.colors.map(c => (
            <option key={c}>{c}</option>
          ))}
          <option value="Autre">Autre (personnalisée)</option>
        </select>

        {selectedColor === 'Autre' && (
          <input ref={otherColorRef} type="text" placeholder="Couleur personnalisée" />
        )}
      </div>

      <button onClick={handleAddToCartClick}>Ajouter au panier</button>
    </div>
  );
};

export default ProductDetailPage;
