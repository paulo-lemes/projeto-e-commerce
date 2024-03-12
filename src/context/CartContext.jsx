import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const contextCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState({
    qty: 0,
    price: 0,
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const productIndex = prev.findIndex(({ id }) => id === product.id);
      if (productIndex === -1) {
        return [...prev, { ...product, qty: 1 }];
      } else {
        const updatedProducts = [...prev];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          qty: updatedProducts[productIndex].qty + 1,
        };

        return updatedProducts;
      }
    });
  };

  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const deleteAllFromCart = () => {
    setCart([]);
  };

  const increaseProductQty = (product) => {
    setCart((prev) => {
      const productIndex = prev.findIndex(({ id }) => id === product.id);
      const updatedProducts = [...prev];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        qty: updatedProducts[productIndex].qty + 1,
      };

      return updatedProducts;
    });
  };

  const decreaseProductQty = (product) => {
    setCart((prev) => {
      const productIndex = prev.findIndex(({ id }) => id === product.id);
      if (prev[productIndex].qty > 1) {
        const updatedProducts = [...prev];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          qty: updatedProducts[productIndex].qty - 1,
        };

        return updatedProducts;
      } else {
        deleteFromCart(product.id);
        return [];
      }
    });
  };

  useEffect(() => {
    const sumQty = cart.reduce((acc, product) => acc + product.qty, 0);
    const sumPrice = cart.reduce(
      (acc, product) => acc + product.price * product.qty,
      0
    );
    setTotal((prev) => ({ ...prev, qty: sumQty, price: sumPrice }));
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    console.log(total);
  }, [total]);

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        deleteFromCart,
        deleteAllFromCart,
        increaseProductQty,
        decreaseProductQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
