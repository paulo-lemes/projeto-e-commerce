import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { useState } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { useAlert } from "../../context/AlertContext";

export const BtnAddToCart = ({ product }) => {
  const { addToCart } = useCart();
  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    addToCart(product)
    setSuccess(true)
    setTimeout(()=>{
      setSuccess(false)
    }, 4000)
  }

  return (
    <div className={style.divBtn}>
    <button
      type="button"
      onClick={handleClick}
      className={style.btnAddToCart}
    >
      Add to cart
    </button>
    {success && <p className={style.checkCircle}><CheckCircle size={32}/></p>}
    </div>
  );
};

export const BtnDeleteFromCart = ({ product }) => {
  const { deleteFromCart } = useCart();
  const {showAlert} = useAlert()

  const handleClick = () => {
    deleteFromCart(product.id)
    showAlert("Product deleted from cart")
  }

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

export const BtnDeleteAllFromCart = () => {
  const { deleteAllFromCart } = useCart();
  const {showAlert} = useAlert()

  const handleClick = () => {
    deleteAllFromCart()
    showAlert("All products deleted from cart")
  }

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

export const BtnCheckout = () => {
  const { deleteAllFromCart } = useCart();
  const { user } = useAuth();
  const {showAlert} = useAlert()

  const navigate = useNavigate()

  const handleCheckout = () => {
    if (user){
      showAlert("Purchase ok!")
      deleteAllFromCart()
      navigate("/")
      return
    } 
    showAlert("You need to sign in before continue with the purchase")
    setTimeout(()=>{
      navigate("/login")
    }, 1000)
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
