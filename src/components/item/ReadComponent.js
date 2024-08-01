import { useEffect, useState } from "react";
import { deleteOne, getOne } from "../../api/itemApi";
import { API_SERVER_HOST } from "../../api/memberApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ItemUpdateModal from "./ItemUpdateModal";
import ItemDeleteModal from "./ItemDeleteModal";
import useItemHook from "../../hooks/useItemHook";
import useCartHook from "../../hooks/useCartHook";
import CartAddModal from "../cart/CartAddModal";
import { addReplyAsync, deleteReplyAsync, getRepliesAsync, updateReplyAsync } from "../../slices/replySlice";
import ResultModal from "../common/ResultModal";

const initState = {
    id: 0,
    itemName: "",
    color: "",
    size: "",
    itemInfo: "",
    price: 0,
    brand: "",
    category: '',
    regDate: '',
    modDate: '',
    files: [],
    uploadFileNames: []
}

const ReadComponent = () => {
    const {id, category} = useParams()
    const host = API_SERVER_HOST
    const loginState = useSelector(state => state.loginSlice)
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
    const replies = useSelector(state => state.replySlice.replies)
    const [serverData, setServerData] = useState(initState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCartModalOpen, setIsCartModalOpen] = useState(false)
    const [isResultModalOpen, setIsResultModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [refreshReplies, setRefreshReplies] = useState(false)
    const [refreshItem, setRefreshItem] = useState(false)
    const [newReply, setNewReply] = useState('')
    const [editingReplyId, setEditingReplyId] = useState(null)
    const [editReply, setEditReply] = useState('')
    const {exceptionHandle} = useItemHook()
    const {changeCart, moveToCart, refreshCart} = useCartHook()

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await getOne(id)
                setServerData(data)
                setLoading(false)
            } catch (error) {
                console.error("error: ", error)
                exceptionHandle(error)
            }
        }

        getItem()
        // eslint-disable-next-line
    }, [id, refreshItem])

    useEffect(() => {
        const getReplies = async () => {
            try {
                await dispatch(getRepliesAsync(id))
            } catch (error) {
                console.error("error: ", error)
                exceptionHandle(error)
            }
        }

        getReplies()
        // eslint-disable-next-line
    }, [id, refreshReplies, dispatch])

    const handleAddReply = () => {
        if(newReply.trim()) {
            dispatch(addReplyAsync({itemId:id, memberId:loginState.id, content:newReply}))
            setIsResultModalOpen(true)
            setNewReply('')
        }
    }

    const handleUpdateReply = async () => {
        if (editReply.trim()) {
            await dispatch(updateReplyAsync({ id: editingReplyId, content: editReply }))
            setRefreshReplies(!refreshReplies)
            setEditingReplyId(null)
            setEditReply('')
        }
    }

    const handleDeleteReply = async (id) => {
        await dispatch(deleteReplyAsync(id))
        setRefreshReplies(!refreshReplies)
    }

    const handleDeleteClick = async () => {
        try {
            await deleteOne(id)
            setServerData({...initState})
            setIsDeleteModalOpen(false)
            refreshCart()
            navigate(`/items/${category}${location.search}`, {replace:true})
        } catch (error) {
            console.error("error: ", error)
        }
    }

    const handleBuyClick = () => {
        navigate(`/orders`, {state: {item: serverData}})
    }

    const handleCartClick = () => {
        let itemId = serverData.id
        let userId = loginState.userId
        const currentCartItem = cartItemList.find(item => item.itemId === Number(id));
        const currentQuantity = currentCartItem ? currentCartItem.quantity : 0

        changeCart({userId: userId, itemId: itemId, quantity: currentQuantity + 1})
        setIsCartModalOpen(true)
    }

    const closeCartModal = () => {
        setIsCartModalOpen(false)
    }

    const openUpdateModal = () => {
        setIsUpdateModalOpen(true)
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false)
        setRefreshItem(!refreshItem)
    }

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const closeResultModal = () => {
        setIsResultModalOpen(false)
        setRefreshReplies(!refreshReplies)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
            <div className="flex justify-center mt-8 mb-8">
                <div className="w-full max-w-screen">
                    <div className="flex">
                        <div className="w-1/2">
                            {serverData.uploadFileNames.length > 0 &&
                                <img src={`${host}/items/view/${serverData.uploadFileNames[0]}`} alt="Item" className="w-full h-600 object-contain"/>
                            }
                        </div>

                        <div className="w-1/3 ml-10">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-2xl font-bold">{serverData.itemName}</h2>
                                <span className="text-md">(리뷰: {replies.length})</span>
                            </div>

                            <p className="text-sm mt-10 mb-10">{serverData.itemInfo}</p>

                            <div className="flex items-center mb-3">
                                <span className="font-semibold mr-8">판매가</span>
                                <span>{serverData.price}원</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <span className="font-semibold mr-8">브랜드</span>
                                <span>{serverData.brand}</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <span className="font-bold mr-12">컬러</span>
                                <span>{serverData.color}</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <span className="font-semibold mr-8">사이즈</span>
                                <span>{serverData.size}</span>
                            </div>

                            <div className="flex justify-between items-center mt-10">
                                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2 flex-1"
                                        onClick={() => handleCartClick()}>장바구니</button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex-1"
                                        onClick={() => handleBuyClick()}>구매하기</button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                {loginState.role === 'ROLE_ADMIN' && (
                                    <>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md mr-2 flex-1"
                                                onClick={openUpdateModal}>상품수정</button>
                                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex-1"
                                                onClick={openDeleteModal}>상품삭제</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 p-4 border-t border-gray-300">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="3"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            placeholder="댓글을 입력하세요"
                        />
                        <button
                            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={handleAddReply}>
                            댓글 등록
                        </button>
                    </div>
                    <div className="mt-8 p-2">
                        {replies.length > 0 ? (
                            replies.map(reply => (
                                <div key={reply.id} className="border-t border-gray-300 pb-4 mb-4">
                                    <div className="flex justify-between items-center pt-1 mb-1">
                                        <span className="font-bold">{reply.userId}</span>
                                        <span className="text-sm text-gray-500">{new Date(reply.regDate).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold">{serverData.itemName}</span>
                                        {reply.userId === loginState.userId && (
                                            <div>
                                                <button className="bg-blue-500 p-1 text-sm text-white rounded-md mr-2"
                                                    onClick={() => {setEditingReplyId(reply.id); setEditReply(reply.content);}}>수정</button>
                                                <button className="bg-red-500 p-1 text-sm text-white rounded-md"
                                                    onClick={() => handleDeleteReply(reply.id)}>삭제</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <span className="text-sm">사이즈: {serverData.size} / 색상: {serverData.color}</span>
                                    </div>
                                    {editingReplyId === reply.id ? (
                                        <>
                                            <textarea
                                                className="w-full p-1 border border-gray-300 rounded-md"
                                                rows="3"
                                                value={editReply}
                                                onChange={(e) => setEditReply(e.target.value)}
                                            />
                                            <button className="bg-blue-500 p-1 text-sm text-white rounded-md mr-2 mt-2"
                                                    onClick={handleUpdateReply}>저장</button>
                                            <button className="bg-gray-500 p-1 text-sm text-white rounded-md mt-2"
                                                    onClick={() => { setEditingReplyId(null); setEditReply(''); }}>취소</button>
                                        </>
                                    ) : (
                                        <p>{reply.content}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>댓글이 없습니다.</p>
                        )}
                    </div>
                </div>
                {isUpdateModalOpen && <ItemUpdateModal closeUpdateModal={closeUpdateModal} itemId={id} refreshCart={refreshCart}/>}
                {isDeleteModalOpen && <ItemDeleteModal handleDeleteClick={handleDeleteClick} content={ `${serverData.itemName} 상품을 삭제하시겠습니까?`} callbackFn={closeDeleteModal}/>}
                {isCartModalOpen && <CartAddModal moveToCart={moveToCart} callbackFn={closeCartModal} content={`${serverData.itemName} 상품이 장바구니에 담겼습니다`}/>}
                {isResultModalOpen ? <ResultModal content={'리뷰 등록이 완료되었습니다'} callbackFn={closeResultModal}/> : <></>}
            </div>
            
    );
}

export default ReadComponent