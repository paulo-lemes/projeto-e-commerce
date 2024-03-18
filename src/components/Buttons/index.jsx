import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import style from "./style.module.css";

export const BtnAddToCart = ({ product, showAlert }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
    showAlert("Product added to cart!")
  };

  return (
    <div className={style.divBtn}>
      <button
        type="button"
        onClick={handleClick}
        className={style.btnAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export const BtnDeleteFromCart = ({ product, showAlert }) => {
  const { deleteFromCart } = useCart();

  const handleClick = () => {
    deleteFromCart(product.id);
    showAlert("Product deleted from cart");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={style.btnDeleteFromCart}
    >
      Delete from cart
    </button>
  );
};

export const BtnDeleteAllFromCart = ({ showAlert }) => {
  const { deleteAllFromCart } = useCart();

  const handleClick = () => {
    deleteAllFromCart();
    showAlert("All products deleted from cart");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={style.btnDeleteAllFromCart}
    >
      Delete all from cart
    </button>
  );
};

export const BtnCheckout = ({ showAlert, setAfterClose }) => {
  const { deleteAllFromCart } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (user) {
      showAlert("Purchase ok!");
      deleteAllFromCart();
      setAfterClose("/");
      return;
    }
    showAlert("You need to sign in before continue with the purchase");
    setAfterClose("/login");
  };

  return (
    <button
      type="button"
      onClick={() => handleCheckout()}
      className={style.btnCheckout}
    >
      Checkout
    </button>
  );
};
