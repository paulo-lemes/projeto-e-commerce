import "./App.css";
import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Router from "./routes";

function App() {
  return (
    <>
      <AlertProvider>
        <AuthProvider>
          <CartProvider>
            <Router />
          </CartProvider>
        </AuthProvider>
      </AlertProvider>
    </>
  );
}

export default App;
