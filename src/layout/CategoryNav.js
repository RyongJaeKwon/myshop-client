import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ItemAddModal from "../components/item/ItemAddModal";
import { useState } from "react";

const CategoryNav = ({toggleRefresh}) => {
    const loginState = useSelector(state => state.loginSlice)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false)
        navigate('/')
    }

    return (
        <nav className="bg-white text-black text-xl">
            <div className="flex justify-between items-center">
                <Link to={'/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">ALL</Link>
                <Link to={'/items/top/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">TOP</Link>
                <Link to={'/items/pants/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">BOTTOM</Link>
                <Link to={'/items/outer/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">OUTER</Link>
                <Link to={'/items/cap/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">HAT</Link>
                <Link to={'/items/shoes/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">SHOES</Link>
                <Link to={'/items/acc/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">ACC</Link>
                {loginState.role === 'ROLE_ADMIN' ? 
                <button className="flex-grow text-center text-white py-3 rounded-full bg-blue-500" onClick={openModal}>상품등록</button>
                :
                <></>
                }
            </div>
            {isModalOpen && <ItemAddModal callbackFn={closeModal} toggleRefresh={toggleRefresh} />}
        </nav>
    )
}

export default CategoryNav;