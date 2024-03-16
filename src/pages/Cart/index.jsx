import {
  BtnCheckout,
  BtnDeleteAllFromCart,
  BtnDeleteFromCart,
} from "../../components/Buttons";
import style from "./style.module.css";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, total, increaseProductQty, decreaseProductQty } = useCart();

  return (
    <>
      <div className={style.divCart}>
        <ul>
          {cart.length > 0 ? (
            <>
              <p className={style.cartQty}>Your cart: {total.qty} items</p>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>PRODUCT</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.id} className={style.cartProduct}>
                      <td className={style.tdImg}>
                        <div className={style.divImg}>
                          <img src={product.image}></img>
                        </div>
                      </td>
                      <td className={style.tdTitle}>{product.title}</td>
                      <td className={style.tdQty}>
                        <button
                          onClick={() => increaseProductQty(product)}
                          className={style.btnQty}
                        >
                          +
                        </button>
                        <span>{product.qty}</span>
                        <button
                          onClick={() => decreaseProductQty(product)}
                          className={style.btnQty}
                        >
                          -
                        </button>
                      </td>
                      <td className={style.tdPrice}>${product.price}</td>
                      <td className={style.tdBtnDelete}>
                        <BtnDeleteFromCart product={product} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <BtnDeleteAllFromCart />
              <div className={style.summary}>
                <h3 className={style.summaryTitle}>SUMMARY</h3>
                <p>Items total: {total.qty}</p>
                <p>Price total: ${total.price.toFixed(2)}</p>
                <BtnCheckout />
              </div>
            </>
          ) : (
            <div className={style.divEmptyCart}>
            <p className={style.descriptionEmptyCart}>Your cart is currently empty. Feel free to browse our products and add items to your cart!</p>
            <Link to="/">
            <button type="button" className={style.btnEmptyCart}>Find products</button>
            </Link>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Cart;
