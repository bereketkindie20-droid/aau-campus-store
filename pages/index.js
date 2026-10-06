import React, { useState, useEffect } from 'react';
import Head from 'next/head';

// --- SAMPLE PRODUCTS CATALOG ---
const PRODUCTS = [
  { 
    id: 1, 
    name: 'Smart Phone 128GB', 
    price: 28000, 
    category: 'Phones & Audio', 
    image: '/images/phone-front.jpg', // Replace with photo path (e.g., /images/phone.jpg) or image URL
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
    name: 'Wireless Headphones', 
    price: 4500, 
    category: 'Phones & Audio', 
    image: '🎧', 
    gallery: [
      { label: 'Overview', icon: '🎧', desc: 'Ergonomic over-ear cushions for maximum noise isolation' },
      { label: 'Controls', icon: '🎛️', desc: 'Built-in tactile media controls & high-grade mic' },
      { label: 'Case', icon: '💼', desc: 'Includes lightweight protective hardshell travel case' }
    ],
    badge: 'NEW', 
    desc: 'Active noise cancellation with deep bass.' 
  },
  { 
    id: 3, 
    name: 'Casual Canvas Sneakers', 
    price: 3200, 
    category: 'Apparel & Footwear', 
    image: '👟', 
    gallery: [
      { label: 'Side Profile', icon: '👟', desc: 'Durable double-stitched canvas top with modern silhouette' },
      { label: 'Sole Grip', icon: '🦶', desc: 'High-traction vulcanized rubber outsole' },
      { label: 'Laces & Detail', icon: '🏷️', desc: 'Reinforced brass eyelets with custom flat cotton laces' }
    ],
    badge: 'TRENDING', 
    desc: 'Durable, stylish sneakers ideal for everyday wear.' 
  },
  { 
    id: 4, 
    name: 'Smartwatch Series V', 
    price: 6800, 
    category: 'Phones & Audio', 
    image: '⌚', 
    gallery: [
      { label: 'Watch Face', icon: '⌚', desc: 'Always-on AMOLED touch display with high clarity' },
      { label: 'Sensors', icon: '🩺', desc: 'Heart rate sensor, step tracking, and sleep quality monitor' },
      { label: 'Strap', icon: '🧵', desc: 'Sweat-resistant breathable silicone strap' }
    ],
    badge: 'HOT', 
    desc: 'Track fitness, heart rate, notifications, and battery for up to 7 days.' 
  },
  { 
    id: 5, 
    name: 'Urban Tech Backpack', 
    price: 2900, 
    category: 'Apparel & Footwear', 
    image: '🎒', 
    gallery: [
      { label: 'Full Bag', icon: '🎒', desc: 'Water-resistant nylon finish with shockproof padding' },
      { label: 'Laptop Sleeve', icon: '💻', desc: 'Dedicated padded compartment fitting laptops up to 15.6 inches' },
      { label: 'USB Port', icon: '🔌', desc: 'Integrated external USB pass-through charging port' }
    ],
    badge: 'BESTSELLER', 
    desc: 'Water-resistant backpack featuring padded laptop protection and USB charging port.' 
  }
];

const CATEGORIES = ['All', 'Phones & Audio', 'Apparel & Footwear', 'Daily Essentials'];

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr', icon: '📱' },
  { id: 'cbe', name: 'CBE Birr / CBE', icon: '🏦' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' }
];

