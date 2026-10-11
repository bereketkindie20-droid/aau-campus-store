import React, { useState, useEffect } from 'react';

const ProductMedia = ({ src, alt = "", size = "44px", onClick }) => {
  const [hasError, setHasError] = useState(false);

  if (src && (src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) && !hasError) {
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={() => setHasError(true)}
        onClick={onClick}
        style={{ width: size, height: size, objectFit: "cover", borderRadius: "8px", cursor: onClick ? "pointer" : "default" }} 
      />
    );
  }
  return <span style={{ fontSize: "28px" }}>📦</span>;
};

// Default products using your exact working ImgBB direct image links
const INITIAL_PRODUCTS = [
  { id: 1, name: "1Kg High Quality Organic Peanut Butter", price: 500, category: "Food & Snacks", image: "https://i.ibb.co/mS2QZ3H/image.jpg", desc: "100% natural organic peanut butter." },
  { id: 2, name: "Ushas Lipgloss + Lip Balm + Charm Set", price: 650, category: "Beauty & Essentials", image: "https://i.ibb.co/xL1QxKq/image.jpg", desc: "Sparkle lipgloss and moisturizing lip balm set." },
  { id: 3, name: "Lotion and Body Splash Gift Set", price: 1500, category: "Beauty & Essentials", image: "https://i.ibb.co/4P2X2S2/image.jpg", desc: "Exquisite body philosophy gift set." },
  { id: 4, name: "Lip Gloss Tint", price: 450, category: "Beauty & Essentials", image: "https://i.ibb.co/MkhqN0g/image.jpg", desc: "Glossy, moisturizing lip tint." },
  { id: 5, name: "Star Hair Clips", price: 55, category: "Bags & Accessories", image: "https://i.ibb.co/PzhQJ1S/image.jpg", desc: "Trendy star hair clips." },
  { id: 6, name: "Luxury Gold Statement Ring", price: 300, category: "Bags & Accessories", image: "https://i.ibb.co/H2D5434/image.jpg", desc: "Beautiful statement gold ring." },
  { id: 7, name: "Elegant Cross Necklace", price: 450, category: "Bags & Accessories", image: "https://i.ibb.co/q1y9wD1/image.jpg", desc: "Stunning high-quality cross necklace." }
];

const CATEGORIES = ["All", "Food & Snacks", "Bags & Accessories", "Beauty & Essentials"];

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Form state for adding/editing products
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" });
  const [editingId, setEditingId] = useState(null);

  // Auto-detect Telegram Owner Username (@bekivisuals1221)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      
      // Check if user is @bekivisuals1221 OR if manually enabled via local storage for testing
      if ((tgUser && tgUser.username && tgUser.username.toLowerCase() === "bekivisuals1221") || localStorage.getItem("yeshi_force_owner") === "true") {
        setIsOwner(true);
      }
    }

    // Load products from shared storage
    const saved = localStorage.getItem("yeshi_market_products");
    if (saved) {
      try { setProducts(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("yeshi_market_products", JSON.stringify(updated));
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return alert("Please enter name and price.");

    if (editingId) {
      const updated = products.map((p) => p.id === editingId ? { ...newProduct, id: editingId, price: Number(newProduct.price) } : p);
      saveProducts(updated);
      setEditingId(null);
    } else {
      const created = { ...newProduct, id: Date.now(), price: Number(newProduct.price) };
      saveProducts([...products, created]);
    }
    setNewProduct({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" });
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setNewProduct(prod);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) {
      saveProducts(products.filter((p) => p.id !== id));
    }
  };

  const filtered = products.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", maxWidth: "600px", margin: "0 auto", paddingBottom: "40px" }}>
      
      {/* Top Header - Clean for customers, shows owner badge ONLY for @bekivisuals1221 */}
      <div style={{ background: "#fff", padding: "16px", borderRadius: "16px", textAlign: "center", marginBottom: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px" }}>Yeshi Market</h1>
        <p style={{ margin: "0 0 4px", color: "#64748b", fontSize: "13px" }}>Food • Beauty • Accessories</p>
        
        {isOwner && (
          <div style={{ marginTop: "8px" }}>
            <span style={{ background: "#dbeafe", color: "#1e40af", padding: "4px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}>
              👑 Owner Mode Active (@bekivisuals1221)
            </span>
          </div>
        )}
      </div>

      {/* OWNER ADMIN PANEL - Strictly visible only when isOwner is true */}
      {isOwner && (
        <div style={{ background: "#eff6ff", border: "2px dashed #2563eb", padding: "16px", borderRadius: "16px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 12px", color: "#1e40af" }}>{editingId ? "✏️ Edit Product" : "➕ Add New Product"}</h3>
          
          <form onSubmit={handleAddOrUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            <input type="number" placeholder="Price (ETB)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            
            <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Photo Upload */}
            <div style={{ background: "#fff", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#475569", marginBottom: "6px" }}>
                📷 Upload Photo from Gallery:
              </label>
              <input type="file" accept="image/*" onChange={handleImageFileUpload} style={{ fontSize: "12px" }} />
              
              {newProduct.image && (
                <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src={newProduct.image} alt="Preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                  <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "bold" }}>✓ Photo Uploaded</span>
                </div>
              )}
            </div>

            <textarea placeholder="Description" value={newProduct.desc} onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
            
            <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              {editingId ? "Save Changes" : "Publish to Shop"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setNewProduct({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" }); }} style={{ background: "#e2e8f0", border: "none", padding: "6px", borderRadius: "8px", cursor: "pointer" }}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      )}

      {/* Search & Categories */}
      <input type="text" placeholder="🔍 Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "12px", border: "1px solid #cbd5e1", marginBottom: "12px", boxSizing: "border-box" }} />
      
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginBottom: "16px" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 14px", borderRadius: "20px", border: "none", backgroundColor: activeCategory === cat ? "#2563eb" : "#fff", color: activeCategory === cat ? "#fff" : "#475569", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ background: "#fff", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Product Photo with Zoom Trigger */}
              <div style={{ position: "relative" }}>
                <ProductMedia src={item.image} alt={item.name} size="52px" onClick={() => item.image && setZoomedImage(item.image)} />
                {item.image && (
                  <button 
                    onClick={() => setZoomedImage(item.image)} 
                    style={{ position: "absolute", bottom: "-2px", right: "-2px", background: "#0f172a", color: "#fff", border: "none", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    🔍
                  </button>
                )}
              </div>

              <div>
                <h4 style={{ margin: "0", fontSize: "14px" }}>{item.name}</h4>
                <p style={{ margin: "2px 0 0", color: "#2563eb", fontWeight: "bold" }}>{item.price} ETB</p>
              </div>
            </div>

            {/* Owner Actions vs Regular Customer Actions */}
            {isOwner ? (
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => handleEdit(item)} style={{ background: "#dbeafe", color: "#1d4ed8", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ background: "#fee2e2", color: "#ef4444", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>Delete</button>
              </div>
            ) : (
              <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}>
                + Add
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 🔍 PHOTO ZOOM MODAL */}
      {zoomedImage && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 3000 }} onClick={() => setZoomedImage(null)}>
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "80%" }} onClick={(e) => e.stopPropagation()}>
            <img src={zoomedImage} alt="Zoomed View" style={{ width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }} />
            <button 
              onClick={() => setZoomedImage(null)} 
              style={{ position: "absolute", top: "-12px", right: "-12px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: "32px", height: "32px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
