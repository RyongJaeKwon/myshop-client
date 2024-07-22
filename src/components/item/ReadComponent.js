import { useEffect, useState } from "react";
import { deleteOne, getOne } from "../../api/itemApi";
import { API_SERVER_HOST } from "../../api/memberApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemUpdateModal from "./ItemUpdateModal";
import ItemDeleteModal from "./ItemDeleteModal";
import useItemHook from "../../hooks/useItemHook";
import useCartHook from "../../hooks/useCartHook";
import CartAddModal from "../cart/CartAddModal";

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
    const [serverData, setServerData] = useState(initState)
    const host = API_SERVER_HOST
    const loginState = useSelector(state => state.loginSlice)
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
    const navigate = useNavigate()
    const location = useLocation()
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCartModalOpen, setIsCartModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const {exceptionHandle} = useItemHook()
    const {changeCart, moveToCart} = useCartHook()

    useEffect(() => {
        const getItem = async () => {
            try {
                const data = await getOne(id)
                setServerData(data);
                setLoading(false)
            } catch (error) {
                console.error("error: ", error)
                exceptionHandle(error)
            }
        }

        getItem()
        // eslint-disable-next-line
    }, [id, refresh])

    const handleButtonClick = (action) => {
        if (action === "buy") {
            console.log("구매하기");
        }
    }

    const handleDeleteClick = async () => {
        try {
            await deleteOne(id)
            setServerData({...initState})
            setIsDeleteModalOpen(false)
            navigate(`/items/${category}${location.search}`, {replace:true})
        } catch (error) {
            console.error("error: ", error)
        }
    }

    const handleCartClick = () => {
        let itemId = serverData.id
        let userId = loginState.userId
        const currentCartItem = cartItemList.find(item => item.itemId === Number(id));
        const currentQuantity = currentCartItem ? currentCartItem.quantity : 0
        console.log("currentQuantity: ", currentQuantity)

        changeCart({userId: userId, itemId: itemId, quantity: currentQuantity + 1})
        setIsCartModalOpen(true)
    }

    const closeCartModal = () => {
        setIsCartModalOpen(false)
        navigate(`/items/${category}/${id}${location.search}`, {replace:true})
    }

    const openUpdateModal = () => {
        setIsUpdateModalOpen(true)
    }

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false)
        navigate(`/items/${category}/${id}${location.search}`, {replace:true})
    }

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        navigate(`/items/${category}/${id}${location.search}`, {replace:true})
    }

    const toggleRefresh = () => {
        setRefresh(!refresh);
    };

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
                                <span className="text-md">(리뷰: {serverData.replies})</span>
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
                                        onClick={() => handleButtonClick("buy")}>구매하기</button>
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
                </div>
                {isUpdateModalOpen && <ItemUpdateModal toggleRefresh={toggleRefresh} closeUpdateModal={closeUpdateModal} itemId={id}/>}
                {isDeleteModalOpen && <ItemDeleteModal handleDeleteClick={handleDeleteClick} content={ `${serverData.itemName} 상품을 삭제하시겠습니까?`} callbackFn={closeDeleteModal}/>}
                {isCartModalOpen && <CartAddModal moveToCart={moveToCart} callbackFn={closeCartModal} content={`${serverData.itemName} 상품이 장바구니에 담겼습니다`}/>}
            </div>
    );
}

export default ReadComponent