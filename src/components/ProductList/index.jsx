import { contextCart } from "../../context/CartContext";
import { BtnAddToCart } from "../Buttons";
import Modal from "../Modal";
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
      <p>Click on the product for more details!</p>
      <ul>
        {products.length > 0 ? (
          products.map((product, index) => (
            <li
              key={product.id}              
              style={{ listStyle: "none" }}
            >
              <img
                src={product.image}
                style={{ maxHeight: "150px", maxWidth: "250px" }}
                onClick={() => openModal(product, index)}
              ></img>
              {product.title}
              <BtnAddToCart product={product}/>
            </li>
          ))
        ) : (
          <p>
            No products found on this page. Click on the search button to filter
            all products
          </p>
        )}
      </ul>
      <Modal
        product={productModal}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        showNextModal={showNextModal}
        showPrevModal={showPrevModal}
      />
    </>
  );
};

export default ProductList;
