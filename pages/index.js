import { useState } from 'react';

const PRODUCTS = [
  // Phones & Audio
  { id: 1, name: 'Smart Phone 128GB', price: 28000, category: 'Phones & Audio', image: '📱' },
  { id: 2, name: 'AirPods Pro (Noise Cancelling)', price: 3200, category: 'Phones & Audio', image: '🎧' },
  { id: 3, name: 'Wireless Over-Ear Headset', price: 1800, category: 'Phones & Audio', image: '🎧' },
  { id: 4, name: 'Fast Charger Cable + Adapter', price: 550, category: 'Phones & Audio', image: '🔌' },

  // Tech & Wearables
  { id: 5, name: 'Smart Watch Series 8', price: 2500, category: 'Tech & Wearables', image: '⌚' },
  { id: 6, name: '20,000mAh Heavy Duty Power Bank', price: 1800, category: 'Tech & Wearables', image: '🔋' },
  { id: 7, name: 'USB-C Multi-Port Laptop Hub', price: 1200, category: 'Tech & Wearables', image: '💻' },

  // Clothing & Apparel
  { id: 8, name: 'Oversized Streetwear Hoodie / Jacket', price: 2200, category: 'Clothing & Apparel', image: '🧥' },
  { id: 9, name: 'Wide-Leg Baggy Jeans (Blue)', price: 1800, category: 'Clothing & Apparel', image: '👖' },
  { id: 10, name: 'Campus Sneakers / Running Shoes', price: 3500, category: 'Clothing & Apparel', image: '👟' },

  // Footwear & Style Accessories
  { id: 11, name: 'Casual Canvas Shoes', price: 2400, category: 'Footwear & Style', image: '👟' },
  { id: 12, name: 'Long-Lasting Fresh Campus Perfume (50ml)', price: 1100, category: 'Footwear & Style', image: '✨' },
  { id: 13, name: 'Canvas Tote Bag for Lectures', price: 650, category: 'Footwear & Style', image: '🛍️' },

  // Dorm & Academic Essentials
  { id: 14, name: 'Dorm LED Desk Study Lamp', price: 850, category: 'Dorm Essentials', image: '💡' },
  { id: 15, name: 'Compact Electric Kettle 1.5L', price: 1400, category: 'Dorm Essentials', image: '🫖' },
  { id: 16, name: 'A4 Notebook & Pen Bundle', price: 300, category: 'Dorm Essentials', image: '📝' },
];

const CATEGORIES = ['All', 'Phones & Audio', 'Tech & Wearables', 'Clothing & Apparel', 'Footwear & Style', 'Dorm Essentials'];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    contact: '',
    campus: '',
  });

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

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

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

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total: cartTotal,
          studentInfo: studentInfo,
        }),
      });

      if (response.ok) {
        alert('Order placed successfully! We will contact you shortly.');
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1 style={{ color: '#1e293b', margin: '0 0 4px 0' }}>AAU Campus Store</h1>
        <p style={{ color: '#64748b', margin: '0 0 10px 0', fontSize: '14px' }}>Tech • Fashion • Apparel • Dorm Essentials</p>
        
        {/* Telegram Direct Support Link */}
        <a 
          href="https://t.me/bekivisuals1221" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#0088cc',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '20px',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          💬 Need help? Message @bekivisuals1221 on Telegram
        </a>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginTop: '15px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeCategory === cat ? '#2563eb' : '#e2e8f0',
              color: activeCategory === cat ? '#fff' : '#334155',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '40px' }}>{item.image}</div>
              <h4 style={{ margin: '8px 0 4px', fontSize: '14px', color: '#0f172a' }}>{item.name}</h4>
              <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{item.category}</span>
              <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '8px 0' }}>{item.price} ETB</p>
            </div>
            <button 
              onClick={() => addToCart(item)}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart & Checkout Section */}
      <div style={{ marginTop: '30px', padding: '15px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h3>
        {cart.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((c) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{c.name}</p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#2563eb' }}>{c.price} ETB x {c.quantity} = {c.price * c.quantity} ETB</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button onClick={() => updateQuantity(c.id, -1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>-</button>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.id, 1)} style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer' }}>+</button>
                  <button onClick={() => removeFromCart(c.id)} style={{ padding: '2px 8px', borderRadius: '4px', border: 'none', background: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: '12px', marginLeft: '4px' }}>✕</button>
                </div>
              </div>
            ))}

            <p style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px', color: '#0f172a', marginTop: '10px' }}>
              Total: {cartTotal} ETB
            </p>

            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
              <input 
                type="text" 
                placeholder="Phone Number / Telegram Username" 
                value={studentInfo.contact}
                onChange={(e) => setStudentInfo({ ...studentInfo, contact: e.target.value })}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
              <input 
                type="text" 
                placeholder="Campus / Dorm (e.g. 6 Kilo, Block 4)" 
                value={studentInfo.campus}
                onChange={(e) => setStudentInfo({ ...studentInfo, campus: e.target.value })}
                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <button 
              onClick={handleCheckout}
              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', width: '100%', marginTop: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              Checkout (Pay on Pickup)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
