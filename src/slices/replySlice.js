import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addReply, deleteReply, getReplies, getReply, updateReply } from "../api/replyApi";

const initState = {
    replies: []
}

export const addReplyAsync = createAsyncThunk('addReplyAsync', (replyObj) => {
    return addReply(replyObj)
})

export const updateReplyAsync = createAsyncThunk('updateReplyAsync', (replyObj) => {
    return updateReply(replyObj)
})

export const deleteReplyAsync = createAsyncThunk('deleteReplyAsync', ({id, userId}) => {
    return deleteReply({id, userId})
})

export const getReplyAsync = createAsyncThunk('getReplyAsync', (id) => {
    return getReply(id)
})

export const getRepliesAsync = createAsyncThunk('getRepliesAsync', (itemId) => {
    return getReplies(itemId)
})

const replySlice = createSlice({
    name: 'replySlice',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addReplyAsync.fulfilled, (state, action) => {
            console.log("addReplyAsync fulfilled")

            state.replies = action.payload
        })
        .addCase(updateReplyAsync.fulfilled, (state, action) => {
            console.log("updateReplyAsync fulfilled")

            state.replies = action.payload
        })
        .addCase(deleteReplyAsync.fulfilled, (state, action) => {
            console.log("deleteReplyAsync fulfilled")

            state.replies = action.payload
        })
        .addCase(getReplyAsync.fulfilled, (state, action) => {
            console.log("getReplyAsync fulfilled")

            state.replies = action.payload
        })
        .addCase(getRepliesAsync.fulfilled, (state, action) => {
            console.log("getRepliesAsync fulfilled")

            state.replies = action.payload
        })
    }
})

export default replySlice.reducer