import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import { useState } from "react";
import ItemModal from "../components/common/ItemModal";


const Header = () => {
    const loginState = useSelector(state => state.loginSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false)
        navigate('/')
    }

    return (
        <div className="flex justify-between items-center relative p-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold">
                My Shop
            </div>

            <div className="flex ml-auto gap-4">
                {!loginState.userId ?
                <div>
                    <Link to={'/member/login'} className="text-black"><FiUser size={30} /></Link>
                </div>
                :
                <>
                        {loginState.role === 'ROLE_ADMIN' &&
                            <button className="flex items-center mr-2 p-2 border border-blue-400 rounded-md bg-blue-400"
                            onClick={openModal}>
                                <span className="text-white font-bold">상품 등록</span>
                            </button>
                        }
                <div>
                    <button onClick={handleLogout} className="text-black"><IoIosLogOut size={30} /></button>
                </div>
                <div>
                    <Link to={'/member/cart'} className="text-black"><BsCart2 size={30} /></Link>
                </div>
                </>
                }
            </div>

            {isModalOpen && <ItemModal callbackFn={closeModal} />}
        </div>
    );
}

export default Header;