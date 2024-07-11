import { useEffect, useState } from "react"
import useCustomItem from "./useCustomItem"
import GridLayout from "./GridLayout"
import Pagenation from "../../components/common/Pagination"
import ItemLayout from "./ItemLayout"
import { getRecentCategoryList } from "../../api/itemApi"

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

const OuterPage = () => {
    const [serverData, setServerData] = useState(initState)
    const {page, size, moveToList} = useCustomItem("outer")

    useEffect(() => {
        const fetchRecentItems = async () => {
            try {
                const data = await getRecentCategoryList({ category: "outer", page, size });
                setServerData(data);
            } catch (error) {
                console.error("error: ", error);
            }
        };

        fetchRecentItems();
    }, [page, size])

    return (
        <div>
            <GridLayout>
                {serverData.dtoList && serverData.dtoList.length > 0 ? (
                    serverData.dtoList.map(item => (
                        <ItemLayout key={item.id} item={item} />
                    ))
                ) : (
                    <></>
                )}
            </GridLayout>
            
            <Pagenation serverData={serverData} movePage={moveToList}/>
        </div>
    )
}

export default OuterPage