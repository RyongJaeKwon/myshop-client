import { API_SERVER_HOST } from "../../api/memberApi"
import useItemHook from "../../hooks/useItemHook"

const ItemLayout = ({item, toggleRefresh}) => {
    const host = API_SERVER_HOST
    const { moveToRead, page, size } = useItemHook()

    const handleClickImage = (e) => {
        moveToRead({category: item.category, id:item.id, page, size, toggleRefresh})
    }

    return (
        <div className="p-4">
            {item.uploadFileNames && item.uploadFileNames.length > 0 && (
                <img src={`${host}/items/view/${item.uploadFileNames[0]}`} alt="itemimage"
                    className="w-full h-auto rounded-md object-cover"
                    style={{ width: "400px", height: "400px"}}
                    onClick={handleClickImage}/>
            )}
            <div className="flex justify-between mt-1">
                <div className="font-bold">{item.itemName}</div>
                <div>리뷰: {item.replies && Array.isArray(item.replies) ? item.replies.length : 0}</div>
            </div>
                <div className="mt-1">{item.size} / {item.color}</div>
                <div className="mt-1">가격: {item.price}원</div>
            </div>
    )
}

export default ItemLayout