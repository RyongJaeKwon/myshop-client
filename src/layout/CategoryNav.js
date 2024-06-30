import { Link } from "react-router-dom";

const CategoryNav = () => {
    return (
        <nav className="bg-white text-black text-xl p-1">
            <div className="flex justify-between items-center">
                <Link to={'/top/'} className="flex-grow text-center hover:bg-gray-300 py-2 px-2 rounded-full">상의</Link>
                <Link to={'/pants/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">하의</Link>
                <Link to={'/outer/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">아우터</Link>
                <Link to={'/cap/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">모자</Link>
                <Link to={'/shoes/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">신발</Link>
                <Link to={'/bag/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">가방</Link>
                <Link to={'/acc/'} className="flex-grow text-center hover:bg-gray-300 py-3 px-2 rounded-full">악세서리</Link>
            </div>
        </nav>
    )
}

export default CategoryNav;