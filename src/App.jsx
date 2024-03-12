import "./App.css";
import { CartProvider } from "./context/CartContext";
import Router from "./routes";

function App() {
  return (
    <>
      <CartProvider>
        <Router />
      </CartProvider>
    </>
  );
}

export default App;
