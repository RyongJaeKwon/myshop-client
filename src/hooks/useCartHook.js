import { useDispatch } from "react-redux"
import { deleteOneAsync, getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useCartHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const changeCart = (cartItem) => {
        dispatch(postChangeCartAsync(cartItem))
    }

    const refreshCart = useCallback(() => {
        dispatch(getCartItemsAsync());
    }, [dispatch]);

    const deleteCartItem = (cartItemId) => {
        dispatch(deleteOneAsync(cartItemId))
    }

    const moveToCart = () => {
        navigate('/cart/list')
    }

    return {changeCart, refreshCart, deleteCartItem, moveToCart}

}

export default useCartHook