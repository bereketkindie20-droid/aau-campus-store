import { useState } from 'react';

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

export default function Home() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    contact: '',
    campus: '',
  });

  // Modal State
  const [orderSuccessModal, setOrderSuccessModal] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!studentInfo.name || !studentInfo.contact || !studentInfo.campus) {
      alert('Please fill in your Name, Phone/Telegram, and Campus info before placing an order.');
      return;
    }

    const orderId = `AAU-${Math.floor(1000 + Math.random() * 9000)}`;
    const completedCart = [...cart];
    const completedTotal = cartTotal;
    const completedInfo = { ...studentInfo };

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          items: completedCart,
          total: completedTotal,
          studentInfo: completedInfo,
        }),
      });

      if (response.ok) {
        setOrderSuccessModal({
          orderId,
          items: completedCart,
          total: completedTotal,
          studentInfo: completedInfo,
        });
        setCart([]);
        setStudentInfo({ name: '', contact: '', campus: '' });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ padding: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#0f172a', margin: '0 0 4px 0', fontSize: '22px' }}>AAU Campus Store</h1>
        <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '13px' }}>Tech • Fashion • Apparel • Dorm Essentials</p>
        
        <a 
          href="https://t.me/bekivisuals1221" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#0088cc',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          💬 Support: @bekivisuals1221
        </a>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '12px' }}>
        <input 
          type="text"
          placeholder="🔍 Search products (e.g., hoodie, power bank...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', WebkitOverflowScrolling: 'touch' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeCategory === cat ? '#2563eb' : '#fff',
              color: activeCategory === cat ? '#fff' : '#475569',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', textAlign: 'center', color: '#64748b' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>No products found matching "{searchQuery}".</p>
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div key={item.id} style={{ background: '#fff', padding: '14px', borderRadius: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
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
                  <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>{item.category}</span>
                  <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '4px 0 0', fontSize: '14px' }}>{item.price} ETB</p>
                </div>
              </div>
              <button 
                onClick={() => addToCart(item)}
                style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', height: 'fit-content' }}>
                + Add
              </button>
            </div>
          ))
        )}
      </div>

      {/* Cart & Checkout Section */}
      <div style={{ marginTop: '24px', padding: '16px', background: '#fff', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', color: '#0f172a' }}>🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h3>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              />
              <input 
                type="text" 
                placeholder="Phone Number / Telegram Username" 
                value={studentInfo.contact}
                onChange={(e) => setStudentInfo({ ...studentInfo, contact: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              />
              <input 
                type="text" 
                placeholder="Campus / Dorm (e.g. 6 Kilo, Block 4)" 
                value={studentInfo.campus}
                onChange={(e) => setStudentInfo({ ...studentInfo, campus: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <button 
              onClick={handleCheckout}
              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', width: '100%', marginTop: '16px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(22,163,74,0.2)' }}>
              Checkout (Pay on Pickup)
            </button>
          </div>
        )}
      </div>

      {/* Modern Order Confirmation Modal */}
      {orderSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            position: 'relative'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: '#dcfce7',
              color: '#16a34a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              margin: '0 auto 16px auto'
            }}>
              ✓
            </div>

            <h2 style={{ margin: '0 0 4px', fontSize: '20px', color: '#0f172a' }}>Order Placed!</h2>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>Reference ID: <strong style={{ color: '#2563eb' }}>{orderSuccessModal.orderId}</strong></p>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', textAlign: 'left', marginBottom: '16px', fontSize: '13px' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 'bold', color: '#334155' }}>Customer Summary:</p>
              <p style={{ margin: '2px 0', color: '#475569' }}>👤 <strong>Name:</strong> {orderSuccessModal.studentInfo.name}</p>
              <p style={{ margin: '2px 0', color: '#475569' }}>📱 <strong>Contact:</strong> {orderSuccessModal.studentInfo.contact}</p>
              <p style={{ margin: '2px 0', color: '#475569' }}>📍 <strong>Pickup Spot:</strong> {orderSuccessModal.studentInfo.campus}</p>
              <p style={{ margin: '6px 0 0', fontWeight: 'bold', color: '#16a34a', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>Total Due on Pickup: {orderSuccessModal.total} ETB</p>
            </div>

            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 20px' }}>
              We have sent this order to Telegram. Our campus courier will message/call you shortly to schedule pickup!
            </p>

            <button
              onClick={() => setOrderSuccessModal(null)}
              style={{
                width: '100%',
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Done & Return to Store
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
