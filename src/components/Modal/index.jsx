import style from "./style.module.css";
import { BtnAddToCart } from "../Buttons";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import Alert from "../Alert";
import useAlert from "../../hooks/useAlert";

const Modal = ({ product, closeModal, showNextModal, showPrevModal }) => {
  const modalRef = useRef(null);

  const { alertIsOpen, closeAlert, showAlert, textAlert } =
    useAlert();

  const handleOutsideClick = (event) => {
    if (!modalRef.current) {
      return;
    }
    if (!modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={style.overlay}>
        <div ref={modalRef} className={style.modal}>
          <div className={style.modalImg}>
            <img src={product.image} className={style.img}></img>
          </div>
          <div className={style.productInfo}>
            <button onClick={closeModal} className={style.close}>
              <X size={20} />
            </button>
            <h2>{product.title}</h2>
            <p className={style.description}>{product.description}</p>
            <p>{product.brand}</p>
            <p>{product.category}</p>
            <span>${product.price}</span>
            <BtnAddToCart product={product} className={style.btnAddToCart} showAlert={showAlert}/>
          </div>
          <button onClick={showPrevModal} className={style.arrowPrev}>
            <CaretLeft size={32} />
          </button>
          <button onClick={showNextModal} className={style.arrowNext}>
            <CaretRight size={32} />
          </button>
        </div>
      </div>
      {alertIsOpen && <Alert closeAlert={closeAlert} textAlert={textAlert} addedToCart={true}/>}
    </>
  );
};

export default Modal;
