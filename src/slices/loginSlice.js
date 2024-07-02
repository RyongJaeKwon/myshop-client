import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"

const initState = {
    userId: '',
    email: ''
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (loginParam) => {
    
    return loginPost(loginParam)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log("login.....")

            const data = action.payload

            state.userId = data.userId
            state.email = data.email
        },
        logout: (state) => {
            console.log("logout....")

            state.userId = initState.userId
            state.email = initState.email
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled")

            const payload = action.payload
            state.userId = payload.userId
            state.email = payload.email
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })
    }
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer