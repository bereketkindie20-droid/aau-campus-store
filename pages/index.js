import React, { useState } from 'react';
import Head from 'next/head';

const PRODUCTS = [
  {
    id: 1,
    name: 'Smart Phone 128GB',
    price: 28000,
    category: 'Phones & Audio',
    image: '/images/phone-front.jpg', // Local image path in public/images/
    gallery: [
      { label: 'Front', icon: '/images/phone-front.jpg', desc: '6.7-inch OLED Super Retina HD Display' },
      { label: 'Camera', icon: '📸', desc: 'Triple Lens Matrix 48MP AI Camera System' },
      { label: 'Back', icon: '📲', desc: 'Matte glass back finish' }
    ],
    badge: 'POPULAR',
    desc: '128GB storage, crisp HD display, long battery life.'
  },
  {
    id: 2,
    name: 'Wireless Earbuds Pro',
    price: 3500,
    category: 'Phones & Audio',
    image: '🎧',
    gallery: [
      { label: 'Case', icon: '🎧', desc: 'Sleek matte wireless charging case' },
      { label: 'Buds', icon: '🎵', desc: 'Ergonomic silicone tips for active noise isolation' }
    ],
    badge: 'BESTSELLER',
    desc: 'Active noise cancellation with 24h total battery life.'
  },
  {
    id: 3,
    name: 'Oversized Streetwear Hoodie',
    price: 2200,
    category: 'Fashion & Apparel',
    image: '🧥',
    gallery: [
      { label: 'Front', icon: '🧥', desc: 'Heavyweight premium cotton fleece build' },
      { label: 'Detail', icon: '🧵', desc: 'Reinforced double-stitched hem and cuff design' }
    ],
    badge: 'NEW',
    desc: 'Premium fleece cotton, available in L and XL sizes.'
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    price: 1800,
    category: 'Daily Essentials',
    image: '💡',
    gallery: [
      { label: 'Lamp', icon: '💡', desc: '3-stage touch dimmable warm LED bar' }
    ],
    badge: '',
    desc: '3 brightness modes, USB rechargeable battery.'
  }
];

const CATEGORIES = ['All', 'Phones & Audio', 'Fashion & Apparel', 'Daily Essentials'];

const TAGS = ['All', 'POPULAR', 'BESTSELLER', 'NEW'];

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr', info: 'Fast 1-click payment' },
  { id: 'cbe', name: 'CBE Birr / CBE Transfer', info: 'Direct bank transfer' },
  { id: 'cash', name: 'Cash on Delivery', info: 'Pay upon handoff' }
];

