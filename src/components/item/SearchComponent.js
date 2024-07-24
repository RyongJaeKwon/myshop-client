import { useState } from "react"
import useItemHook from "../../hooks/useItemHook"

const SearchComponent = ({initKeyword}) => {
    const [search, setSearch] = useState(initKeyword)
    const {page, size, moveToSearchList} = useItemHook()

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchClick = () => {
        moveToSearchList({page, size, keyword:search})
    }

    return(
        <div className="flex justify-end">
            <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                className="border p-2 rounded-md">
            </input>
            <button className="ml-2 p-2 bg-blue-500 text-white rounded-md" onClick={handleSearchClick}>Search</button>
        </div>
    )
}

export default SearchComponent