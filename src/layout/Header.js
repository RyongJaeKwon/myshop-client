import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";


const Header = () => {
    const loginState = useSelector(state => state.loginSlice)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
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
                <div>
                    <button onClick={handleLogout} className="text-black"><IoIosLogOut size={30} /></button>
                </div>
                <div>
                    <Link to={'/member/cart'} className="text-black"><BsCart2 size={30} /></Link>
                </div>
                </>
                }
            </div>
        </div>
    );
}

export default Header;