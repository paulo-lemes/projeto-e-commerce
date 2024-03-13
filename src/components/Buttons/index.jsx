import { useCart } from "../../context/CartContext"

export const BtnAddToCart = ({product}) => {
    const { addToCart } = useCart()

    return (<button type="button" onClick={() => addToCart(product)}>Add to cart</button>)
}

export const BtnDeleteFromCart = ({product}) => {
    const { deleteFromCart } = useCart()

    return (<button type="button" onClick={() => deleteFromCart(product.id)}>Delete from cart</button>)
}

export const BtnDeleteAllFromCart = () => {
    const { deleteAllFromCart } = useCart()

    return (<button type="button" onClick={() => deleteAllFromCart()}>Delete all from cart</button>)
}