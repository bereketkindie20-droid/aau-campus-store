import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Smart Phone 128GB', price: 28000, category: 'Phones & Audio', image: '📱', badge: 'POPULAR' },
  { id: 2, name: 'AirPods Pro (Noise Cancelling)', price: 3200, category: 'Phones & Audio', image: '🎧', badge: 'HOT' },
  { id: 3, name: 'Wireless Over-Ear Headset', price: 1800, category: 'Phones & Audio', image: '🎧' },
  { id: 4, name: 'Fast Charger Cable + Adapter', price: 550, category: 'Phones & Audio', image: '🔌' },
  { id: 5, name: 'Smart Watch Series 8', price: 2500, category: 'Tech & Wearables', image: '⌚', badge: 'NEW' },
  { id: 6, name: '20,000mAh Heavy Duty Power Bank', price: 1800, category: 'Tech & Wearables', image: '🔋', badge: 'HOT' },
  { id: 7, name: 'USB-C Multi-Port Laptop Hub', price: 1200, category: 'Tech & Wearables', image: '💻' },
  { id: 8, name: 'Oversized Streetwear Hoodie / Jacket', price: 2200, category: 'Clothing & Apparel', image: '🧥', badge: 'TRENDING' },
  { id: 9, name: 'Wide-Leg Baggy Jeans (Blue)', price: 1800, category: 'Clothing & Apparel', image: '👖' },
  { id: 10, name: 'Campus Sneakers / Running Shoes', price: 3500, category: 'Clothing & Apparel', image: '👟' },
  { id: 11, name: 'Casual Canvas Shoes', price: 2400, category: 'Footwear & Style', image: '👟' },
  { id: 12, name: 'Long-Lasting Fresh Campus Perfume (50ml)', price: 1100, category: 'Footwear & Style', image: '✨' },
  { id: 13, name: 'Canvas Tote Bag for Lectures', price: 650, category: 'Footwear & Style', image: '🛍️' },
  { id: 14, name: 'Dorm LED Desk Study Lamp', price: 850, category: 'Dorm Essentials', image: '💡' },
  { id: 15, name: 'Compact Electric Kettle 1.5L', price: 1400, category: 'Dorm Essentials', image: '🫖', badge: 'MUST HAVE' },
  { id: 16, name: 'A4 Notebook & Pen Bundle', price: 300, category: 'Dorm Essentials', image: '📝' },
];

const CATEGORIES = ['All', 'Phones & Audio', 'Tech & Wearables', 'Clothing & Apparel', 'Footwear & Style', 'Dorm Essentials'];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentInfo, setStudentInfo] = useState({ name: '', contact: '', campus: '' });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
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

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!studentInfo.name || !studentInfo.contact || !studentInfo.campus) {
      alert('Please fill in your Name, Phone/Telegram, and Campus details.');
      return;
    }

    const orderId = `AAU-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = cart.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price * item.quantity} ETB`).join('\n');

    const messageText = `🛍️ NEW AAU STORE ORDER (${orderId})\n\n` +
      `👤 Name: ${studentInfo.name}\n` +
      `📞 Contact: ${studentInfo.contact}\n` +
      `📍 Location: ${studentInfo.campus}\n\n` +
      `📦 Items:\n${itemsList}\n\n` +
      `💰 Total: ${cartTotal} ETB`;

    const telegramUrl = `https://t.me/bekivisuals1221?text=${encodeURIComponent(messageText)}`;
    
    // Redirect directly to Telegram with message pre-filled
    window.location.href = telegramUrl;
  };

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '16px' }}>
        <h1 style={{ color: '#0f172a', margin: '0 0 4px 0', fontSize: '22px' }}>AAU Campus Store</h1>
        <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '13px' }}>Tech • Fashion • Apparel • Dorm Essentials</p>
        <a href="https://t.me/bekivisuals1221" target="_blank" rel="noreferrer" style={{ backgroundColor: '#0088cc', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>
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
          style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
        />
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: activeCategory === cat ? '#2563eb' : '#fff', color: activeCategory === cat ? '#fff' : '#475569', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '32px', background: '#f8fafc', padding: '10px', borderRadius: '10px' }}>{item.image}</div>
              <div>
                <h4 style={{ margin: '0', fontSize: '14px', color: '#0f172a' }}>{item.name}</h4>
                <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '4px 0 0', fontSize: '14px' }}>{item.price} ETB</p>
              </div>
            </div>
            <button onClick={() => addToCart(item)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              + Add
            </button>
          </div>
        ))}
      </div>

      {/* Cart */}
      <div style={{ marginTop: '24px', padding: '16px', background: '#fff', borderRadius: '16px' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '16px', color: '#0f172a' }}>🛒 Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
        {cart.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                <div>
                  <p style={{ margin: '0', fontSize: '13px', fontWeight: '600' }}>{c.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#2563eb' }}>{c.price} ETB x {c.quantity}</p>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button onClick={() => updateQuantity(c.id, -1)} style={{ padding: '2px 8px' }}>-</button>
                  <span>{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.id, 1)} style={{ padding: '2px 8px' }}>+</button>
                  <button onClick={() => removeFromCart(c.id)} style={{ color: 'red', border: 'none', background: 'none' }}>✕</button>
                </div>
              </div>
            ))}
            <hr />
            <p style={{ fontWeight: 'bold' }}>Total: {cartTotal} ETB</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <input type="text" placeholder="Full Name" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <input type="text" placeholder="Phone / Telegram" value={studentInfo.contact} onChange={(e) => setStudentInfo({ ...studentInfo, contact: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <input type="text" placeholder="Campus / Dorm Location" value={studentInfo.campus} onChange={(e) => setStudentInfo({ ...studentInfo, campus: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
              <button onClick={handleCheckout} style={{ background: '#16a34a', color: '#fff', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '8px' }}>
                Order via Telegram (Pay on Pickup)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
