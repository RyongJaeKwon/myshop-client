import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white text-black p-8">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-4xl font-bold">My Shop</div>
                <div className="flex justify-end space-x-5">
                    <Link to={'/member/login'}><FiUser size={33}/></Link>
                    <Link to={'/member/cart'}><BsCart2 size={33}/></Link>
                </div>
            </div>    
        </header>
    )
}

export default Header;