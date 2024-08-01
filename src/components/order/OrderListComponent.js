import { useEffect, useState } from "react"
import useOrderHook from "../../hooks/useOrderHook"
import { useSelector } from "react-redux"
import useItemHook from "../../hooks/useItemHook"
import ResultModal from "../common/ResultModal"

const OrderListComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const orders = useSelector(state => state.orderSlice.orders)
    const {getOrders, cancelOrder, moveToOrderList, moveToOrderDetail} = useOrderHook()
    const {exceptionHandle} = useItemHook()
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)

    useEffect(() => {
        const getOrdersList = async () => {
            try {
                await getOrders(loginState.userId)
            } catch (error) {
                console.error("error: ", error)
                exceptionHandle(error)
            }
        }

        getOrdersList()

        // eslint-disable-next-line
    }, [getOrders, loginState.userId])

    const handleOrderDetailClick = (orderId) => {
        moveToOrderDetail(orderId)
    }

    const handleCancelOrderClick = async (orderId) => {
        try {
            await cancelOrder({userId: loginState.userId, orderId})
            setIsResultModalOpen(true)
        } catch (error) {
            console.error("error: ", error)
            exceptionHandle(error)
        }
    }

    const closeResultModal = () => {
        setIsResultModalOpen(false)
        moveToOrderList()
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number)
    }

    return(
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            {orders && orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.orderId} className="border p-4 mb-4 rounded-md">
                        <div className="flex justify-between mb-2">
                            <div>
                                <p className="text-lg font-bold">{new Date(order.orderDate).toLocaleDateString()}</p>
                                <p className="text-gray-600 font-bold">주문금액: {formatNumber(order.totalPrice)}원</p>
                                <p className="text-gray-600 font-bold">주문상태: {order.orderStatus}</p>
                                <p className="text-gray-600 font-bold">배송현황: {order.deliveryStatus}</p>
                            </div>
                            <div className="flex flex-col">
                                {order.orderStatus !== 'CANCEL' && (
                                    <>
                                        <button 
                                            onClick={() => handleOrderDetailClick(order.orderId)} 
                                            className="bg-blue-500 text-white py-3 px-2 rounded"
                                        >
                                            주문 상세보기
                                        </button>
                                        <button
                                            onClick={() => handleCancelOrderClick(order.orderId)}
                                            className="bg-red-500 text-white py-3 px-2 rounded mt-2"
                                        >
                                            주문 취소
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold">주문한 상품</h4>
                            <ul className="list-disc ml-5">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map(item => (
                                        <li key={item.itemId} className="text-gray-700">{item.itemName}</li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">주문한 상품이 없습니다</li>
                                )}
                            </ul>
                        </div>
                        {isResultModalOpen ? <ResultModal content={'주문취소가 완료되었습니다'} callbackFn={closeResultModal}/> : <></>}
                    </div>
                ))
            ) : (
                <p>주문이 없습니다</p>
            )}
        </div>
    )
}

export default OrderListComponent