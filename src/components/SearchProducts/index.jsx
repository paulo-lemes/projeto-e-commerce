import style from "./style.module.css";
import { ListMagnifyingGlass } from "@phosphor-icons/react";
import { useProducts } from "../../context/ProductsContext";

const SearchProducts = () => {
  const { handleInputText, handleSearchProducts } = useProducts()

  return (
    <div className={style.divSearch}>
          <input
            type="text"
            onChange={handleInputText}
            placeholder="Search products"
            className={style.searchInput}
          />
          <button onClick={handleSearchProducts} className={style.btnSearch}>
            <ListMagnifyingGlass size={32} />
          </button>
    </div>
  );
}

export default SearchProducts
