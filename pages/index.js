import React, { useState } from 'react';

const ProductMedia = ({ src, alt = "", size = "44px" }) => {
  const [hasError, setHasError] = useState(false);

  if (src && (src.startsWith("/") || src.startsWith("http")) && !hasError) {
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={() => setHasError(true)}
        style={{ width: size, height: size, objectFit: "cover", borderRadius: "8px" }} 
      />
    );
  }
  return <span style={{ fontSize: "28px" }}>📦</span>;
};

const CATEGORIES = [
  "All", 
  "Food & Snacks", 
  "Electronics & Tech", 
  "Men's Fashion", 
  "Women's Fashion", 
  "Shoes & Footwear", 
  "Bags & Accessories", 
  "Beauty & Essentials"
];

const POPULAR_TAGS = ["#PeanutButter", "#Ushas", "#Lotion", "#Lipgloss", "#Rings", "#StarClips", "#Necklace"];

const PRODUCTS = [
  // 1. Food & Snacks
  { 
    id: 1, 
    name: "1Kg High Quality Organic Peanut Butter", 
    price: 500, 
    category: "Food & Snacks", 
    image: "https://ibb.co/TBKrWTyp", 
    gallery: [
      { label: "Tub View", icon: "https://ibb.co/TBKrWTyp", desc: "1Kg fresh high quality organic peanut butter" }
    ],
    badge: "FRESH", 
    desc: "100% natural organic peanut butter, freshly prepared and packed." 
  },

  // 2. Beauty & Essentials (Cosmetics, Lip Gloss, Lotions)
  { 
    id: 2, 
    name: "Ushas Lipgloss + Lip Balm + Charm Set", 
    price: 650, 
    category: "Beauty & Essentials", 
    image: "https://ibb.co/wZrhVW0Z", 
    gallery: [
      { label: "Full Set", icon: "https://ibb.co/wZrhVW0Z", desc: "Ushas Lipgloss, Brightening Lip Balm & Cute Fluffy Charm" }
    ],
    badge: "BESTSELLER", 
    desc: "Ushas sparkle lipgloss and moisturizing lip balm set attached to a cute collectible bag charm." 
  },
  { 
    id: 3, 
    name: "Lotion and Body Splash Gift Set", 
    price: 1500, 
    category: "Beauty & Essentials", 
    image: "https://ibb.co/0R6gtJ3q", 
    gallery: [
      { label: "Set View", icon: "https://ibb.co/0R6gtJ3q", desc: "Fragrance lotion and body mist set for long-lasting freshness" }
    ],
    badge: "LUXURY", 
    desc: "Exquisite body philosophy gift set featuring fragrance lotion and matching body mist." 
  },
  { 
    id: 4, 
    name: "Lip Gloss Tint", 
    price: 450, 
    category: "Beauty & Essentials", 
    image: "https://ibb.co/5h0mpsxf", 
    gallery: [
      { label: "Shades", icon: "https://ibb.co/5h0mpsxf", desc: "Nourishing lip gloss and tint collection" }
    ],
    badge: "NEW", 
    desc: "Glossy, moisturizing lip tint that blends easily for soft, nourished pigmented lips." 
  },

  // 3. Bags & Accessories (Jewelry & Hair Clips)
  { 
    id: 5, 
    name: "Star Hair Clips", 
    price: 55, 
    category: "Bags & Accessories", 
    image: "https://ibb.co/k2pP5NFH", 
    gallery: [
      { label: "Assorted", icon: "https://ibb.co/k2pP5NFH", desc: "Trendy star-shaped hair clips in multiple cute colors (Price per piece)" }
    ],
    badge: "HOT", 
    desc: "Trendy star hair clips available in various cute colors. Price is per piece." 
  },
  { 
    id: 6, 
    name: "Luxury Gold Statement Ring", 
    price: 300, 
    category: "Bags & Accessories", 
    image: "https://ibb.co/CpjGPHQx", 
    gallery: [
      { label: "Ring View", icon: "https://ibb.co/CpjGPHQx", desc: "Elegant gold-plated ring design" }
    ],
    badge: "TRENDING", 
    desc: "Beautiful statement gold ring crafted with intricate details and comfortable fit." 
  },
  { 
    id: 7, 
    name: "Elegant Cross Necklace", 
    price: 450, 
    category: "Bags & Accessories", 
    image: "https://ibb.co/jZThb4cD", 
    gallery: [
      { label: "Pendant View", icon: "https://ibb.co/jZThb4cD", desc: "Stunning cross necklace pendant on fine chain" }
    ],
    badge: "POPULAR", 
    desc: "Stunning high-quality cross necklace available in an elegant finish." 
  }
];

