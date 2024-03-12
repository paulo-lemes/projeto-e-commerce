import { contextCart } from "../../context/CartContext"

export const BtnAddToCart = ({product}) => {
    const { addToCart } = contextCart()

    return (<button type="button" onClick={() => addToCart(product)}>Add to cart</button>)
}

export const BtnDeleteFromCart = ({product}) => {
    const { deleteFromCart } = contextCart()

    return (<button type="button" onClick={() => deleteFromCart(product.id)}>Delete from cart</button>)
}

export const BtnDeleteAllFromCart = () => {
    const { deleteAllFromCart } = contextCart()

    return (<button type="button" onClick={() => deleteAllFromCart()}>Delete all from cart</button>)
}