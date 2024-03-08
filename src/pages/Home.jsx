import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import axios from "axios";
import Modal from "../components/Modal";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const products = useRef([]);
  const totalProducts = useRef(0);
  const limitProductsPage = useRef(10);

  const handleFetchProducts = async () => {
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
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limitProductsPage.current}&skip=${page}&select=id,title,price,description,brand,category,thumbnail`
      );
      products.current = response.data.products;
      totalProducts.current = response.data.total;
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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState({});

  function openModal(prod) {
    setProductModal(prod);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showNextModal = useCallback(() => {
    if (
      productModal.id !== productsFiltereded[productsFiltereded.length - 1].id
    ) {
      setProductModal(
        ...productsFiltereded.filter((prod) => prod.id === productModal.id + 1)
      );
      return;
    }
    setProductModal(productsFiltereded[0]);
  }, [productModal]);

  const showPrevModal = useCallback(() => {
    if (productModal.id !== productsFiltereded[0].id) {
      setProductModal(
        ...productsFiltereded.filter((prod) => prod.id === productModal.id - 1)
      );
      return;
    }
    setProductModal(productsFiltereded[productsFiltereded.length - 1]);
  }, [productModal]);

  //   useEffect(() => {}, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
        <h1>e-commerce</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            style={{ borderRadius: 5, padding: 10, minWidth: 400 }}
            type="text"
            placeholder="Name of the product"
            onChange={handleInputText}
          />
          <button
            style={{ color: "white", background: "black" }}
            onClick={handleFetchProducts}
          >
            Search
          </button>
        </div>
        <p>Click on the product for more details!</p>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <ul>
              {productsFiltereded.length > 0 ? (
                productsFiltereded.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => openModal(product)}
                    style={{ listStyle: "none" }}
                  >
                    {product.title}
                    <img
                      src={product.thumbnail}
                      style={{ maxHeight: "150px", maxWidth: "250px" }}
                    ></img>
                  </li>
                ))
              ) : (
                <p>No products found</p>
              )}
            </ul>
            <p>
              Page {page / limitProductsPage.current + 1} of{" "}
              {totalProducts.current / limitProductsPage.current}
            </p>
            <button
              onClick={() =>
                setPage((prev) =>
                  prev !== 0 ? prev - limitProductsPage.current : prev
                )
              }
            >
              Previous
            </button>
            <button
              onClick={() =>
                setPage((prev) =>
                  prev >= totalProducts.current - limitProductsPage.current
                    ? prev
                    : prev + limitProductsPage.current
                )
              }
            >
              Next
            </button>
            <Modal
              product={productModal}
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              showNextModal={showNextModal}
              showPrevModal={showPrevModal}
            />
          </>
        )}
      </div>
    </>
  );
}
