import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const token = useSelector((state) => state.auth.token);

  const fetchCartItems = () => {
    fetch(`http://localhost:5003/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setSellers([]);
        return data;
      }).then((data) => {
        setCartItems(data || []);
        setTotalPrice(data.map(item => item.price).reduce((a, b) => a + b, 0));
        const sellersTemp = data.map((item) => item.seller);
        return Promise.all(sellersTemp.map(fetchSellers));
      }).then((data) => { setSellers(data) })
      .catch(error => {
        console.error("Error fetching cart:", error);
      });
  };

  const fetchSellers = (username) => {
    return new Promise((resolve, reject) => {
      console.log("Fetching seller: ", username);
      fetch(`http://localhost:5003/profile?username=${username}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },

      }).then(response => response.json()).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })

    })
  }

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, totalPrice, sellers, fetchSellers }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
