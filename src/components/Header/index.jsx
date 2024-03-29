import { Link } from "react-router-dom";
import style from "./style.module.css";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import Logo from "../../assets/storeicon.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import fetchApi from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import useAlert from "../../hooks/useAlert";
import Alert from "../Alert";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const { total } = useCart();
  const { user, handleLogout } = useAuth();
  const { alertIsOpen, closeAlert, showAlert, textAlert } = useAlert();

  const handleClickLogout = () => {
    handleLogout();
    showAlert("You've been logged out");
  };

  const getCategories = async () => {
    try {
      const { data } = await fetchApi("/products/categories");
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <header className={style.header}>
        <Link to={"/"}>
          <img className={style.logo} src={Logo} alt="Store Logo"></img>
        </Link>
        <div>
          <ul className={style.navList}>
            <Link to={"/"}>
              <li className={style.navOption}>HOME</li>
            </Link>
            <li className={`${style.navOption} ${style.dropdown}`}>
              <span>CATEGORIES</span>
              <div className={style.dropdownContent}>
                {categories.map((category, index) => (
                  <Link to={`/category/${category}`} key={index}>
                    <p>{category.toUpperCase()}</p>
                  </Link>
                ))}
              </div>
            </li>
            {user ? (
              <>
                <div className={`${style.navOption} ${style.dropdown}`}>
                  <Link to={"/profile"}>
                    <li>PROFILE</li>
                  </Link>
                  <div
                    className={`${style.dropdownContent} ${style.logout}`}
                    onClick={handleClickLogout}
                  >
                    <p>LOGOUT</p>
                  </div>
                </div>
              </>
            ) : (
              <Link to={"/login"}>
                <li className={style.navOption}>LOGIN</li>
              </Link>
            )}
          </ul>
        </div>
        <div className={style.divCart}>
          <Link to={"/cart"}>
            <ShoppingCartSimple size={30} />
            {total.qty > 0 && (
              <span className={style.cartQty}>{total.qty}</span>
            )}
          </Link>
        </div>
      </header>
      {alertIsOpen && <Alert closeAlert={closeAlert} textAlert={textAlert} />}
    </>
  );
};

export default Header;
