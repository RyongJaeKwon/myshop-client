import apiAxios from "./apiAxios";
import { API_SERVER_HOST } from "./memberApi";

const host = `${API_SERVER_HOST}/cart`

export const postChangeCart = async (cartItem) => {
    const res = await apiAxios.post(`${host}/`, cartItem)

    return res.data
}

export const getCartItems = async () => {
    const res = await apiAxios.get(`${host}/list`)

    return res.data
}

export const deleteOne = async (cartItemId) => {
    const res = await apiAxios.delete(`${host}/${cartItemId}`)

    return res.data
}