import { Link } from "react-router-dom";

const CategoryNav = () => {
    return (
        <nav className="bg-white text-black text-xl">
            <div className="flex justify-between items-center">
                <Link to={'/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">ALL</Link>
                <Link to={'/items/top/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">TOP</Link>
                <Link to={'/items/pants/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">BOTTOM</Link>
                <Link to={'/items/outer/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">OUTER</Link>
                <Link to={'/items/cap/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">HAT</Link>
                <Link to={'/items/shoes/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">SHOES</Link>
                <Link to={'/items/bag/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">BAG</Link>
                <Link to={'/items/acc/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">ACC</Link>
            </div>
        </nav>
    )
}

export default CategoryNav;