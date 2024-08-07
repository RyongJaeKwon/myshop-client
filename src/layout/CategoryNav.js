import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ItemAddModal from "../components/item/ItemAddModal";
import { useState } from "react";

const CategoryNav = ({toggleRefresh}) => {
    const loginState = useSelector(state => state.loginSlice)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };
    
    const closeAddModal = () => {
        setIsAddModalOpen(false)
        navigate('/')
    }

    return (
        <nav className="bg-white text-black text-xl">
            <div className="flex justify-between items-center">
                <Link to={'/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">ALL</Link>
                <Link to={'/items/top?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">TOP</Link>
                <Link to={'/items/bottom?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">BOTTOM</Link>
                <Link to={'/items/outer?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">OUTER</Link>
                <Link to={'/items/hat?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">HAT</Link>
                <Link to={'/items/shoes?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">SHOES</Link>
                <Link to={'/items/acc?page=1&size=6'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">ACC</Link>
                {loginState.role === 'ROLE_ADMIN' && location.pathname === '/' ? 
                <button className="flex-grow text-center text-white py-3 rounded-full bg-blue-500" onClick={openAddModal}>상품등록</button>
                :
                <></>
                }
            </div>
            {isAddModalOpen && <ItemAddModal closeAddModal={closeAddModal} toggleRefresh={toggleRefresh} />}
        </nav>
    )
}

export default CategoryNav;