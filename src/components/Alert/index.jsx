import { Link } from "react-router-dom";
import style from "./style.module.css";
import { useEffect, useRef } from "react";

const Alert = ({ closeAlert, textAlert, addedToCart }) => {
  const alertRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (!alertRef.current) {
      return;
    }
    if (!alertRef.current.contains(event.target)) {
      closeAlert();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  let Btn = (
    <button onClick={closeAlert} className={style.close}>
      OK
    </button>
  );

  if (addedToCart) {
    Btn = (
      <>
        <button onClick={closeAlert} className={style.close}>
          Keep searching
        </button>
        <Link to="/cart">
          <button onClick={closeAlert} className={style.close}>
            View cart
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      <div className={style.overlay}>
        <div ref={alertRef} className={style.alert}>
          <h4 className={style.text}>{textAlert}</h4>
          {Btn}
        </div>
      </div>
    </>
  );
};

export default Alert;
