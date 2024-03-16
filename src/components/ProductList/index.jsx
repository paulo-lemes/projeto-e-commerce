import Modal from "../Modal";
import style from "./style.module.css";
import { useState, useCallback } from "react";

const ProductList = ({ products }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState({});
  const [indexProduct, setIndexProduct] = useState(0);

  function openModal(prod, i) {
    setProductModal(prod);
    setIndexProduct(i);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showNextModal = useCallback(() => {
    setIndexProduct((prevI) => prevI + 1);
    if (indexProduct !== products.length - 1) {
      setProductModal(products[indexProduct + 1]);
      return;
    }
    setProductModal(products[0]);
    setIndexProduct(0);
  }, [productModal]);

  const showPrevModal = useCallback(() => {
    setIndexProduct((prevI) => prevI - 1);
    if (indexProduct !== 0) {
      setProductModal(products[indexProduct - 1]);
      return;
    }
    setProductModal(products[products.length - 1]);
    setIndexProduct(products.length - 1);
  }, [productModal]);

  return (
    <>
      <div className={style.divProductList}>
        <ul className={style.productList}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={product.id} className={style.divCard}>
                <li key={product.id} className={style.cardProduct}>
                  <div className={style.divCardImg}>
                    <img
                      src={product.image}
                      className={style.cardImg}
                      onClick={() => openModal(product, index)}
                    ></img>
                  </div>
                  <div className={style.divCardTitle}>
                    {/* <h3 className={style.cardTitle}>{product.rating.rate}</h3> */}
                    <h3 className={style.cardTitle}>{product.title}</h3>
                    <h3 className={style.cardPrice}>${product.price}</h3>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <div className={style.divNoProducts}>
              <p>
                No products found. Try searching by other name or select one of
                the categories to filter products!
              </p>
            </div>
          )}
        </ul>
      </div>
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
