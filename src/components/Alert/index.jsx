import { X } from "@phosphor-icons/react";
import style from "./style.module.css";
import { useEffect, useRef } from "react";
import { useAlert } from "../../context/AlertContext";

export const Alert = () => {
  const alertRef = useRef(null);
  const {textAlert, closeAlert} = useAlert()

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

  return (
    <>
      <div className={style.overlay}>
        <div ref={alertRef} className={style.alert}>
          <h4 className={style.text}>{textAlert}</h4>
          <button onClick={closeAlert} className={style.close}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default Alert;
