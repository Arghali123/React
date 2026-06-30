import React, { useState, useMemo, useCallback } from "react";

// ==========================================
// 1. PRODUCT CARD COMPONENT (Memoized)
// ==========================================
const ProductCard = React.memo(({ product, onDelete }) => {
  console.log(`[Render] ProductCard: ${product.name}`);
  
  return (
    <div style={{
      border: "1px solid #ccc", 
      padding: "10px", 
      margin: "5px 0", 
      display: "flex", 
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <span>{product.name} - ${product.price}</span>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

// ==========================================
// 2. COUNTER COMPONENT
// ==========================================
const Counter = React.memo(({ count, setCount }) => {
  console.log("[Render] Counter");
  return (
    <div style={{ margin: "15px 0" }}>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
    </div>
  );
});

Counter.displayName = "Counter";

// ==========================================
// 3. THEME TOGGLE COMPONENT
// ==========================================
const ThemeToggle = React.memo(({ theme, toggleTheme }) => {
  console.log("[Render] ThemeToggle");
  return (
    <div style={{ margin: "15px 0" }}>
      <button onClick={toggleTheme}>
        Toggle Theme (Current: <strong>{theme}</strong>)
      </button>
    </div>
  );
});

ThemeToggle.displayName = "ThemeToggle";

// ==========================================
// 4. PRODUCT LIST COMPONENT
// ==========================================
const ProductList = React.memo(({ products, onDelete }) => {
  console.log("[Render] ProductList");
  return (
    <div>
      <h3>Product List</h3>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={onDelete} 
          />
        ))
      )}
    </div>
  );
});

ProductList.displayName = "ProductList";

// ==========================================
// 5. DASHBOARD COMPONENT (Main Parent)
// ==========================================
export default function Dashboard() {
  console.log("[Render] Dashboard -----------------------");

  // States
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Smartphone", price: 699 },
    { id: 3, name: "Headphones", price: 199 },
    { id: 4, name: "Keyboard", price: 89 },
  ]);

  // Memoized Theme Toggle handler
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  }, []);

  // Memoized Delete handler
  const handleDelete = useCallback((id) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  }, []);

  // useMemo for filtering products
  const filteredProducts = useMemo(() => {
    console.log("...[Computing] useMemo: Filtering products");
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Dynamic inline styling for theme demonstration
  const dashboardStyle = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: theme === "light" ? "#ffffff" : "#222222",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    transition: "all 0.3s ease"
  };

  return (
    <div style={dashboardStyle}>
      <h1>Dashboard</h1>
      
      <Counter count={count} setCount={setCount} />
      
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      
      <div style={{ margin: "15px 0" }}>
        <input 
          type="text" 
          placeholder="Filter products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
      </div>

      <ProductList products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
}