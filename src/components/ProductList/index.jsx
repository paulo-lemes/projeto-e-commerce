import { Star } from "@phosphor-icons/react";
import { useProducts } from "../../context/ProductsContext";
import Loading from "../Loading";
import Modal from "../Modal";
import style from "./style.module.css";
import { useState, useCallback, useRef } from "react";

const ProductList = () => {
  const { loading, products } = useProducts();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState({});
  const indexProduct = useRef(0);

  function openModal(product, index) {
    setProductModal(product);
    indexProduct.current = index;
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showNextModal = useCallback(() => {
    indexProduct.current++;
    if (indexProduct.current < products.length - 1) {
      setProductModal(products[indexProduct.current + 1]);
      return;
    }
    setProductModal(products[0]);
    indexProduct.current = 0;
  }, [productModal]);

  const showPrevModal = useCallback(() => {
    indexProduct.current--;
    if (indexProduct.current > 0) {
      setProductModal(products[indexProduct.current - 1]);
      return;
    }
    setProductModal(products[products.length - 1]);
    indexProduct.current = products.length - 1;
  }, [productModal]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.divProductList}>
          <ul className={style.productList}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={product.id} className={style.divCard}>
                  <li
                    key={product.id}
                    className={style.cardProduct}
                    onClick={() => openModal(product, index)}
                  >
                    <div className={style.divCardImg}>
                      <img src={product.image} className={style.cardImg}></img>
                    </div>
                    <div className={style.divCardTitle}>
                      <div className={style.divCardRating}>
                        <h3 className={style.cardRating}>
                          {product.rating.rate}
                        </h3>
                        <Star size={17} weight="fill" />
                      </div>
                      <h3 className={style.cardTitle}>{product.title}</h3>
                      <h3 className={style.cardPrice}>${product.price}</h3>
                    </div>
                  </li>
                </div>
              ))
            ) : (
              <div className={style.divNoProducts}>
                <p>
                  No products found. Try searching by other name or select one
                  of the categories to filter products!
                </p>
              </div>
            )}
          </ul>
        </div>
      )}
      {modalIsOpen && (
        <Modal
          product={productModal}
          closeModal={closeModal}
          showNextModal={showNextModal}
          showPrevModal={showPrevModal}
        />
      )}
    </>
  );
};

export default ProductList;
