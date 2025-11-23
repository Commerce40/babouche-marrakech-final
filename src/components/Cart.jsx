import { useCart } from '../contexts/CartContext';
import  PRODUCTS  from '../utils/products';

export const Cart = ({ lang, t, onShowToast }) => {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const handleSendOrder = () => {
    if (cart.length === 0) return;

    // TRACK InitiateCheckout
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: cart.map(
          item => PRODUCTS.find(p => p.id === item.productId)?.sku
        ),
        value: cartTotal,
        currency: 'XOF',
        num_items: cart.reduce((acc, item) => acc + item.qty, 0),
      });
    }

    let message = `*${t('siteTitle')}*\n\n`;

    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      message += `• ${product.title[lang]} — ${item.qty}x (${item.options.color}, ${item.options.size})\n`;
    });

    message += `\n*Total :* ${cartTotal} XOF`;

    const waUrl = `https://wa.me/212691644047?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="cart-page">
      <h2>{t('cart')}</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cart.map(item => {
            const product = PRODUCTS.find(p => p.id === item.productId);
            return (
              <div key={item.productId} className="cart-item">
                <p><b>{product.title[lang]}</b></p>
                <p>{product.price} XOF</p>

                <p>Couleur : {item.options.color}</p>
                <p>Taille : {item.options.size}</p>

                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={e => updateQty(item.productId, parseInt(e.target.value))}
                />

                <button onClick={() => removeFromCart(item.productId)}>Supprimer</button>
              </div>
            );
          })}

          <h3>Total : {cartTotal} XOF</h3>

          <button onClick={handleSendOrder}>
            Envoyer la commande sur WhatsApp
          </button>
        </>
      )}
    </div>
  );
};
