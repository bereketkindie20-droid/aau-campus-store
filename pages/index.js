import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Wireless Bluetooth Headset', price: 1200, category: 'Electrical', image: '🎧' },
  { id: 2, name: 'Smart Watch Series 8', price: 2500, category: 'Electrical', image: '⌚' },
  { id: 3, name: 'Baggy Jeans (Blue)', price: 1800, category: 'Fashion', image: '👖' },
  { id: 4, name: 'Oversized Hoodie / Jacket', price: 2200, category: 'Fashion', image: '🧥' },
  { id: 5, name: 'Dorm LED Desk Lamp', price: 850, category: 'Dorm Essentials', image: '💡' },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    contact: '',
    campus: '',
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

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
          items: cart.map(item => ({ ...item, quantity: 1 })),
          total: cart.reduce((sum, item) => sum + item.price, 0),
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
      <h1 style={{ color: '#1e293b', textAlign: 'center' }}>AAU Campus Store</h1>
      <p style={{ textAlign: 'center', color: '#64748b' }}>Tech • Fashion • Dorm Essentials</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
        {PRODUCTS.map((item) => (
          <div key={item.id} style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ fontSize: '40px' }}>{item.image}</div>
            <h4 style={{ margin: '8px 0', fontSize: '14px' }}>{item.name}</h4>
            <p style={{ color: '#2563eb', fontWeight: 'bold', margin: '4px 0' }}>{item.price} ETB</p>
            <button 
              onClick={() => addToCart(item)}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3>Cart ({cart.length} items)</h3>
        {cart.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((c, i) => (
              <p key={i} style={{ margin: '4px 0', fontSize: '14px' }}>{c.name} - <b>{c.price} ETB</b></p>
            ))}

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