const PAYMENT_METHODS = [
  { id: "telebirr", name: "Telebirr", icon: "📱" },
  { id: "cbe", name: "CBE Birr", icon: "🏦" },
  { id: "cash", name: "Cash on Delivery", icon: "💵" }
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [studentInfo, setStudentInfo] = useState({ name: "", contact: "", campus: "" });
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [detailQty, setDetailQty] = useState(1);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const scrollToCheckout = () => {
    setTimeout(() => {
      const el = document.getElementById("checkout-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
    const cleanTag = tag.replace("#", "");
    setSearchQuery(searchQuery.toLowerCase() === cleanTag.toLowerCase() ? "" : cleanTag);
  };

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleReviewOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!studentInfo.name || !studentInfo.contact || !studentInfo.campus) {
      return alert("Please fill in your Name, Contact, and Location.");
    }
    setShowModal(true);
  };

  const handleFinalCheckout = () => {
    const selectedPayment = PAYMENT_METHODS.find((p) => p.id === paymentMethod)?.name || "Telebirr";
    const orderId = `YESHI-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = cart.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price * item.quantity} ETB`).join("\n");

    const messageText = `🛍️ NEW YESHI MARKET ORDER (${orderId})\n\n` +
      `👤 Name: ${studentInfo.name}\n` +
      `📞 Contact: ${studentInfo.contact}\n` +
      `📍 Location: ${studentInfo.campus}\n` +
      `💳 Payment Method: ${selectedPayment}\n\n` +
      `📦 Items:\n${itemsList}\n\n` +
      `💰 Total: ${cartTotal} ETB`;

    window.location.href = `https://t.me/bekivisuals1221?text=${encodeURIComponent(messageText)}`;
  };

  const activeAngle = selectedProduct?.gallery ? selectedProduct.gallery[activeAngleIndex] : null;

  return (
    <div style={{ padding: "16px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: "#f1f5f9", minHeight: "100vh", maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      
      {toastMessage && (
        <div style={{ position: "fixed", top: "20px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#0f172a", color: "#fff", padding: "12px 20px", borderRadius: "30px", fontSize: "13px", fontWeight: "600", zIndex: 1000 }}>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px", background: "#fff", padding: "16px", borderRadius: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h1 style={{ color: "#0f172a", margin: "0 0 4px 0", fontSize: "22px" }}>Yeshi Market</h1>
        <p style={{ color: "#64748b", margin: "0 0 12px 0", fontSize: "13px" }}>Food • Beauty • Accessories</p>
        <a href="https://t.me/bekivisuals1221" target="_blank" rel="noreferrer" style={{ backgroundColor: "#0088cc", color: "#fff", padding: "8px 16px", borderRadius: "20px", textDecoration: "none", fontSize: "12px", fontWeight: "bold", display: "inline-block" }}>
          💬 Support: @bekivisuals1221
        </a>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: "8px", position: "relative" }}>
        <input 
          type="text" 
          placeholder="🔍 Search products..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          style={{ width: "100%", padding: "12px 36px 12px 12px", borderRadius: "12px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", backgroundColor: "#fff", boxSizing: "border-box" }} 
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "#e2e8f0", color: "#475569", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer" }}>✕</button>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", marginBottom: "12px" }}>
        {POPULAR_TAGS.map((tag) => (
          <button key={tag} onClick={() => handleTagClick(tag)} style={{ padding: "4px 10px", borderRadius: "12px", border: "none", backgroundColor: searchQuery.toLowerCase() === tag.replace("#","").toLowerCase() ? "#dbeafe" : "#e2e8f0", color: searchQuery.toLowerCase() === tag.replace("#","").toLowerCase() ? "#1d4ed8" : "#64748b", fontSize: "11px", fontWeight: "600", cursor: "pointer" }}>
            {tag}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", marginBottom: "16px" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "8px 16px", borderRadius: "20px", border: "none", backgroundColor: activeCategory === cat ? "#2563eb" : "#fff", color: activeCategory === cat ? "#fff" : "#475569", fontWeight: "600", fontSize: "13px", whiteSpace: "nowrap", cursor: "pointer" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ background: "#fff", padding: "14px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div onClick={() => openProductDrawer(item)} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }}>
              <div style={{ background: "#f8fafc", padding: "6px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "48px", minHeight: "48px" }}>
                <ProductMedia src={item.image} alt={item.name} size="44px" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <h4 style={{ margin: "0", fontSize: "14px", color: "#0f172a" }}>{item.name}</h4>
                  {item.badge && <span style={{ fontSize: "9px", fontWeight: "bold", background: "#ef4444", color: "#fff", padding: "1px 5px", borderRadius: "4px" }}>{item.badge}</span>}
                </div>
                <p style={{ color: "#2563eb", fontWeight: "bold", margin: "4px 0 0", fontSize: "14px" }}>{item.price} ETB</p>
              </div>
            </div>
            <button onClick={() => addToCart(item, 1)} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
              + Add
            </button>
          </div>
        ))}
      </div>

      {/* Detail Drawer Modal */}
      {selectedProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.65)", display: "flex", justifyContent: "center", alignItems: "flex-end", zIndex: 2000 }}>
          <div style={{ background: "#fff", borderTopLeftRadius: "24px", borderTopRightRadius: "24px", padding: "24px 20px", maxWidth: "600px", width: "100%", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", background: "#eff6ff", color: "#2563eb", padding: "4px 10px", borderRadius: "12px" }}>{selectedProduct.category}</span>
              <button onClick={() => setSelectedProduct(null)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer" }}>✕</button>
            </div>
            
            <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "16px", marginBottom: "12px" }}>
              <ProductMedia src={activeAngle?.icon || selectedProduct.image} alt={selectedProduct.name} size="120px" />
              <h2 style={{ margin: "8px 0 2px", fontSize: "18px" }}>{selectedProduct.name}</h2>
              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", margin: "6px 0 0" }}>{selectedProduct.price} ETB</p>
            </div>

            <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 16px" }}>{selectedProduct.desc}</p>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f1f5f9", padding: "10px 14px", borderRadius: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Quantity:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button onClick={() => setDetailQty(Math.max(1, detailQty - 1))} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: "bold", cursor: "pointer" }}>-</button>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>{detailQty}</span>
                <button onClick={() => setDetailQty(detailQty + 1)} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#fff", fontWeight: "bold", cursor: "pointer" }}>+</button>
              </div>
            </div>

            <button onClick={() => { addToCart(selectedProduct, detailQty); setSelectedProduct(null); }} style={{ width: "100%", backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
              Add {detailQty}x to Cart • {selectedProduct.price * detailQty} ETB
            </button>
          </div>
        </div>
      )}

      {/* Cart & Checkout */}
      <div id="checkout-section" style={{ marginTop: "24px", padding: "16px", background: "#fff", borderRadius: "16px" }}>
        <h3 style={{ margin: "0 0 12px", fontSize: "16px" }}>🛒 Cart ({cartItemCount} items)</h3>
        {cart.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0" }}>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((c) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
                <div>
                  <p style={{ margin: "0", fontSize: "13px", fontWeight: "600" }}>{c.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#2563eb" }}>{c.price} ETB × {c.quantity}</p>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <button onClick={() => updateQuantity(c.id, -1)} style={{ width: "26px", height: "26px", border: "1px solid #cbd5e1", background: "#fff" }}>-</button>
                  <span>{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.id, 1)} style={{ width: "26px", height: "26px", border: "1px solid #cbd5e1", background: "#fff" }}>+</button>
                  <button onClick={() => removeFromCart(c.id)} style={{ border: "none", background: "#fee2e2", color: "#ef4444", padding: "4px 8px", borderRadius: "4px" }}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <input type="text" placeholder="Full Name" value={studentInfo.name} onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Phone Number / Telegram" value={studentInfo.contact} onChange={(e) => setStudentInfo({ ...studentInfo, contact: e.target.value })} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <input type="text" placeholder="Delivery Address / Location" value={studentInfo.campus} onChange={(e) => setStudentInfo({ ...studentInfo, campus: e.target.value })} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              <button onClick={handleReviewOrder} style={{ background: "#16a34a", color: "#fff", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                Review & Order via Telegram
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px", zIndex: 2000 }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", maxWidth: "480px", width: "100%" }}>
            <h3>📋 Order Confirmation</h3>
            <p><strong>Name:</strong> {studentInfo.name}</p>
            <p><strong>Total:</strong> {cartTotal} ETB</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: "12px", border: "1px solid #cbd5e1", background: "#fff" }}>Edit</button>
              <button onClick={handleFinalCheckout} style={{ flex: 2, padding: "12px", border: "none", background: "#16a34a", color: "#fff", fontWeight: "bold" }}>Confirm & Send ✈️</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
