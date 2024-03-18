import { createContext, useContext, useEffect, useState, useMemo } from "react";
import fetchApi from "../api";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [productsUnfiltereded, setProductsUnfiltereded] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchProducts = async () => {
    await fetchProducts();
  };

  const handleInputText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchCategory = (category) => {
    setSearchText("");
    setSearchCategory(category);
  };

  const products = useMemo(() => {
    const searchTextLowerCase = searchText.toLowerCase();
    const productsFilter = productsUnfiltereded.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTextLowerCase) &&
        product.category.includes(searchCategory)
    );
    return productsFilter;
  }, [productsUnfiltereded, searchText, searchCategory]);

  const fetchProducts = async () => {
    try {
      const { data } = await fetchApi.get(`products`);
      console.log(data);
      setProductsUnfiltereded(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        handleInputText,
        handleSearchProducts,
        handleSearchCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
