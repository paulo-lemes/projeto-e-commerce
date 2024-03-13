import {
  BtnDeleteAllFromCart,
  BtnDeleteFromCart,
} from "../../components/Buttons";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, total, increaseProductQty, decreaseProductQty } = useCart();

  return (
    <>
      <ul>
        {cart.length > 0 ? (
          <>
            {cart.map((product) => (
              <li key={product.id}>
                {/* <img src={product.image}></img> */}
                {product.title}
                <button onClick={() => increaseProductQty(product)}>+</button>
                <span>{product.qty}</span>
                <button onClick={() => decreaseProductQty(product)}>-</button>
                <span>{product.price}</span>
                <BtnDeleteFromCart product={product} />
              </li>
            ))}
            <BtnDeleteAllFromCart />
            <p>Qty items: {total.qty}</p>
            <p>Price total: {total.price}</p>
          </>
        ) : (
          <span>Nenhum produto adicionado ao carrinho</span>
        )}
      </ul>
    </>
  );
};

export default Cart;
