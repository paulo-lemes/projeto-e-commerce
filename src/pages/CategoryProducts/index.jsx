import { useParams } from "react-router-dom";
import ProductList from "../../components/ProductList";
import style from "./style.module.css";
import SearchProducts from "../../components/SearchProducts";
import { useProducts } from "../../context/ProductsContext";
import { useEffect } from "react";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { handleSearchCategory } = useProducts();

  useEffect(() => handleSearchCategory(categoryName), [categoryName]);

  const description = {
    electronics:
      "Discover Innovation: Explore our Electronics Collection! From cutting-edge gadgets to smart devices, find everything you need to stay connected and empowered. Dive into a world of endless possibilities with our top-quality electronics, designed to elevate your lifestyle.",

    jewelery:
      "Sparkle and Shine: Unveil Elegance with our Jewelry Collection! Each piece tells a story of sophistication and glamour, crafted with precision and passion. Elevate your look and express your unique style with our exquisite selection of timeless treasures, perfect for every occasion.",

    "men's clothing":
      "Elevate Your Style: Explore our Men's Clothing Collection! From timeless classics to contemporary trends, redefine your wardrobe with our curated selection of apparel and accessories. Embrace confidence and sophistication with our premium-quality garments designed to reflect your individuality.",

    "women's clothing":
      "Radiate Confidence: Dive into our Women's Clothing Collection! Embrace your inner goddess with our diverse range of fashion-forward pieces, carefully curated to inspire and empower. From casual chic to red carpet glamour, discover your signature style with our stunning selection of apparel and accessories.",
  };

  return (
    <>
      <div className={style.divCategoryProducts}>
        <h2 className={style.categoryName}>{categoryName.toUpperCase()}</h2>
        <p className={style.descriptionCategory}>{description[categoryName]}</p>
      </div>
      <SearchProducts />
      <ProductList />
    </>
  );
};

export default CategoryProducts;
