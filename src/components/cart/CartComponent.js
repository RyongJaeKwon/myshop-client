import { useEffect, useMemo, useState } from "react"
import useCartHook from "../../hooks/useCartHook"
import { API_SERVER_HOST } from "../../api/memberApi"
import { useSelector } from "react-redux"

const CartComponent = () => {
    const{ cartItemList, changeCart, deleteCartItem } = useCartHook()
    const loginState = useSelector(state => state.loginSlice)
    const [quantity, setQuantity] = useState({})
    const host = API_SERVER_HOST

    const total = useMemo(() => {
        let total = 0

        for(const item of cartItemList) {
            total += item.price * item.quantity
        }

        return total
    }, [cartItemList])

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    }

    useEffect(() => {
        const initialQuantity = cartItemList.reduce((acc, item) => ({
            ...acc,
            [item.cartItemId]: item.quantity
        }), {});
        setQuantity(initialQuantity);
    }, [cartItemList]);

    const handleQuantityChange = (cartItemId, amount) => {
        setQuantity(prevQuantity  => ({
            ...prevQuantity,
            [cartItemId]: Math.max(1, prevQuantity[cartItemId] + amount)
        }))
    }

    const handleChangeQuantity = (item) => {
        changeCart({
            ...item,
            quantity: quantity[item.cartItemId],
            userId: loginState.userId
        })

    }

    const handleClickDelete = (cartItemId) => {
        deleteCartItem(cartItemId)
    }

    return (
        <div className="w-full h-full p-4">
            <div className="flex flex-col gap-4 mt-5">
                {cartItemList.length === 0 ? (
                    <p className="flex justify-center font-bold">장바구니가 비어있습니다</p>
                ) : (
                    cartItemList.map(item => (
                        <div key={item.cartItemId} className="relative flex justify-between items-center p-4 border-b border-gray-200">
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
                            <div className="absolute top-0 right-20 mr-20 flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleQuantityChange(item.cartItemId, -1)}
                                        className="bg-gray-300 text-black w-7 h-7 rounded flex items-center justify-center"
                                    >
                                    -
                                    </button>
                                    <span className="text-lg">{quantity[item.cartItemId]}개</span>
                                    <button 
                                        onClick={() => handleQuantityChange(item.cartItemId, 1)}
                                        className="bg-gray-300 text-black w-7 h-7 rounded flex items-center justify-center"
                                    >
                                    +
                                    </button>
                                </div>
                                <button 
                                    onClick={() => handleChangeQuantity(item)} 
                                    className="bg-blue-500 text-white px-2 py-1 rounded w-24"
                                >
                                수량변경
                                </button>
                                <button 
                                    onClick={() => handleClickDelete(item.cartItemId)}
                                    className="bg-red-500 text-white px-2 py-1 rounded w-24"
                                >
                                삭제
                                </button>
                            </div>
                            <div className="flex items-center">
                                {formatNumber(item.price * item.quantity)}원
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartItemList.length > 0 && (
                <div className="mt-4 text-right text-xl font-bold">
                    총 금액: {formatNumber(total)}원
                </div>
            )}
        </div>
    )
}

export default CartComponent