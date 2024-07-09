import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { getRecentList } from "../api/itemApi";
import { API_SERVER_HOST } from "../api/memberApi";

const host = API_SERVER_HOST

const MainPage = () => {
const [serverData, setServerData] = useState({ recentItems: [] });
const [refresh, setRefresh] = useState(false)

useEffect(() => {
    fetchRecentItems();
    console.log(refresh)
}, [refresh]);

const fetchRecentItems = async () => {
    try {
        const data = await getRecentList();
        setServerData({ recentItems: data });
    } catch (error) {
        console.error("error: ", error);
    }
};

const toggleRefresh = () => {
    setRefresh(!refresh);
};

return (
    <BaseLayout toggleRefresh={toggleRefresh}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
                {serverData.recentItems && Array.isArray(serverData.recentItems) && serverData.recentItems.length > 0 ? (
                    serverData.recentItems.map(item => {
                        return (
                            <div key={item.id} className="p-4">
                                {item.uploadFileNames && item.uploadFileNames.length > 0 && (
                                    <img src={`${host}/items/view/${item.uploadFileNames}`} alt="itemimage"
                                    className="w-full h-auto rounded-md object-cover"
                                    style={{ width: "400px", height: "400px"}}/>
                                )}
                                <div className="flex justify-between mt-1">
                                    <div>{item.color}</div>
                                    <div>리뷰: {item.replies && Array.isArray(item.replies) ? item.replies.length : 0}</div>
                                </div>
                                <div className="mt-2 font-bold">{item.itemName}</div>
                                <div className="mt-1">{item.size}</div>
                                <div className="mt-1">가격: {item.price}원</div>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
        </BaseLayout>
    );
};

export default MainPage;