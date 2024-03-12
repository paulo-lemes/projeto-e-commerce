import { Link } from "react-router-dom";
import style from "./style.module.css";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import Logo from "../../assets/storeicon-2.png";
import { contextCart } from "../../context/CartContext";

const Header = () => {
  const { cart } = contextCart();

  return (
    <>
      <header className={style.header}>
        <Link to={"/"}>
          <img className={style.logo} src={Logo} alt="Store Logo"></img>
        </Link>
        <div>
          <ul className={style.navList}>
            <li className={style.navOption}>Home</li>
            <li className={`${style.navOption} ${style.dropdown}`}>
              Categories
              <div className={style.dropdownContent}>dropdown</div>
            </li>
            <li className={style.navOption}>Login</li>
          </ul>
        </div>
        <Link to={"/cart"} className={style.cart}>
          <ShoppingCartSimple size={25} />
          <span className={style.cartQty}>{cart.length}</span>
        </Link>
      </header>
    </>
  );
};

export default Header;
