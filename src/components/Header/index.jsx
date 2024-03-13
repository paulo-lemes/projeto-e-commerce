import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import Logo from "../../assets/storeicon-2.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import fetchApi from "../../api";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const { cart } = useCart();
  const { user, handleLogout } = useAuth();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
              CATEGORIES
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
                    className={style.dropdownContent}
                    onClick={() => {
                      navigate("/");
                      handleLogout();
                    }}
                  >
                    LOGOUT
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
        <Link to={"/cart"} className={style.cart}>
          <ShoppingCartSimple size={25} />
          <span className={style.cartQty}>{cart.length}</span>
        </Link>
      </header>
    </>
  );
};

export default Header;
