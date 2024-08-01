import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getOrdersAsync, orderCartPostAsync, orderPostAsync } from "../slices/orderSlice"
import { useCallback } from "react"

const useOrderHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const postOrder = (orderObj) => {
        dispatch(orderPostAsync(orderObj))
    }

    const postCartOrder = (orderObj) => {
        dispatch(orderCartPostAsync(orderObj))
    }

    const getOrders = useCallback((userId) => {
        dispatch(getOrdersAsync(userId))
    }, [dispatch])

    const moveToMain = () => {
        navigate('/')
    }

    const moveToOrderList = () => {
        navigate('/orders/list')
    }

    const moveToOrderDetail = (orderId) => {
        navigate(`/orders/${orderId}`)
    }

    return {postOrder, postCartOrder, getOrders, moveToMain, moveToOrderDetail, moveToOrderList}

}

export default useOrderHook