// Helper component to render either an image file or an emoji string
const ProductMedia = ({ src, alt = '', size = '32px' }) => {
  if (src && (src.startsWith('/') || src.startsWith('http'))) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ width: size, height: size, objectFit: 'contain', borderRadius: '8px' }}
      />
    );
  }
  return <span style={{ fontSize: size }}>{src}</span>;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [customerInfo, setCustomerInfo] = useState({ name: '', contact: '', location: '' });

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesTag = selectedTag === 'All' || product.badge === selectedTag;
    return matchesCategory && matchesTag;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFinalCheckout = () => {
    if (!customerInfo.name || !customerInfo.contact || !customerInfo.location) {
      alert('Please fill in your name, contact number, and location before ordering.');
      return;
    }

    const selectedPaymentObj = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || 'Telebirr';
    const orderId = `YESHI-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = cart.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price * item.quantity} ETB`).join('\n');

    const messageText = `🛍️ NEW YESHI MARKET ORDER (${orderId})\n\n` +
      `👤 Name: ${customerInfo.name}\n` +
      `📞 Contact: ${customerInfo.contact}\n` +
      `📍 Location: ${customerInfo.location}\n` +
      `💳 Payment Method: ${selectedPaymentObj}\n\n` +
      `📦 Items:\n${itemsList}\n\n` +
      `💰 Total: ${cartTotal} ETB`;

    const telegramUrl = `https://t.me/bekivisuals1221?text=${encodeURIComponent(messageText)}`;
    window.location.href = telegramUrl;
  };

  const currentAngle = selectedProduct?.gallery?.[activeAngleIndex] || {
    icon: selectedProduct?.image,
    desc: selectedProduct?.desc
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '16px' }}>
      <Head>
        <title>Yeshi Market - Online Shopping</title>
        <meta name="description" content="Yeshi Market Online Store" />
      </Head>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#0f172a', margin: '0 0 4px 0', fontSize: '22px' }}>Yeshi Market</h1>
          <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '13px' }}>Tech • Fashion • Apparel • Daily Essentials</p>
          <a href="https://t.me/bekivisuals1221" target="_blank" rel="noreferrer" style={{ backgroundColor: '#0088cc', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
            💬 Support: @bekivisuals1221
          </a>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === cat ? '#0f172a' : '#e2e8f0',
                color: selectedCategory === cat ? '#fff' : '#475569',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                padding: '4px 10px',
                borderRadius: '12px',
                border: '1px solid',
                borderColor: selectedTag === tag ? '#2563eb' : '#cbd5e1',
                backgroundColor: selectedTag === tag ? '#eff6ff' : '#fff',
                color: selectedTag === tag ? '#2563eb' : '#64748b',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {tag === 'All' ? '🏷️ All Tags' : `# ${tag}`}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '80px' }}>
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {item.badge && (
                  <span style={{ fontSize: '9px', fontWeight: 'bold', background: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: '4px' }}>
                    {item.badge}
                  </span>
                )}
                <div style={{ margin: '12px 0', textAlign: 'center' }}>
                  <ProductMedia src={item.image} alt={item.name} size="48px" />
                </div>
                <h3 style={{ fontSize: '14px', margin: '0 0 4px 0', color: '#0f172a' }}>{item.name}</h3>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>{item.desc}</p>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0' }}>{item.price} ETB</p>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => { setSelectedProduct(item); setActiveAngleIndex(0); }}
                  style={{ flex: 1, padding: '6px', background: '#f1f5f9', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
                >
                  View
                </button>
                <button
                  onClick={() => addToCart(item)}
                  style={{ flex: 1, padding: '6px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cart Button Bar */}
        {cart.length > 0 && (
          <div style={{ position: 'fixed', bottom: '16px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: '448px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '16px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{cart.reduce((a, c) => a + c.quantity, 0)} Items</p>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{cartTotal} ETB</p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
            >
              Checkout 🛒
            </button>
          </div>
        )}

        {/* Product Angle / Detail Modal */}
        {selectedProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', margin: 0 }}>{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ textAlign: 'center', background: '#f8fafc', padding: '24px', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer' }} onClick={() => setIsZoomModalOpen(true)}>
                <ProductMedia src={currentAngle?.icon} alt={selectedProduct.name} size="96px" />
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>🔍 Tap image to zoom preview</p>
              </div>

              <p style={{ fontSize: '13px', color: '#334155', marginBottom: '12px', textAlign: 'center' }}>
                {currentAngle?.desc || selectedProduct.desc}
              </p>

              {/* Angle Gallery Selector */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                  {selectedProduct.gallery.map((angle, idx) => (
                    <button
                      key={angle.label}
                      onClick={() => setActiveAngleIndex(idx)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: activeAngleIndex === idx ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        background: activeAngleIndex === idx ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ProductMedia src={angle.icon} alt={angle.label} size="16px" />
                      <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{angle.label}</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                style={{ width: '100%', padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add to Order ({selectedProduct.price} ETB)
              </button>
            </div>
          </div>
        )}

        {/* Zoom Modal */}
        {isZoomModalOpen && selectedProduct && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 110 }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ margin: '20px 0' }}>
                <ProductMedia src={currentAngle?.icon} alt={selectedProduct.name} size="180px" />
              </div>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>{currentAngle?.desc}</p>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                style={{ padding: '8px 24px', backgroundColor: '#fff', color: '#0f172a', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Close Zoom
              </button>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '16px', margin: 0 }}>Checkout Order</h2>
                <button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
              </div>

              {/* Items List */}
              <div style={{ marginBottom: '16px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>{item.name}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: '#64748b' }}>{item.quantity} x {item.price} ETB</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
                  </div>
                ))}
                <p style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '15px', marginTop: '12px' }}>Total: {cartTotal} ETB</p>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Phone Number / Telegram Handle"
                  value={customerInfo.contact}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, contact: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Delivery Location / Address"
                  value={customerInfo.location}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, location: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', color: '#475569' }}>Payment Method:</p>
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: paymentMethod === method.id ? '1px solid #2563eb' : '1px solid #e2e8f0',
                      marginBottom: '6px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <div>
                      <span style={{ fontWeight: 'bold' }}>{method.name}</span>
                      <span style={{ color: '#64748b', marginLeft: '6px' }}>({method.info})</span>
                    </div>
                  </label>
                ))}
              </div>

              <button
                onClick={handleFinalCheckout}
                style={{ width: '100%', padding: '12px', backgroundColor: '#0088cc', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
              >
                Send Order via Telegram 📲
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
