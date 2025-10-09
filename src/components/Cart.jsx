import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { PRODUCTS } from '../utils/products';

const CONTACT_WHATSAPP = "https://wa.me/221761421653?text=";

export const Cart = ({ lang, t, onShowToast }) => {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [error, setError] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('fr-SN').format(price);

  const handleSendOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      setError(t('formValidation'));
      return;
    }
    setError('');

    let message = `*${t('siteTitle')}*\n`;
    message += `------------------\n`;
    message += `*${t('checkout')}*\n\n`;

    cart.forEach((it, idx) => {
      const p = PRODUCTS.find((x) => x.id === it.productId);
      const title = p ? (p.title[lang] || p.title['fr']) : it.productId;
      message += `*${idx + 1}. ${title}*\n`;
      message += `   ${t('qty')}: ${it.qty} | ${t('color')}: ${it.color} | ${t('size')}: ${it.size}\n`;
    });

    message += `\n------------------\n`;
    message += `*Total: ${formatPrice(cartTotal)} FCFA*\n`;
    message += `------------------\n\n`;

    message += `*Client:*\n`;
    message += `👤 ${t('name')}: ${form.name}\n`;
    message += `📱 ${t('phone')}: ${form.phone}\n`;
    message += `📍 ${t('address')}: ${form.address}\n`;
    if (form.note) message += `📝 ${t('note')}: ${form.note}`;

    const waUrl = CONTACT_WHATSAPP + encodeURIComponent(message);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="space-y-4 mb-6">
        {cart.map((it, idx) => {
          const p = PRODUCTS.find((x) => x.id === it.productId);
          if (!p) return null;
          return (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border rounded-lg p-3 hover:border-gray-300 transition-colors group">
              <div className="flex items-center gap-3">
                <img src={p.image} alt="" className="w-12 h-12 rounded object-cover bg-gray-100" />
                <div>
                  <div className="font-semibold text-gray-900">{p.title[lang] || p.title.fr}</div>
                  <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap gap-2">
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{it.color}</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">{it.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                <div className="flex items-center border rounded-md">
                  <button onClick={() => updateQty(idx, Math.max(1, it.qty - 1))} className="px-2 py-1 text-gray-500 hover:bg-gray-100">-</button>
                  <input 
                    type="number" 
                    className="w-10 text-center border-x py-1 text-sm hide-arrows font-medium" 
                    value={it.qty} 
                    onChange={(e) => updateQty(idx, Math.max(1, Number(e.target.value)))} 
                  />
                  <button onClick={() => updateQty(idx, it.qty + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-100">+</button>
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="font-bold text-gray-900">{formatPrice(p.price * it.qty)} FCFA</div>
                  <button onClick={() => removeFromCart(idx)} className="text-xs text-red-500 hover:text-red-700 hover:underline mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between font-bold text-lg py-4 border-t border-b border-gray-100 bg-gray-50/50 rounded-lg px-4">
        <div>Total</div>
        <div className="text-indigo-700">{formatPrice(cartTotal)} FCFA</div>
      </div>
      
      <div className="mt-8">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          {t('checkout')}
        </h4>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('name')} *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('phone')} *</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('address')} *</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows="2" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">{t('note')}</label>
            <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" placeholder="Optionnel..." />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
            <button onClick={handleSendOrder} className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                {t('sendOrder')}
            </button>
            <button onClick={() => { clearCart(); onShowToast(t('cartCleared')); }} className="px-4 py-3 text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-600 transition-colors text-sm">
                {t('clearCart')}
            </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Commande sécurisée via WhatsApp
        </p>
      </div>
    </div>
  );
};