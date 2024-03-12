import { useState, useEffect, useRef, useMemo } from "react";
import fetchApi from "../../api";
import ProductList from "../../components/ProductList";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const products = useRef([]);

  const handleSearchProducts = async () => {
    await fetchProducts();
  };

  const handleInputText = (event) => {
    setSearchText(event.target.value);
  };

  const productsFiltereded = useMemo(() => {
    const searchTextLowerCase = searchText.toLowerCase();
    const productsFilter = products.current.filter((product) =>
      product.title.toLowerCase().includes(searchTextLowerCase)
    );
    return productsFilter;
  }, [loading, searchText]);

  const fetchProducts = async () => {
    try {
      const { data } = await fetchApi.get(`products`);
      console.log(data);
      products.current = data;
      setLoading(true);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main>
        <div>
          <input type="text" onChange={handleInputText} />
          <button onClick={handleSearchProducts}>Search</button>
        </div>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <ProductList products={productsFiltereded} />
        )}
      </main>
    </>
  );
}
