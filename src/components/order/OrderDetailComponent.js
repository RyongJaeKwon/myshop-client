import { useEffect } from "react"
import { useSelector } from "react-redux"
import { API_SERVER_HOST } from "../../api/memberApi"
import useOrderHook from "../../hooks/useOrderHook"
import { useParams } from "react-router-dom"
import useItemHook from "../../hooks/useItemHook"

const OrderDetailComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const orderItems = useSelector(state => state.orderSlice.orderItems)
    const host = API_SERVER_HOST
    const {getOrderItems} = useOrderHook()
    const {exceptionHandle} = useItemHook()
    const {orderId} = useParams()

    useEffect(() => {
        const getOrderItemList = async () => {
            try {
                await getOrderItems({userId: loginState.userId, orderId})
            } catch (error) {
                console.error("error: ", error)
                exceptionHandle(error)
            }
        }

        getOrderItemList()

        // eslint-disable-next-line
    }, [getOrderItems, loginState.userId])

    if (!orderItems || orderItems.length === 0) {
        return <div>Loading...</div>;
    }

    console.log("orderItems: ", orderItems)

    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    }

    return(
        <div className="w-full p-4">
            <h2 className=" flex justify-center text-lg">주문 상세 페이지</h2>
            <h2 className="mt-10 text-lg font-bold">배송 정보</h2>
            <hr />
            <div className="mt-2">
                <div className="flex justify-between mt-2">
                    <div className="mt-2">이름</div>
                    <div className="p-1 w-2/3">{orderItems[0].receiverName}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="mt-2">연락처</div>
                    <div className="p-1 w-2/3">{orderItems[0].receiverPhone}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="mt-2">우편번호</div>
                    <div className="p-1 w-2/3">{orderItems[0].postcode}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="mt-2">기본주소</div>
                    <div className="p-1 w-2/3">{orderItems[0].basicAddress}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="mt-2">상세주소</div>
                    <div className="p-1 w-2/3">{orderItems[0].detailAddress}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="mt-2">배송메세지</div>
                    <textarea
                        className="p-1 w-2/3 border border-gray-300"
                        value={orderItems[0].message}
                        readOnly
                    />
                </div>
            </div>

            <h2 className="mt-10 text-lg font-bold">주문 상품</h2>
            <hr/>
            <div>
                {orderItems.map(item => (
                    <div key={item.itemId} className="relative flex justify-between items-center p-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            {item.imageUrl && item.imageUrl.length > 0 && (
                                <img src={`${host}/items/view/s_${item.imageUrl}`} alt="itemimage"
                                className="w-20 h-20 object-cover"/>
                            )}
                            <div>
                                <h2 className="text-lg font-bold">{item.itemName}</h2>
                                <p className="text-gray-600">{item.color} | {item.size}</p>
                                <p className="text-gray-600">{formatNumber(item.price)}원</p>
                            </div>
                        </div>
                        <div className="absolute right-20 mr-20 flex items-center gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-md">수량 : {item.quantity}개</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {formatNumber(item.price * item.quantity)}원
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 mb-10">
                <div className="mt-4 text-right text-xl font-bold">
                    주문 금액: {formatNumber(totalPrice)}원
                </div>
            </div>
        </div>
    )
}

export default OrderDetailComponent