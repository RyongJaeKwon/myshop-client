import apiAxios from "./apiAxios";
import { API_SERVER_HOST } from "./memberApi";

const host = `${API_SERVER_HOST}/replies`

export const addReply = async (replyObj) => {
    const res = await apiAxios.post(`${host}/`, replyObj)

    return res.data
}

export const updateReply = async (replyObj) => {
    const res = await apiAxios.put(`${host}/`, replyObj)

    return res.data
}

export const deleteReply = async (id) => {
    const res = await apiAxios.delete(`${host}/${id}`)

    return res.data
}

export const getReply = async (id) => {
    const res = await apiAxios.delete(`${host}/${id}`)

    return res.data
}

export const getReplies = async (itemId) => {
    const res = await apiAxios.get(`${host}/item/${itemId}`)

    return res.data
}