import React, { useState, useMemo } from 'react';

// Sample product data
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', price: 29.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99 },
  { id: 3, name: 'Gaming Monitor', price: 249.99 },
  { id: 4, name: 'USB-C Cable', price: 12.49 }
];

export default function SortProducts() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [sortBy, setSortBy] = useState('name'); 


  const sortedProducts = useMemo(() => {
    console.log('Sorting products...'); 
    

    return [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price; 
      }
      
      
      return a.name.localeCompare(b.name);
    });
  }, [products, sortBy]); 

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Catalog</h2>
      
      {/* Controls */}
      <label htmlFor="sort-select">Sort By: </label>
      <select 
        id="sort-select" 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="name">Name (A-Z)</option>
        <option value="price">Price (Low to High)</option>
      </select>

      {/* Rendered List */}
      <ul style={{ marginTop: '15px' }}>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
