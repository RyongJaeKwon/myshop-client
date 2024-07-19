import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteOne, getCartItems, postChangeCart } from "../api/cartApi"

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (cartItem) => {
    return postChangeCart(cartItem)
})

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', () => {
    return getCartItems()
})

export const deleteOneAsync = createAsyncThunk('deleteOne', (cartItemId) => {
    return deleteOne(cartItemId)
})

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {cartItemList: []},

    extraReducers: (builder) => {
        builder.addCase(
            postChangeCartAsync.fulfilled, (state, action) => {
                console.log("postChangeCartAsync fulfilled")
        
                state.cartItemList = action.payload
            }
        )
        .addCase(
            getCartItemsAsync.fulfilled, (state, action) => {
                console.log("getCartItemsAsync fulfilled")

                console.log(action.payload)
                state.cartItemList = action.payload
            }
        )
        .addCase(
            deleteOneAsync.fulfilled, (state, action) => {
                console.log("deleteOneAsync fulfilled")

                state.cartItemList = action.payload
            }
        )
    }
})

export default cartSlice.reducer