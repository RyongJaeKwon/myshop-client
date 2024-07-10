import React, { useEffect, useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { getRecentList } from "../api/itemApi";
import GridLayout from "./item/GridLayout";
import ItemLayout from "./item/ItemLayout";

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
            <GridLayout>
                {serverData.recentItems.map(item => (
                        <ItemLayout key={item.id} item={item}/>
                    ))
                }
            </GridLayout>
        </BaseLayout>
    );
};

export default MainPage;