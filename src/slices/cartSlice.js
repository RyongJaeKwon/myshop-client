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

const cartItemListLocalStorage = () => {
    const savedCartItemList = localStorage.getItem('cartItemList');
    return savedCartItemList ? JSON.parse(savedCartItemList) : [];
};

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: { cartItemList: cartItemListLocalStorage() },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            postChangeCartAsync.fulfilled, (state, action) => {
                console.log("postChangeCartAsync fulfilled")
        
                state.cartItemList = action.payload

                localStorage.setItem('cartItemList', JSON.stringify(state.cartItemList))
            }
        )
        .addCase(
            getCartItemsAsync.fulfilled, (state, action) => {
                console.log("getCartItemsAsync fulfilled")

                state.cartItemList = action.payload

                localStorage.setItem('cartItemList', JSON.stringify(state.cartItemList))
            }
        )
        .addCase(
            deleteOneAsync.fulfilled, (state, action) => {
                console.log("deleteOneAsync fulfilled")

                state.cartItemList = action.payload

                localStorage.setItem('cartItemList', JSON.stringify(state.cartItemList))
            }
        )
    }
})

export default cartSlice.reducer