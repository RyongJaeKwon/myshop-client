import { useEffect } from "react"
import useOrderHook from "../../hooks/useOrderHook"
import { useSelector } from "react-redux"
import useItemHook from "../../hooks/useItemHook"

const OrderListComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const orders = useSelector(state => state.orderSlice)
    const {getOrders, moveToOrderDetail} = useOrderHook()
    const {exceptionHandle} = useItemHook()
    console.log("orders: ", orders)

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


    return(
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Order List</h2>
            {orders && orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.orderId} className="border p-4 mb-4 rounded-md">
                        <div className="flex justify-between mb-2">
                            <div>
                                {/* <h3 className="text-lg font-semibold">Order ID: {order.orderId}</h3> */}
                                <p className="text-gray-600 text-lg font-bold">{new Date(order.orderDate).toLocaleDateString()}</p>
                                <p className="text-gray-600">주문금액: {order.totalPrice}원</p>
                                <p className="text-gray-600">주문상태: {order.status}</p>
                            </div>
                            <button 
                                onClick={() => handleOrderDetailClick(order.orderId)} 
                                className="bg-blue-500 text-white px-2 rounded"
                            >
                                주문 상세보기
                            </button>
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
                    </div>
                ))
            ) : (
                <p>주문이 없습니다</p>
            )}
        </div>
    )
}

export default OrderListComponent