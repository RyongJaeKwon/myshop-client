import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import useOrderHook from "../../hooks/useOrderHook"
import { API_SERVER_HOST } from "../../api/memberApi"
import ResultModal from "../common/ResultModal"
import useCartHook from "../../hooks/useCartHook"

const OrderComponent = () => {
    const loginState = useSelector(state => state.loginSlice)
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
    const {state} = useLocation()
    const selectedItem  = state?.item || null
    const {postOrder, postCartOrder, moveToMain, moveToOrderList} = useOrderHook()
    const {refreshCart} = useCartHook()
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)
    const host = API_SERVER_HOST

    // 배송 정보 상태관리
    const [receiverName, setReceiverName] = useState(loginState.name);
    const [receiverPhone, setReceiverPhone] = useState(loginState.phone);
    const [postcode, setPostcode] = useState(loginState.address.postcode);
    const [basicAddress, setBasicAddress] = useState(loginState.address.basic_address);
    const [detailAddress, setDetailAddress] = useState(loginState.address.detail_address);
    const [message, setMessage] = useState('');

    const items = selectedItem ? [selectedItem] : cartItemList;
    const totalPrice = items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    }

    const formattedItems = items.map(item => ({
        id: item.itemId || item.id,
        itemName: item.itemName,
        price: item.price,
        quantity: item.quantity || 1,
        imageUrl: item.uploadFileNames || item.imageUrl, 
        color: item.color,
        size: item.size
    }));

    const handleOrderClick = async () => {
        const orderObj = {
            userId: loginState.userId,
            itemId: formattedItems[0]?.id,
            price: formattedItems[0]?.price,
            quantity: formattedItems[0]?.quantity,
            receiverName,
            receiverPhone,
            postcode,
            basicAddress,
            detailAddress,
            message
        }

        try {
            if (selectedItem) {
                await postOrder(orderObj)
            } else {
                await postCartOrder(orderObj)
            }
            setIsResultModalOpen(true)
        } catch (error) {
            console.error("Order failed: ", error)
            alert("주문에 실패했습니다. 다시 시도해주세요")
        }
    }

    const handleCancelClick = () => {
        moveToMain()
    }

    const closeResultModal = () => {
        setIsResultModalOpen(false)
        refreshCart()
        moveToOrderList()
    }

    return(
        <div className="w-full p-4">
            <h2 className="text-lg font-bold">주문자 정보</h2>
            <hr />
            <div>
                <div className="flex justify-between mt-2">
                    <div>이름</div>
                    <div className="w-2/3">{loginState.name}</div>
                </div>
                <div className="flex justify-between mt-2">
                    <div>연락처</div>
                    <div className="w-2/3">{loginState.phone}</div>
                </div>
            </div>

            <h2 className="mt-10 text-lg font-bold">배송 정보</h2>
            <hr />
            <div className="mt-2">
                <div className="flex justify-between mt-2">
                    <div>이름</div>
                    <input 
                        type="text" 
                        value={receiverName} 
                        onChange={(e) => setReceiverName(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div>연락처</div>
                    <input 
                        type="text" 
                        value={receiverPhone} 
                        onChange={(e) => setReceiverPhone(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div>우편번호</div>
                    <input 
                        type="text" 
                        value={postcode} 
                        onChange={(e) => setPostcode(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div>기본주소</div>
                    <input 
                        type="text" 
                        value={basicAddress} 
                        onChange={(e) => setBasicAddress(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div>상세주소</div>
                    <input 
                        type="text" 
                        value={detailAddress} 
                        onChange={(e) => setDetailAddress(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <div>배송메세지</div>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="border p-1 w-2/3"
                    />
                </div>
            </div>

            <h2 className="mt-10 text-lg font-bold">주문 상품</h2>
            <hr/>
            <div>
                {formattedItems.map(item => (
                    <div key={item.id} className="relative flex justify-between items-center p-4 border-b border-gray-200">
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

            <div className="mt-4">
                <div className="mt-4 text-right text-xl font-bold">
                    주문 금액: {formatNumber(totalPrice)}원
                </div>
            </div>

            <div className="flex justify-center mt-20">
                <button onClick={() => handleOrderClick()} className="bg-blue-500 text-white p-4 rounded mr-2">
                    주문하기
                </button>
                <button onClick={() => handleCancelClick()} className="bg-gray-500 text-white p-4 rounded">
                    주문취소
                </button>
            </div>

            {isResultModalOpen ? <ResultModal content={'주문이 완료되었습니다'} callbackFn={closeResultModal}/> : <></>}
        </div>
    )
}

export default OrderComponent