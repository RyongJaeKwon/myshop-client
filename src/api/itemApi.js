import axios from "axios";
import { API_SERVER_HOST } from "./memberApi";

const host = `${API_SERVER_HOST}/items`

export const itemPost = async (formData) => {
    const header = {header: {"Content-Type": "multipart/form-data"}}

    const res = await axios.post(`${host}/`, formData, header)

    return res.data
}

export const getRecentList = async (pageParam) => {
    const {page, size} = pageParam

    const res = await axios.get(`${host}/`, {params:{page:page, size:size}})
    
    return res.data
}