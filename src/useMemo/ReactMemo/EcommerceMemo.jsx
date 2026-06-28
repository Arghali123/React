import React, { useMemo, useState } from "react";

const ProductCart = React.memo(({ product }) => {
  console.log(`[Render] ProductCart: ${product.name}`);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "4px",
      }}
    >
      <h4>{product.name}</h4>
      <p>Price: ${product.price}</p>
    </div>
  );
});

const ProductList = React.memo(({ products }) => {
  console.log(`[Render] ProductList Component`);
  return (
    <div>
      <h3>Product List</h3>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))
      ) : (
        <p>No Product found</p>
      )}
    </div>
  );
});

function EcommerceMemo() {
  console.log(`[Render] EcommerceMemo Component`);
  const initialProducts = [
    { id: 1, name: "Wireless Mouse", price: 25 },
    { id: 2, name: "Mechanical Keyboard", price: 85 },
    { id: 3, name: "Gaming Monitor", price: 250 },
    { id: 4, name: "Leather Wallet", price: 40 },
    { id: 5, name: "Coffee Mug", price: 15 },
    { id: 6, name: "Bluetooth Headphones", price: 120 },
    { id: 7, name: "Desk Mat", price: 20 },
    { id: 8, name: "USB-C Cable", price: 10 },
    { id: 9, name: "Water Bottle", price: 18 },
    { id: 10, name: "Smart Watch", price: 199 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  const filteredProducts = useMemo(() => {
    console.log(
      "%c[Compute] useMemo filtering products...",
      "color: #ff9900; font-weight: bold;",
    );
    return initialProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div
      style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "400px" }}
    >
      <h2>React.Memo mini project</h2>

      <div
        style={{ marginBottom: "20px", padding: "10px", background: "#f0f0f0" }}
      >
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default EcommerceMemo;
