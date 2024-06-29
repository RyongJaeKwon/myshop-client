import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white text-black p-8">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-4xl font-bold">My Shop</div>
                <div className="flex items-center space-x-5">
                    <Link to={'/member/login'} className="text-black"><FiUser size={33} /></Link>
                    <Link to={'/member/cart'} className="text-black"><BsCart2 size={33} /></Link>
                </div>
            </div>
        </header>
    );
}

export default Header;