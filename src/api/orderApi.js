import apiAxios from "./apiAxios";
import { API_SERVER_HOST } from "./memberApi";

const host = `${API_SERVER_HOST}/orders`

export const orderPost = async (orderObj) => {
    const res = await apiAxios.post(`${host}/`, orderObj)

    return res.data
}

export const orderCartPost = async (orderObj) => {
    const res = await apiAxios.post(`${host}/cart`, orderObj)

    return res.data
}

export const getOrders = async (userId) => {
    const res = await apiAxios.get(`${host}/${userId}`)

    return res.data
}

export const getOrderItems = async (userId, orderId) => {
    const res = await apiAxios.get(`${host}/${userId}/${orderId}`)

    return res.data
}

export const cancelOrder = async (userId, orderId) => {
    const res = await apiAxios.delete(`${host}/${userId}/${orderId}`)

    return res.data
}