import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import Router from "./routes";

function App() {
  return (
    <>
      <ProductsProvider>
          <AuthProvider>
            <CartProvider>
              <Router />
            </CartProvider>
          </AuthProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
