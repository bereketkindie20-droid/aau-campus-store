import React, { useState } from 'react';

const PRODUCTS = [
  // Phones & Audio
  { id: 1, name: 'Smart Phone 128GB', price: 28000, category: 'Phones & Audio', image: '📱', badge: 'POPULAR' },
  { id: 2, name: 'AirPods Pro (Noise Cancelling)', price: 3200, category: 'Phones & Audio', image: '🎧', badge: 'HOT' },
  { id: 3, name: 'Wireless Over-Ear Headset', price: 1800, category: 'Phones & Audio', image: '🎧' },
  { id: 4, name: 'Fast Charger Cable + Adapter', price: 550, category: 'Phones & Audio', image: '🔌' },

  // Tech & Wearables
  { id: 5, name: 'Smart Watch Series 8', price: 2500, category: 'Tech & Wearables', image: '⌚', badge: 'NEW' },
  { id: 6, name: '20,000mAh Heavy Duty Power Bank', price: 1800, category: 'Tech & Wearables', image: '🔋', badge: 'HOT' },
  { id: 7, name: 'USB-C Multi-Port Laptop Hub', price: 1200, category: 'Tech & Wearables', image: '💻' },

  // Clothing & Apparel
  { id: 8, name: 'Oversized Streetwear Hoodie / Jacket', price: 2200, category: 'Clothing & Apparel', image: '🧥', badge: 'TRENDING' },
  { id: 9, name: 'Wide-Leg Baggy Jeans (Blue)', price: 1800, category: 'Clothing & Apparel', image: '👖' },
  { id: 10, name: 'Campus Sneakers / Running Shoes', price: 3500, category: 'Clothing & Apparel', image: '👟' },

  // Footwear & Style Accessories
  { id: 11, name: 'Casual Canvas Shoes', price: 2400, category: 'Footwear & Style', image: '👟' },
  { id: 12, name: 'Long-Lasting Fresh Campus Perfume (50ml)', price: 1100, category: 'Footwear & Style', image: '✨' },
  { id: 13, name: 'Canvas Tote Bag for Lectures', price: 650, category: 'Footwear & Style', image: '🛍️' },

  // Dorm & Academic Essentials
  { id: 14, name: 'Dorm LED Desk Study Lamp', price: 850, category: 'Dorm Essentials', image: '💡' },
  { id: 15, name: 'Compact Electric Kettle 1.5L', price: 1400, category: 'Dorm Essentials', image: '🫖', badge: 'MUST HAVE' },
  { id: 16, name: 'A4 Notebook & Pen Bundle', price: 300, category: 'Dorm Essentials', image: '📝' },
];

