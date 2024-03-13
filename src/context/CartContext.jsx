import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [total, setTotal] = useState({
    qty: 0,
    price: 0,
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    const sumQty = cart.reduce((acc, product) => acc + product.qty, 0);
    const sumPrice = cart.reduce(
      (acc, product) => acc + product.price * product.qty,
      0
    );
    setTotal((prev) => ({ ...prev, qty: sumQty, price: sumPrice }));
    if (reload) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setReload(true);
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
    setReload(true);
    setCart((prev) => prev.filter((product) => product.id !== id));
  };

  const deleteAllFromCart = () => {
    setReload(true);
    setCart([]);
  };

  const increaseProductQty = (product) => {
    setReload(true);
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
    setReload(true);
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
        const updatedProducts = prev.filter((prod) => prod.id !== product.id);
        return updatedProducts;
      }
    });
  };

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
