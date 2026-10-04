import React, { useState } from 'react';

const PRODUCTS = [
  // Phones & Audio
  { 
    id: 1, 
    name: 'Smart Phone 128GB', 
    price: 28000, 
    category: 'Phones & Audio', 
    image: '📱', 
    gallery: [
      { label: 'Front', icon: '📱', desc: '6.7-inch OLED Super Retina HD Display' },
      { label: 'Camera', icon: '📸', desc: 'Triple Lens Matrix 48MP AI Camera System' },
      { label: 'Back', icon: '📲', desc: 'Matte glass back finish with anti-fingerprint coating' }
    ],
    badge: 'POPULAR', 
    desc: '128GB storage, crisp HD display, long battery life. Perfect for university lectures and media consumption.' 
  },
  { 
    id: 2, 
    name: 'AirPods Pro (Noise Cancelling)', 
    price: 3200, 
    category: 'Phones & Audio', 
    image: '🎧', 
    gallery: [
      { label: 'Case & Pods', icon: '🎧', desc: 'Wireless MagSafe charging case with earbuds' },
      { label: 'Ear Tips', icon: '👂', desc: 'Soft silicone noise-isolating ear tips (S/M/L included)' },
      { label: 'Close-up', icon: '🔍', desc: 'Active ANC Microphone mesh & touch sensor stem' }
    ],
    badge: 'HOT', 
    desc: 'Active noise cancellation, fast Bluetooth pairing, crystal clear microphone for audio calls.' 
  },
  { 
    id: 3, 
    name: 'Wireless Over-Ear Headset', 
    price: 1800, 
    category: 'Phones & Audio', 
    image: '🎧', 
    gallery: [
      { label: 'Front View', icon: '🎧', desc: 'Ergonomic adjustable headband with memory foam' },
      { label: 'Earcup Controls', icon: '🎛️', desc: 'Tactile volume dial, bass boost & ANC switch' },
      { label: 'Folded Angle', icon: '🎒', desc: 'Swivel earcups fold flat for easy backpack storage' }
    ],
    desc: 'Deep bass, soft cushion earmuffs, built-in mic, up to 30 hours of continuous playback.' 
  },
  { 
    id: 4, 
    name: 'Fast Charger Cable + Adapter', 
    price: 550, 
    category: 'Phones & Audio', 
    image: '🔌', 
    gallery: [
      { label: 'Full Kit', icon: '🔌', desc: 'PD 20W Wall Plug + 1m Braided Fast Cable' },
      { label: 'Plug Detail', icon: '⚡', desc: 'Smart IC chip protection against overheating' },
      { label: 'Reinforced Cable', icon: '🧶', desc: 'Tangle-free nylon braided stress relief neck' }
    ],
    desc: 'PD 20W Fast Charging kit for iPhones and Android smartphones. High durability braided wire.' 
  },

  // Tech & Wearables
  { 
    id: 5, 
    name: 'Smart Watch Series 8', 
    price: 2500, 
    category: 'Tech & Wearables', 
    image: '⌚', 
    gallery: [
      { label: 'Dial Front', icon: '⌚', desc: 'Always-On Retina display with customizable watch faces' },
      { label: 'Strap Side', icon: '📐', desc: 'Quick-release comfortable silicone sport band' },
      { label: 'Sensor Back', icon: '🩺', desc: 'Precision optical heart rate and SpO2 sensors' }
    ],
    badge: 'NEW', 
    desc: 'Heart rate tracker, fitness modes, notification mirror, stylish metallic dial with silicone band.' 
  },
  { 
    id: 6, 
    name: '20,000mAh Heavy Duty Power Bank', 
    price: 1800, 
    category: 'Tech & Wearables', 
    image: '🔋', 
    gallery: [
      { label: 'Front View', icon: '🔋', desc: 'High density polymer battery cell casing' },
      { label: 'Port Layout', icon: '🔌', desc: 'Dual USB-A output + Type-C Power Delivery port' },
      { label: 'LED Screen', icon: '💡', desc: 'Digital battery percentage power indicator display' }
    ],
    badge: 'HOT', 
    desc: 'Dual USB ports, LED battery indicator, heavy-duty capacity to charge phone up to 5-6 times.' 
  },
  { 
    id: 7, 
    name: 'USB-C Multi-Port Laptop Hub', 
    price: 1200, 
    category: 'Tech & Wearables', 
    image: '💻', 
    gallery: [
      { label: 'Hub Angle', icon: '💻', desc: 'Sleek aluminum alloy heat-dissipating shell' },
      { label: 'Ports View', icon: '🔌', desc: '4K HDMI, 3x USB 3.0, SD & MicroSD slot' },
      { label: 'Plug Cable', icon: '🧵', desc: 'Short reinforced USB-C input tail' }
    ],
    desc: 'Adds HDMI 4K output, 3x USB 3.0 ports, SD card reader, and Type-C passthrough charging.' 
  },

  // Clothing & Apparel
  { 
    id: 8, 
    name: 'Oversized Streetwear Hoodie / Jacket', 
    price: 2200, 
    category: 'Clothing & Apparel', 
    image: '🧥', 
    gallery: [
      { label: 'Front Style', icon: '🧥', desc: 'Relaxed oversized aesthetic cut with front pocket' },
      { label: 'Back Design', icon: '👕', desc: 'Clean minimalist back panel stitching' },
      { label: 'Fabric Texture', icon: '🧶', desc: 'Heavyweight 350GSM cotton fleece interior' }
    ],
    badge: 'TRENDING', 
    desc: 'Ultra-soft fleece inner lining, relaxed fit streetwear style, suitable for cool campus weather.' 
  },
  { 
    id: 9, 
    name: 'Wide-Leg Baggy Jeans (Blue)', 
    price: 1800, 
    category: 'Clothing & Apparel', 
    image: '👖', 
    gallery: [
      { label: 'Front Fit', icon: '👖', desc: 'Wide-leg relaxed fit with deep pockets' },
      { label: 'Back Pockets', icon: '🧵', desc: 'Reinforced back pockets with custom stitching' },
      { label: 'Denim Close-up', icon: '🔍', desc: '100% durable washed denim cotton fabric' }
    ],
    desc: 'High quality denim, wide-leg aesthetic fit, durable stitching for daily campus wear.' 
  },
  { 
    id: 10, 
    name: 'Campus Sneakers / Running Shoes', 
    price: 3500, 
    category: 'Clothing & Apparel', 
    image: '👟', 
    gallery: [
      { label: 'Side Profile', icon: '👟', desc: 'Sleek athletic silhouette with dynamic line trim' },
      { label: 'Sole Tread', icon: '🦶', desc: 'High-traction slip resistant rubber outsole' },
      { label: 'Mesh Close-up', icon: '💨', desc: 'Ultra-breathable honeycomb knitted mesh upper' }
    ],
    desc: 'Lightweight breathable mesh material, cushioned sole for comfortable long walk across campus.' 
  },

  // Footwear & Style Accessories
  { 
    id: 11, 
    name: 'Casual Canvas Shoes', 
    price: 2400, 
    category: 'Footwear & Style', 
    image: '👟', 
    gallery: [
      { label: 'Top View', icon: '👟', desc: 'Classic lace-up canvas design with metal eyelets' },
      { label: 'Heel Back', icon: '👟', desc: 'Reinforced heel cap for shape retention' },
      { label: 'Sole Cushion', icon: '👣', desc: 'Vulcanized rubber sole with comfortable inner arch' }
    ],
    desc: 'Classic canvas style, vulcanized rubber sole, matches all casual streetwear outfits.' 
  },
  { 
    id: 12, 
    name: 'Long-Lasting Fresh Campus Perfume (50ml)', 
    price: 1100, 
    category: 'Footwear & Style', 
    image: '✨', 
    gallery: [
      { label: 'Bottle Front', icon: '✨', desc: 'Minimalist glass atomizer bottle with metallic cap' },
      { label: 'Spray Nozzle', icon: '💦', desc: 'Fine-mist diffusion spray mechanism' },
      { label: 'Packaging', icon: '📦', desc: 'Protective embossed presentation box' }
    ],
    desc: 'Fresh citrus & woody fragrance notes. Long lasting scent designed for active student day.' 
  },
  { 
    id: 13, 
    name: 'Canvas Tote Bag for Lectures', 
    price: 650, 
    category: 'Footwear & Style', 
    image: '🛍️️', 
    gallery: [
      { label: 'Full Bag', icon: '🛍️', desc: 'Spacious main compartment holds 15" laptop & binders' },
      { label: 'Inner Zipper', icon: '👛', desc: 'Secure internal pocket for keys, cards & phone' },
      { label: 'Strap Detail', icon: '🧵', desc: 'Double-stitched high durability shoulder straps' }
    ],
    desc: 'Heavy canvas material, holds laptops, books, water bottles, with inner zipper pocket.' 
  },

  // Dorm & Academic Essentials
  { 
    id: 14, 
    name: 'Dorm LED Desk Study Lamp', 
    price: 850, 
    category: 'Dorm Essentials', 
    image: '💡', 
    gallery: [
      { label: 'Standing Lamp', icon: '💡', desc: 'Flexible 360-degree gooseneck arm design' },
      { label: 'Touch Base', icon: '🎛️', desc: '3 Color temperature modes & touch dimming' },
      { label: 'Charging Port', icon: '🔌', desc: 'USB rechargeable internal battery & power port' }
    ],
    desc: 'Touch controls, 3 lighting modes (warm/white/mixed), rechargeable built-in battery.' 
  },
  { 
    id: 15, 
    name: 'Compact Electric Kettle 1.5L', 
    price: 1400, 
    category: 'Dorm Essentials', 
    image: '🫖', 
    gallery: [
      { label: 'Front Exterior', icon: '🫖', desc: 'Cool-touch outer body with ergonomic handle' },
      { label: 'Interior Stainless', icon: '✨', desc: '100% Food-grade 304 stainless steel seamless liner' },
      { label: 'Power Base', icon: '🔌', desc: '360-degree swivel cordless heating base' }
    ],
    badge: 'MUST HAVE', 
    desc: 'Fast boiling stainless steel interior, auto shut-off safety, ideal for dorm instant coffee & noodles.' 
  },
  { 
    id: 16, 
    name: 'A4 Notebook & Pen Bundle', 
    price: 300, 
    category: 'Dorm Essentials', 
    image: '📝', 
    gallery: [
      { label: 'Bundle Kit', icon: '📝', desc: '3x Grid notebooks + 5x Smooth gel ink pens' },
      { label: 'Page Layout', icon: '📄', desc: '100GSM bleed-resistant cream graph paper' },
      { label: 'Gel Pens', icon: '🖊️', desc: '0.5mm quick-dry smudge-free black gel pens' }
    ],
    desc: '3x Grid line notebooks (200 pages each) + pack of 5 smooth gel pens.' 
  },
];

