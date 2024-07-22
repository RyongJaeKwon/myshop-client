import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";


const Header = () => {
    const loginState = useSelector(state => state.loginSlice)
    const cartItemList = useSelector(state => state.cartSlice.cartItemList)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="flex justify-between items-center relative p-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold">
                <Link to={'/'}>My Shop</Link>
            </div>

            <div className="flex ml-auto gap-4">
                {!loginState.userId ?
                <div>
                    <Link to={'/member/login'} className="text-black"><FiUser size={30} /></Link>
                </div>
                :
                <>
                <div>
                    <button onClick={handleLogout} className="text-black"><IoIosLogOut size={30} /></button>
                </div>
                <div>
                    <Link to={'/cart/list'} className="text-black"><BsCart2 size={30} />
                    {cartItemList.length > 0 && (
                        <span className="absolute top-1 right-0 flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-blue-600 rounded-full">
                            {cartItemList.length}
                        </span>
                    )}
                    </Link>
                </div>
                </>
                }
            </div>
        </div>
    );
}

export default Header;