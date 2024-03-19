import { useEffect } from "react";
import ProductList from "../../components/ProductList";
import SearchProducts from "../../components/SearchProducts";
import { useProducts } from "../../context/ProductsContext";
import style from "./style.module.css";
import Img from "../../assets/shopping.svg";

export default function Home() {
  const { handleSearchCategory } = useProducts();

  useEffect(() => {
    handleSearchCategory("");
  }, []);

  return (
    <main>
      <div className={style.divMain}>
        <div className={style.firstContent}>
          <div className={style.text}>
            <h2>EXPLORE ENDLESS POSSIBILITIES</h2>
            <p>
              Whether you're seeking the latest tech gadgets, timeless jewelry
              pieces, or fashion-forward clothing, we've got you covered.
              Explore our curated collections and discover premium-quality
              products that elevate your lifestyle.
            </p>
            <p>
              With secure payment options and fast shipping, shopping has never
              been this seamless. Join us on this journey of discovery and
              indulge in the joy of finding exactly what you need, right at your
              fingertips.
            </p>
          </div>
          <img src={Img}></img>
        </div>
      </div>
      <SearchProducts />
      <ProductList />
    </main>
  );
}
