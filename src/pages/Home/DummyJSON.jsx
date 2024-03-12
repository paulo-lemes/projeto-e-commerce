import { useState, useEffect, useRef, useMemo } from "react";
import fetchApi from "../../api";
import axios from "axios";
import ProductList from "../../components/ProductList";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const products = useRef([]);
  const totalProducts = useRef(0);
  const limitProductsPage = useRef(35);
  const totalPages =
    totalProducts.current / limitProductsPage.current >= 1
      ? totalProducts.current / limitProductsPage.current
      : 1;

  const handleSearchProducts = async () => {
    limitProductsPage.current = 100;
    setPage(0);
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
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limitProductsPage.current}&skip=${page}&select=id,title,price,description,brand,category,thumbnail`
      );
      products.current = data.products;
      totalProducts.current = data.total;
      console.log(data);
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
  }, [page]);

  useEffect(() => {
    if (searchText === "") {
      limitProductsPage.current = 35;
      setPage(0);
      fetchProducts();
    }
  }, [searchText]);

  const prevPage = () => {
    setPage((prev) => (prev !== 0 ? prev - limitProductsPage.current : prev));
  };

  const nextPage = () => {
    setPage((prev) =>
      prev >= totalProducts.current - limitProductsPage.current
        ? prev
        : prev + limitProductsPage.current
    );
  };

  return (
    <>
      <div>
        <h1>Lemes Store</h1>
        <div>
          <input type="text" onChange={handleInputText} />
          <button onClick={handleSearchProducts}>Search in all products</button>
        </div>
        <p>Click on the product for more details!</p>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <p>
              Page {page / limitProductsPage.current + 1} of{" "}
              {Math.ceil(totalPages)}
            </p>
            <p>Qtd items page: {productsFiltereded.length}</p>
            <button onClick={prevPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
            <ul>
              <ProductList products={productsFiltereded} />
            </ul>
          </>
        )}
      </div>
    </>
  );
}
