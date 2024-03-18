import { useEffect } from "react";
import ProductList from "../../components/ProductList";
import SearchProducts from "../../components/SearchProducts";
import { useProducts } from "../../context/ProductsContext";

export default function Home() {
  const {handleSearchCategory} = useProducts()

  useEffect(()=>{
    handleSearchCategory("")
  }, [])

  return (
      <main>
        <SearchProducts />
        <ProductList />
      </main>
  );
}
