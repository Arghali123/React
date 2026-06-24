
import React, { useReducer } from 'react';

// 1. Define the Initial State
const initialState = {
  cart: [],
};

// 2. Define the Reducer Function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If product exists, increase its quantity
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // If product is new, add it with a quantity of 1
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case 'INCREASE_QTY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREASE_QTY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) } // Prevents quantity from going below 1
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}

// Mock Products for testing
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99 },
  { id: 2, name: 'Mechanical Keyboard', price: 120 },
  { id: 3, name: 'Gaming Mouse', price: 50 },
];

// 3. Main ShoppingCart Component
export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate Cart Totals
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🛒 Shopping Cart Component</h2>
      <hr />

      {/* Products List Section */}
      <h3>Available Products</h3>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', flex: 1 }}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <button 
              onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: product })}
              style={{ background: '#0070f3', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <hr />

      {/* Cart Content Section */}
      <h3>Your Cart ({totalItems} items)</h3>
      {state.cart.length === 0 ? (
        <p style={{ color: '#666' }}>Your cart is empty.</p>
      ) : (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Product</th>
                <th style={{ padding: '10px' }}>Price</th>
                <th style={{ padding: '10px' }}>Quantity</th>
                <th style={{ padding: '10px' }}>Total</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.cart.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{item.name}</td>
                  <td style={{ padding: '10px' }}>${item.price}</td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}
                      style={{ marginRight: '5px', padding: '2px 8px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold', padding: '0 5px' }}>{item.quantity}</span>
                    <button 
                      onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}
                      style={{ marginLeft: '5px', padding: '2px 8px' }}
                    >
                      +
                    </button>
                  </td>
                  <td style={{ padding: '10px' }}>${item.price * item.quantity}</td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: item.id })}
                      style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Summary Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              style={{ background: '#555', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Clear Cart
            </button>
            <div style={{ textAlign: 'right' }}>
              <h3>Grand Total: ${totalPrice}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}