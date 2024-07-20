import { useDispatch, useSelector } from "react-redux"
import { deleteOneAsync, getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useCartHook = () => {
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
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

    useEffect(() => {
        refreshCart()
    }, [refreshCart])

    return {changeCart, refreshCart, deleteCartItem, moveToCart, cartItemList: cartItemList}

}

export default useCartHook