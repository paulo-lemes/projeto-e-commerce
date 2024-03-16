import { createContext, useContext, useEffect, useState } from "react";
import Alert from "../components/Alert"

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertIsOpen, setAlert] = useState(false);
  const [textAlert, setTextAlert] = useState("");

  const closeAlert = () => {
    setAlert(false);
  };

  const showAlert = (text) => {
    setTextAlert(text)
    setAlert(true)
  }

  return (
    <AlertContext.Provider value={{ alertIsOpen, closeAlert, showAlert, textAlert }}>
      {children}
      {alertIsOpen && <Alert />}
    </AlertContext.Provider>
  );
};
