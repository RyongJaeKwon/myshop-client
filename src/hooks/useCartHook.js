import { useDispatch, useSelector } from "react-redux"
import { deleteOneAsync, getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice"
import { useCallback, useEffect } from "react"

const useCartHook = () => {
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
    const dispatch = useDispatch()

    const changeCart = (cartItem) => {
        dispatch(postChangeCartAsync(cartItem))
    }

    const refreshCart = useCallback(() => {
        dispatch(getCartItemsAsync());
    }, [dispatch]);

    const deleteCartItem = (cartItemId) => {
        dispatch(deleteOneAsync(cartItemId))
    }

    useEffect(() => {
        refreshCart()
    }, [refreshCart])

    return {changeCart, refreshCart, deleteCartItem, cartItemList: cartItemList}

}

export default useCartHook