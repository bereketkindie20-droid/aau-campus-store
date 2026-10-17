import React, { useState, useEffect } from 'react';

// Your Supabase Configuration
const SUPABASE_URL = "https://gisizxadtwdxydcpemli.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE"; // Get this from Supabase: Settings -> API

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
  const [isSaving, setIsSaving] = useState(false);

  // Form state for Owner panel
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Secret URL parameter (?admin=Yeshi@1221)
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("admin") === "Yeshi@1221") {
        setIsOwner(true);
      }

      // 2. Telegram WebApp User credentials
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
        const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;

        if (tgUser) {
          const username = (tgUser.username || "").toLowerCase();
          const phone = (tgUser.phone_number || "").replace(/[^0-9]/g, "");

          if (username === "bekivisuals1221" || phone.includes("950239368")) {
            setIsOwner(true);
          }
        }
      }
    }

    fetchProductsFromSupabase();
  }, []);

  // Fetch live products from Supabase database table
  const fetchProductsFromSupabase = async () => {
    if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "PASTE_YOUR_SUPABASE_ANON_KEY_HERE") return;

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    } catch (e) {
      console.error("Supabase fetch error:", e);
    }
  };

  // Upload photo file directly to Supabase Storage Bucket
  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "PASTE_YOUR_SUPABASE_ANON_KEY_HERE") {
      // Local Base64 preview fallback if key not set
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
      return;
    }

    setIsSaving(true);
    const fileName = `product_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;

    try {
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/products/${fileName}`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": file.type
        },
        body: file
      });

      if (res.ok) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
        setNewProduct((prev) => ({ ...prev, image: publicUrl }));
        alert("📷 Photo uploaded to Supabase cloud storage!");
      } else {
        alert("⚠️ Photo upload failed. Ensure 'products' bucket is created as PUBLIC in Supabase Storage.");
      }
    } catch (e) {
      alert("Error uploading image.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return alert("Please enter product name and price.");

    let updatedList = [];
    if (editingId) {
      updatedList = products.map((p) => p.id === editingId ? { ...newProduct, id: editingId, price: Number(newProduct.price) } : p);
      setEditingId(null);
    } else {
      const created = { ...newProduct, id: Date.now(), price: Number(newProduct.price) };
      updatedList = [...products, created];
    }

    setProducts(updatedList);
    setNewProduct({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" });
    alert("✅ Store updated successfully!");
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setNewProduct(prod);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this product permanently?")) {
      const updatedList = products.filter((p) => p.id !== id);
      setProducts(updatedList);
    }
  };

  // 1-Tap Direct Telegram Order Dispatch
  const handleOrderOnTelegram = (item) => {
    const text = encodeURIComponent(
      `👋 Hi Yeshi Market! I want to order this item:\n\n` +
      `📦 Item: ${item.name}\n` +
      `💰 Price: ${item.price} ETB\n` +
      `🔖 Category: ${item.category}\n\n` +
      `Please let me know the delivery process in Addis Ababa!`
    );
    window.open(`https://t.me/bekivisuals1221?text=${text}`, '_blank');
  };

  const filtered = products.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ padding: "16px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", maxWidth: "500px", margin: "0 auto", paddingBottom: "40px" }}>
      
      {/* App Header */}
      <div style={{ background: "#ffffff", padding: "18px 16px", borderRadius: "20px", textAlign: "center", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <h1 style={{ margin: "0 0 2px", fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>Yeshi Market</h1>
        <p style={{ margin: "0", color: "#64748b", fontSize: "13px", fontWeight: "500" }}>Addis Ababa • Direct Delivery 🚚</p>
        
        {/* Owner Badge */}
        {isOwner && (
          <div style={{ marginTop: "12px" }}>
            <span style={{ background: "#dbeafe", color: "#1e40af", padding: "5px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", display: "inline-block" }}>
              👑 Owner Admin Active (@bekivisuals1221)
            </span>
          </div>
        )}
      </div>

      {/* OWNER ADMIN PANEL */}
      {isOwner && (
        <div style={{ background: "#eff6ff", border: "2px dashed #2563eb", padding: "16px", borderRadius: "20px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 12px", color: "#1e40af", fontSize: "16px" }}>{editingId ? "✏️ Edit Product Details" : "➕ Add New Product"}</h3>
          
          <form onSubmit={handleAddOrUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} style={{ padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
            <input type="number" placeholder="Price (ETB)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} style={{ padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
            
            <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} style={{ padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }}>
              {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Photo Upload */}
            <div style={{ background: "#fff", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>
                📷 Upload Photo to Supabase Storage:
              </label>
              <input type="file" accept="image/*" onChange={handleImageFileUpload} style={{ fontSize: "12px" }} />
              
              {newProduct.image && (
                <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src={newProduct.image} alt="Preview" style={{ width: "44px", height: "44px", objectFit: "cover", borderRadius: "8px" }} />
                  <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "700" }}>✓ Image Ready</span>
                </div>
              )}
            </div>

            <textarea placeholder="Description" value={newProduct.desc} onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })} style={{ padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "14px" }} />
            
            <button type="submit" disabled={isSaving} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>
              {editingId ? "Save Changes" : "Publish to Store"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setNewProduct({ name: "", price: "", category: "Food & Snacks", image: "", desc: "" }); }} style={{ background: "#e2e8f0", border: "none", padding: "8px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      )}

      {/* Search Bar & Category Tabs */}
      <input 
        type="text" 
        placeholder="🔍 Search products..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        style={{ width: "100%", padding: "12px 16px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "14px", boxSizing: "border-box", fontSize: "14px", background: "#fff" }} 
      />
      
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", marginBottom: "18px", paddingBottom: "4px" }}>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)} 
            style={{ 
              padding: "8px 16px", 
              borderRadius: "20px", 
              border: "none", 
              backgroundColor: activeCategory === cat ? "#2563eb" : "#ffffff", 
              color: activeCategory === cat ? "#ffffff" : "#64748b", 
              fontWeight: "700", 
              fontSize: "12px", 
              cursor: "pointer", 
              whiteSpace: "nowrap",
              boxShadow: activeCategory === cat ? "0 4px 12px rgba(37,99,235,0.25)" : "0 1px 3px rgba(0,0,0,0.03)"
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{ background: "#ffffff", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
            
            <div style={{ position: "relative", width: "100%", height: "180px", background: "#f1f5f9" }}>
              <img 
                src={item.image} 
                alt={item.name} 
                onClick={() => setZoomedImage(item.image)}
                style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }} 
              />
              <button 
                onClick={() => setZoomedImage(item.image)}
                style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(15, 23, 42, 0.6)", color: "#fff", border: "none", borderRadius: "50%", width: "30px", height: "30px", fontSize: "12px", cursor: "pointer" }}>
                🔍
              </button>
            </div>

            <div style={{ padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <h3 style={{ margin: "0", fontSize: "15px", color: "#0f172a", fontWeight: "700", flex: 1, paddingRight: "8px" }}>{item.name}</h3>
                <span style={{ color: "#2563eb", fontWeight: "800", fontSize: "16px", whiteSpace: "nowrap" }}>{item.price} ETB</span>
              </div>
              
              {item.desc && <p style={{ margin: "0 0 12px", color: "#64748b", fontSize: "12px", lineHeight: "1.4" }}>{item.desc}</p>}

              {isOwner ? (
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => handleEdit(item)} style={{ flex: 1, background: "#dbeafe", color: "#1d4ed8", border: "none", padding: "10px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
                    ✏️ Edit Product
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: "#fee2e2", color: "#ef4444", border: "none", padding: "10px 14px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}>
                    🗑️
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => handleOrderOnTelegram(item)}
                  style={{ width: "100%", background: "#2563eb", color: "#ffffff", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                  <span>💬 Order on Telegram</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* 🔍 PHOTO ZOOM MODAL */}
      {zoomedImage && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(15, 23, 42, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", zIndex: 3000 }} onClick={() => setZoomedImage(null)}>
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "80%" }} onClick={(e) => e.stopPropagation()}>
            <img src={zoomedImage} alt="Zoomed View" style={{ width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain", borderRadius: "16px" }} />
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
