import { useState } from "react"
import { useParams } from "react-router-dom"
import ProductList from "../../components/ProductList"
import { useEffect } from "react"
import fetchApi from "../../api"

const CategoryProducts = () => {
    const {categoryName} = useParams()
    const [products, setProducts] = useState([])

    const getCategoryProducts = async () => {
        try {
            const {data} = await fetchApi(`/products/category/${categoryName}`)
            console.log(data);
            setProducts(data)
        } catch (err) {
            console.log(err.response.data);
        }
    }

    useEffect(()=>{
        getCategoryProducts()
    }, [categoryName])

    return <ProductList products={products} />
}

export default CategoryProducts