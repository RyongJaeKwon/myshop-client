import { API_SERVER_HOST } from "./memberApi";
import apiAxios from "./apiAxios";
import axios from "axios";

const host = `${API_SERVER_HOST}/items`

export const itemPost = async (formData) => {
    const header = {header: {"Content-Type": "multipart/form-data"}}

    const res = await apiAxios.post(`${host}/`, formData, header)

    return res.data
}

export const getRecentList = async () => {
    const res = await axios.get(`${host}/`)
    
    return res.data
}

export const getRecentCategoryList = async (pageParam) => {
    const {category, page, size} = pageParam

    const res = await apiAxios.get(`${host}/${category}/list`, {params:{page:page, size:size}})

    return res.data
}

export const getOne = async (id) => {
    const res = await apiAxios.get(`${host}/${id}`)

    return res.data
}

export const putOne = async (id, item) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}

    const res = await apiAxios.put(`${host}/${id}`, item, header)

    return res.data
}

export const deleteOne = async (id) => {
    const res = await apiAxios.delete(`${host}/${id}`)

    return res.data
}