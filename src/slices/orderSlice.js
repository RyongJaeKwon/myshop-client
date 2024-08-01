import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cancelOrder, getOrderItems, getOrders, orderCartPost, orderPost } from "../api/orderApi"

const initState = {
    orders: [],
    orderItems: []
}

export const orderPostAsync = createAsyncThunk('orderPostAsync', async (orderObj) => {
    const response = await orderPost(orderObj)
    return response
})

export const orderCartPostAsync = createAsyncThunk('orderCartPostAsync', async (orderObj) => {
    const response = await orderCartPost(orderObj)
    return response
})

export const getOrdersAsync = createAsyncThunk('getOrdersAsync', async (userId) => {
    const response = await getOrders(userId)
    return response
})

export const getOrderItemsAsync = createAsyncThunk('getOrderItemsAsync', async ({userId, orderId}) => {
    const response = await getOrderItems({userId, orderId})
    return response
})

export const cancelOrderAsync = createAsyncThunk('cancelOrderAsync', async ({userId, orderId}, {dispatch}) => {
    await cancelOrder({userId, orderId})

    dispatch(getOrdersAsync(userId))

})

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(orderPostAsync.fulfilled, (state, action) => {
            console.log("orderPostAsync fulfilled")
            state.orders = action.payload
        })
        .addCase(orderCartPostAsync.fulfilled, (state, action) => {
            console.log("orderCartPostAsync fulfilled")
            state.orders = action.payload
        })
        .addCase(getOrdersAsync.fulfilled, (state, action) => {
            console.log("getOrdersAsync fulfilled")
            state.orders = action.payload
        })
        .addCase(getOrderItemsAsync.fulfilled, (state, action) => {
            console.log("getOrderItemsAsync fulfilled")
            
            state.orderItems = action.payload
        })
        .addCase(cancelOrderAsync.fulfilled, (state, action) => {
            console.log("cancelOrderAsync fulfilled")
            const data = action.payload

            return data
        })
    }
})

export default orderSlice.reducer