const CATEGORIES = ['All', 'Phones & Audio', 'Tech & Wearables', 'Clothing & Apparel', 'Footwear & Style', 'Dorm Essentials'];

const POPULAR_TAGS = ['#PowerBank', '#Hoodie', '#AirPods', '#Kettle', '#Perfume', '#Charger', '#Shoes'];

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

  // Detail Drawer State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [detailQty, setDetailQty] = useState(1);

  // Micro Details Zoom Modal
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

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
    }, 150);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, quantity: qty }];
    });

    showToast(`✅ Added ${qty}x ${product.name} to cart!`);
    scrollToCheckout();
  };

  const openProductDrawer = (product) => {
    setSelectedProduct(product);
    setActiveAngleIndex(0);
    setDetailQty(1);
    setZoomScale(1);
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

  const handleTagClick = (tag) => {
    const cleanTag = tag.replace('#', '');
    if (searchQuery.toLowerCase() === cleanTag.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(cleanTag);
    }
  };

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

  const activeAngle = selectedProduct?.gallery ? selectedProduct.gallery[activeAngleIndex] : null;

  return (
    <div style={{ padding: '16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', maxWidth: '600px', margin: '0 auto', position: 'relative', paddingBottom: '40px' }}>
      
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

      {/* Search Input with Quick Clear Button */}
      <div style={{ marginBottom: '8px', position: 'relative' }}>
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: '100%', padding: '12px 36px 12px 12px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#fff', boxSizing: 'border-box' }} 
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: '#e2e8f0',
              color: '#475569',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Campus Hashtag Badges */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '12px', WebkitOverflowScrolling: 'touch' }}>
        {POPULAR_TAGS.map((tag) => {
          const isActive = searchQuery.toLowerCase() === tag.replace('#', '').toLowerCase();
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              style={{
                padding: '4px 10px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isActive ? '#dbeafe' : '#e2e8f0',
                color: isActive ? '#1d4ed8' : '#64748b',
                fontSize: '11px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          );
        })}
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
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 12px', background: '#fff', borderRadius: '12px', color: '#64748b' }}>
            <p style={{ margin: '0 0 8px', fontSize: '24px' }}>🔍</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>No products found for "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} style={{ marginTop: '10px', border: 'none', background: '#eff6ff', color: '#2563eb', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Clear Search</button>
          </div>
        ) : (
          filteredProducts.map((item) => (
            <div key={item.id} style={{ background: '#fff', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
              <div 
                onClick={() => openProductDrawer(item)} 
                style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1 }}
              >
                <div style={{ fontSize: '32px', background: '#f8fafc', padding: '10px', borderRadius: '10px', position: 'relative' }}>
                  {item.image}
                  <span style={{ position: 'absolute', bottom: '2px', right: '2px', fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '4px', padding: '1px 3px' }}>🔍</span>
                </div>
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
              <button onClick={() => addToCart(item, 1)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                + Add
              </button>
            </div>
          ))
        )}
      </div>

      {/* Item Detail Modal Drawer */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 2000
        }}>
          <div style={{
            background: '#fff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px 20px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0 -10px 25px rgba(0,0,0,0.15)',
            maxHeight: '88vh',
            overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', background: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '12px' }}>
                {selectedProduct.category}
              </span>
              <button onClick={() => setSelectedProduct(null)} style={{ background: '#f1f5f9', border: 'none', fontSize: '16px', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            {/* Main Product Image Display with Zoom Trigger */}
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', marginBottom: '12px', position: 'relative' }}>
              
              {/* Zoom Icon Button */}
              <button 
                onClick={() => setIsZoomOpen(true)} 
                title="Zoom into micro details"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: '#fff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px',
                  padding: '5px 10px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
                }}
              >
                <span>🔍 Zoom Details</span>
              </button>

              <div 
                onClick={() => setIsZoomOpen(true)}
                style={{ fontSize: '72px', margin: '0', cursor: 'zoom-in', transition: 'transform 0.2s ease', display: 'inline-block' }}
              >
                {activeAngle?.icon || selectedProduct.image}
              </div>

              <h2 style={{ margin: '8px 0 2px', fontSize: '18px', color: '#0f172a' }}>{selectedProduct.name}</h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px', fontWeight: '500' }}>
                Angle: <strong>{activeAngle?.label || 'Front'} View</strong> — {activeAngle?.desc}
              </p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>{selectedProduct.price} ETB</p>
            </div>

            {/* Multiple Product Angle Thumbnails */}
            {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  📸 Select Product Angle ({selectedProduct.gallery.length} Views):
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedProduct.gallery.length}, 1fr)`, gap: '8px' }}>
                  {selectedProduct.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveAngleIndex(idx)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '10px',
                        border: activeAngleIndex === idx ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        backgroundColor: activeAngleIndex === idx ? '#eff6ff' : '#fff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '20px' }}>{item.icon}</div>
                      <div style={{ fontSize: '10px', fontWeight: 'bold', color: activeAngleIndex === idx ? '#1d4ed8' : '#475569', marginTop: '2px' }}>
                        {item.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px' }}>
              {selectedProduct.desc}
            </p>

            {/* Quantity Selector inside Drawer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f1f5f9', padding: '10px 14px', borderRadius: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button 
                  onClick={() => setDetailQty(Math.max(1, detailQty - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{detailQty}</span>
                <button 
                  onClick={() => setDetailQty(detailQty + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                addToCart(selectedProduct, detailQty);
                setSelectedProduct(null);
              }}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.25)'
              }}
            >
              Add {detailQty}x to Cart • {selectedProduct.price * detailQty} ETB
            </button>
          </div>
        </div>
      )}

      {/* Full Screen Image Zoom & Micro Details Modal */}
      {isZoomOpen && selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          zIndex: 3000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
          backdropFilter: 'blur(8px)'
        }}>
          {/* Zoom Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '16px' }}>{selectedProduct.name}</h3>
              <p style={{ color: '#94a3b8', margin: '2px 0 0', fontSize: '12px' }}>
                {activeAngle?.label} Angle View • Zoom Level: {Math.round(zoomScale * 100)}%
              </p>
            </div>
            <button 
              onClick={() => { setIsZoomOpen(false); setZoomScale(1); }} 
              style={{ background: '#334155', color: '#fff', border: 'none', borderRadius: '50%', width: '36px', height: '36px', fontSize: '18px', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          {/* Zoom Canvas Area */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, overflow: 'hidden', padding: '20px' }}>
            <div style={{
              transform: `scale(${zoomScale})`,
              transition: 'transform 0.2s ease-out',
              fontSize: '140px',
              userSelect: 'none',
              filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.5))'
            }}>
              {activeAngle?.icon || selectedProduct.image}
            </div>
          </div>

          {/* Zoom Controls & Feature Note */}
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '14px', textAlign: 'center' }}>
            <p style={{ color: '#cbd5e1', fontSize: '12px', margin: '0 0 10px' }}>
              🔎 <strong>Micro Detail Feature:</strong> {activeAngle?.desc}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
              <button 
                onClick={() => setZoomScale(Math.max(1, zoomScale - 0.5))} 
                style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #475569', background: '#334155', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
              >
                ➖ Zoom Out
              </button>
              <button 
                onClick={() => setZoomScale(1)} 
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #475569', background: '#334155', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}
              >
                Reset
              </button>
              <button 
                onClick={() => setZoomScale(Math.min(3, zoomScale + 0.5))} 
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
              >
                ➕ Zoom In
              </button>
            </div>
          </div>
        </div>
      )}

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
                Confirm & Open Telegram ✈️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
