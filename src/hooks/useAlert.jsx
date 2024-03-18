import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAlert = () => {
  const [alertIsOpen, setAlert] = useState(false);
  const [afterClose, setAfterClose] = useState(null);
  const [textAlert, setTextAlert] = useState("");

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlert(false);
    navigate(afterClose);
  };

  const showAlert = (text) => {
    setTextAlert(text);
    setAlert(true);
  };

  return {
    alertIsOpen,
    closeAlert,
    showAlert,
    textAlert,
    setAfterClose,
  };
};

export default useAlert;
