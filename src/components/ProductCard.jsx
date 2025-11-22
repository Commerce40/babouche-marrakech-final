import ProductCard from './ProductCard';

const ProductCard = ({ product, lang, onAddToCart }) => {
  const handleAdd = () => {

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
      color: product.colors[0],
      size: product.sizes[0]
    });
  };

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title[lang]} />
      <h3>{product.title[lang]}</h3>
      <p>{product.price} XOF</p>
      <button onClick={handleAdd}>Ajouter au panier</button>
    </div>
  );
};

export default ProductCard;
