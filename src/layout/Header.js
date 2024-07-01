import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-between items-center relative p-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold">
                My Shop
            </div>

            <div className="flex ml-auto gap-4">
                <div>
                    <Link to={'/member/login'} className="text-black"><FiUser size={30} /></Link>
                </div>
                <div>
                    <Link to={'/member/cart'} className="text-black"><BsCart2 size={30} /></Link>
                </div>
            </div>
        </div>
    );
}

export default Header;