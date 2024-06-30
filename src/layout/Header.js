import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-between items-center relative p-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold">
                My Shop
            </div>
            <div className="flex gap-4 ml-auto">
                <Link to={'/member/login'} className="text-black"><FiUser size={33} /></Link>
                <Link to={'/member/cart'} className="text-black"><BsCart2 size={33} /></Link>
            </div>
        </div>
    );
}

export default Header;