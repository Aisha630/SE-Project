// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = useSelector((state) => state.auth.token);

  // Function to fetch cart data from the backend
  const fetchCartItems = () => {
    fetch(`http://localhost:5003/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',})
    .then(response => response.json())
    .then(data => {
      setCartItems(data || []);
      setTotalPrice(data.map(item => item.price).reduce((a, b) => a + b, 0));

    })
    .catch(error => {
      console.error("Error fetching cart:", error);
    });
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, totalPrice}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