// --- HELPER COMPONENT TO RENDER EITHER IMAGE URL/PATH OR EMOJI TEXT ---
const ProductMedia = ({ src, alt = '', size = '32px' }) => {
  if (src && (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://'))) {
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
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    contact: '',
    campus: 'Main Campus'
  });
  const [paymentMethod, setPaymentMethod] = useState('telebirr');

  // Auto-scroll logic for angle switching inside detail modal
  useEffect(() => {
    let timer;
    if (selectedProduct && selectedProduct.gallery && selectedProduct.gallery.length > 0) {
      timer = setInterval(() => {
        setActiveAngleIndex((prevIndex) => (prevIndex + 1) % selectedProduct.gallery.length);
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [selectedProduct]);

  // Open product modal
  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setActiveAngleIndex(0);
  };

  // Close product modal
  const handleCloseProduct = () => {
    setSelectedProduct(null);
    setActiveAngleIndex(0);
  };

  // Cart Management
  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Direct Telegram Checkout Integration
  const handleFinalCheckout = (e) => {
    e.preventDefault();
    if (!studentInfo.name || !studentInfo.contact) {
      alert('Please fill out your name and contact info.');
      return;
    }

    const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || 'Telebirr';
    const orderId = `YESHI-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = cart
      .map((item) => `• ${item.name} (${item.quantity}x) - ${item.price * item.quantity} ETB`)
      .join('\n');

    const messageText = `🛍️ NEW YESHI MARKET ORDER (${orderId})\n\n` +
      `👤 Name: ${studentInfo.name}\n` +
      `📞 Contact: ${studentInfo.contact}\n` +
      `📍 Location/Campus: ${studentInfo.campus}\n` +
      `💳 Payment Method: ${selectedPayment}\n\n` +
      `📦 Items:\n${itemsList}\n\n` +
      `💰 Total Amount: ${cartTotal} ETB`;

    const telegramUrl = `https://t.me/bekivisuals1221?text=${encodeURIComponent(messageText)}`;
    window.location.href = telegramUrl;
  };

  // Filter Catalog
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeAngle = selectedProduct?.gallery?.[activeAngleIndex] || null;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '16px', color: '#1e293b' }}>
      <Head>
        <title>Yeshi Market - Online Store</title>
        <meta name="description" content="Yeshi Market - Online E-Commerce Store" />
      </Head>

      <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
        
        {/* --- BRAND HEADER --- */}
        <div style={{ textAlign: 'center', marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#0f172a', margin: '0 0 4px 0', fontSize: '24px', fontWeight: '800' }}>Yeshi Market</h1>
          <p style={{ color: '#64748b', margin: '0 0 12px 0', fontSize: '13px' }}>Tech • Fashion • Apparel • Daily Essentials</p>
          <a href="https://t.me/bekivisuals1221" target="_blank" rel="noreferrer" style={{ backgroundColor: '#0088cc', color: '#fff', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
            💬 Support: @bekivisuals1221
          </a>
        </div>

        {/* --- SEARCH BAR --- */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search products in Yeshi Market..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {/* --- CATEGORY FILTERS --- */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: selectedCategory === cat ? '#0f172a' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#64748b',
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

        {/* --- PRODUCT GRID --- */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenProduct(item)}
              style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '16px', position: 'relative', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <span style={{ position: 'absolute', top: '8px', left: '8px', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '10px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px' }}>
                {item.badge}
              </span>
              
              <div style={{ textAlign: 'center', margin: '24px 0 12px 0' }}>
                <ProductMedia src={item.image} alt={item.name} size="48px" />
              </div>

              <div>
                <h3 style={{ fontSize: '14px', margin: '0 0 4px 0', color: '#0f172a' }}>{item.name}</h3>
                <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#2563eb', margin: '0 0 8px 0' }}>{item.price} ETB</p>
                <button
                  onClick={(e) => addToCart(item, e)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#f1f5f9', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CART BAR (BOTTOM) --- */}
      {cartItemCount > 0 && (
        <div style={{ position: 'fixed', bottom: '16px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 32px)', maxWidth: '568px', backgroundColor: '#0f172a', color: '#fff', padding: '12px 20px', borderRadius: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', cursor: 'pointer', zIndex: 100 }} onClick={() => setIsCartOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#2563eb', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              {cartItemCount}
            </span>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>View Cart</span>
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#60a5fa' }}>{cartTotal} ETB →</span>
        </div>
      )}

      {/* --- PRODUCT DETAILS & ANGLES MODAL --- */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }} onClick={handleCloseProduct}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '600px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#f1f5f9', color: '#475569', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '12px' }}>{selectedProduct.category}</span>
              <button onClick={handleCloseProduct} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            {/* Display active angle image with Micro-Detail Zoom Button */}
            <div style={{ textAlign: 'center', backgroundColor: '#f8fafc', padding: '24px', borderRadius: '16px', position: 'relative', marginBottom: '16px' }}>
              <ProductMedia src={activeAngle?.icon || selectedProduct.image} alt={selectedProduct.name} size="96px" />
              <p style={{ marginTop: '8px', fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{activeAngle?.desc || selectedProduct.desc}</p>
              
              <button 
                onClick={() => setIsZoomModalOpen(true)}
                style={{ position: 'absolute', bottom: '8px', right: '8px', border: 'none', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
              >
                🔍 Zoom Micro-Details
              </button>
            </div>

            {/* Gallery Angle Switcher */}
            {selectedProduct.gallery && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                {selectedProduct.gallery.map((angle, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAngleIndex(idx)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '12px',
                      border: activeAngleIndex === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      backgroundColor: activeAngleIndex === idx ? '#eff6ff' : '#fff',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ marginBottom: '2px' }}>
                      <ProductMedia src={angle.icon} alt={angle.label} size="24px" />
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 'bold', color: activeAngleIndex === idx ? '#2563eb' : '#64748b' }}>{angle.label}</div>
                  </button>
                ))}
              </div>
            )}

            <h2 style={{ fontSize: '20px', margin: '0 0 8px 0', color: '#0f172a' }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{selectedProduct.desc}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '22px', fontWeight: '800', color: '#2563eb' }}>{selectedProduct.price} ETB</span>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  handleCloseProduct();
                }}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MICRO-DETAIL ZOOM MODAL --- */}
      {isZoomModalOpen && selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }} onClick={() => setIsZoomModalOpen(false)}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', textAlign: 'center', maxWidth: '400px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ transform: 'scale(1.8)', margin: '40px 0' }}>
              <ProductMedia src={activeAngle?.icon || selectedProduct.image} alt={selectedProduct.name} size="120px" />
            </div>
            <h3 style={{ fontSize: '16px', margin: '0 0 4px 0' }}>{activeAngle?.label || 'Micro View'}</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>{activeAngle?.desc || selectedProduct.desc}</p>
            <button
              onClick={() => setIsZoomModalOpen(false)}
              style={{ backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Close Zoom View
            </button>
          </div>
        </div>
      )}

      {/* --- CART & TELEGRAM CHECKOUT MODAL --- */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }} onClick={() => setIsCartOpen(false)}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '600px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>🛍️ Your Yeshi Market Cart</h2>
              <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            {!isCheckoutStep ? (
              <>
                {cart.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#64748b', margin: '32px 0' }}>Your cart is empty.</p>
                ) : (
                  <div>
