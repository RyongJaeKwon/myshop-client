import { useEffect, useState } from "react"
import useItemHook from "../../hooks/useItemHook"
import GridLayout from "./GridLayout"
import ItemLayout from "./ItemLayout"
import Pagenation from "../../components/common/Pagination"
import { useSearchParams } from "react-router-dom"
import { searchItemList } from "../../api/itemApi"
import SearchComponent from "../../components/item/SearchComponent"

const initState = {
    dtoList: [],
    pageList: [],
    pageRequestDto: null,
    prev: false,
    next: false,
    totalPages: 0,
    start: 0,
    end: 0,
    current: 0,
    prevPage: 0,
    nextPage: 0
}

const SearchPage = () => {
    const {moveToSearchList} = useItemHook()
    const [serverData, setServerData] = useState(initState)
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const page = parseInt(searchParams.get('page'))
    const size = parseInt(searchParams.get('size'))

    useEffect(() => {
        const fetchSearchResult = async () => {
            try {
                const data = await searchItemList({page, size, keyword})
                setServerData(data);
            } catch (error) {
                console.error('Error search result:', error)
            }
        };

        fetchSearchResult();
    }, [keyword, page, size])

    return (
        <div className="w-full h-full">
            <div className="mt-3">
                <SearchComponent initKeyword={keyword}/>
            </div>
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
                <GridLayout>
                    {serverData.dtoList.map(item => (
                        <ItemLayout key={item.id} item={item} />
                    ))}
                </GridLayout>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center mt-10">
                        <p className="font-bold">검색 결과가 없습니다</p>
                    </div>
                </div>
            )}
            <Pagenation serverData={serverData} movePage={moveToSearchList} keyword={keyword}/>
        </div>
    );
}

export default SearchPage