const CATEGORIES = ['All', 'Phones & Audio', 'Tech & Wearables', 'Clothing & Apparel', 'Footwear & Style', 'Dorm Essentials'];

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr', icon: '📱' },
  { id: 'cbe', name: 'CBE Birr', icon: '🏦' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentInfo, setStudentInfo] = useState({ name: '', contact: '', campus: '' });
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 2200);
  };

  const scrollToCheckout = () => {
    setTimeout(() => {
      const checkoutElement = document.getElementById('checkout-section');
      if (checkoutElement) {
        checkoutElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    showToast(`✅ Added ${product.name} to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleReviewOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!studentInfo.name || !studentInfo.contact || !studentInfo.campus) {
      alert('Please fill in your Name, Phone/Telegram, and Campus details.');
      return;
    }
    setShowModal(true);
  };

  const handleFinalCheckout = () => {
    const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || 'Telebirr';
    const orderId = `AAU-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = cart.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price * item.quantity} ETB`).join('\n');

    const messageText = `🛍️ NEW AAU STORE ORDER (${orderId})\n\n` +
      `👤 Name: ${studentInfo.name}\n` +
      `📞 Contact: ${studentInfo.contact}\n` +
      `📍 Location: ${studentInfo.campus}\n` +
      `💳 Payment Method: ${selectedPayment}\n\n` +
      `📦 Items:\n${itemsList}\n\n` +
      `💰 Total: ${cartTotal} ETB`;

    const telegramUrl = `https://t.me/bekivisuals1221?text=${encodeURIComponent(messageText)}`;
    
    window.location.href = telegramUrl;
  };

  return (
    <div style={{ padding: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', maxWidth: '600px', margin: '0 auto', position: 'relative', paddingBottom: '80px' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#0f172a',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '13px',
          fontWeight: '600',
          zIndex: 1000,
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#0f172a', margin: '0 0 4px 0', fontSize: '22px' }}>AAU Campus Store</h1>
        <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '13px' }}>Tech • Fashion • Apparel • Dorm Essentials</p>
        <a href="https://t.me/bekivisuals1221" target="_blank" rel="noreferrer" style={{ backgroundColor: '#0088cc', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
          💬 Support: @bekivisuals1221
        </a>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '12px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff', boxSizing: 'border-box' }} 
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', WebkitOverflowScrolling: 'touch' }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: activeCategory === cat ? '#2563eb' : '#fff', color: activeCategory === cat ? '#fff' : '#475569', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '32px', background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>{item.image}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: '0', fontSize: '14px', color: '#0f172a' }}>{item.name}</h4>
                  {item.badge && (
                    <span style={{ fontSize: '9px', fontWeight: 'bold', background: '#ef4444', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '4px 0 0', fontSize: '14px' }}>{item.price} ETB</p>
              </div>
            </div>
            <button onClick={() => addToCart(item)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
              + Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart & Checkout Form Section */}
      <div id="checkout-section" style={{ marginTop: '24px', padding: '16px', background: '#fff', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', color: '#0f172a' }}>🛒 Cart ({cartItemCount} items)</h3>
        {cart.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0' }}>Your cart is empty. Tap "+ Add" on any item above.</p>
        ) : (
          <div>
            {cart.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <p style={{ margin: '0', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{c.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#2563eb' }}>{c.price} ETB × {c.quantity} = {c.price * c.quantity} ETB</p>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(c.id, -1)} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.id, 1)} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                  <button onClick={() => removeFromCart(c.id)} style={{ width: '26px', height: '26px', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontSize: '12px', marginLeft: '4px' }}>✕</button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '2px solid #f1f5f9' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>Total Amount:</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a' }}>{cartTotal} ETB</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <input type="text" placeholder="Full Name" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} />
              <input type="text" placeholder="Phone Number / Telegram" value={studentInfo.contact} onChange={(e) => setStudentInfo({ ...studentInfo, contact: e.target.value })} style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} />
              <input type="text" placeholder="Campus / Dorm Location" value={studentInfo.campus} onChange={(e) => setStudentInfo({ ...studentInfo, campus: e.target.value })} style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} />

              {/* Payment Method Selector */}
              <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>
                  Select Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '8px',
                        border: paymentMethod === method.id ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: paymentMethod === method.id ? '#eff6ff' : '#fff',
                        color: paymentMethod === method.id ? '#1d4ed8' : '#475569',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{method.icon}</span>
                      {method.name}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleReviewOrder} style={{ background: '#16a34a', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '8px', boxShadow: '0 2px 4px rgba(22,163,74,0.2)' }}>
                Review & Order via Telegram
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Quick Cart Button */}
      {cartItemCount > 0 && (
        <button
          onClick={scrollToCheckout}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            padding: '12px 20px',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            cursor: 'pointer',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🛒 View Cart ({cartItemCount})</span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px' }}>
            {cartTotal} ETB
          </span>
        </button>
      )}

      {/* Order Summary Confirmation Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          zIndex: 2000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '20px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>📋 Order Confirmation</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            {/* Customer Details */}
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '13px', marginBottom: '14px' }}>
              <p style={{ margin: '0 0 6px', color: '#334155' }}><strong>👤 Name:</strong> {studentInfo.name}</p>
              <p style={{ margin: '0 0 6px', color: '#334155' }}><strong>📞 Contact:</strong> {studentInfo.contact}</p>
              <p style={{ margin: '0 0 6px', color: '#334155' }}><strong>📍 Location:</strong> {studentInfo.campus}</p>
              <p style={{ margin: 0, color: '#334155' }}><strong>💳 Payment:</strong> {PAYMENT_METHODS.find(p => p.id === paymentMethod)?.name}</p>
            </div>

            {/* Items Summary */}
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Ordered Items</p>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '6px 0', color: '#0f172a' }}>
                  <span>{item.image} {item.name} × {item.quantity}</span>
                  <span style={{ fontWeight: '600' }}>{item.price * item.quantity} ETB</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #cbd5e1', paddingTop: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a' }}>Total Amount:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>{cartTotal} ETB</span>
            </div>

            {/* Delivery Note */}
            <div style={{ backgroundColor: '#eff6ff', padding: '10px', borderRadius: '8px', fontSize: '12px', color: '#1e40af', marginBottom: '16px', textAlign: 'center' }}>
              🚀 <strong>Campus Express Delivery:</strong> Estimated within 1-2 hours after Telegram confirmation!
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                Edit Order
              </button>
              <button onClick={handleFinalCheckout} style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(22,163,74,0.2)' }}>
                Confirm & Open Telegram ✈️️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
