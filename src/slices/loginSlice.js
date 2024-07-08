import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieManager"

const initState = {
    userId: '',
    email: '',
    role: ''
}

const memberCookie = () => {
    return getCookie("member")
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (loginParam) => {
    return loginPost(loginParam)
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: memberCookie() || initState,
    reducers: {
        login: (state, action) => {
            const data = action.payload

            return data
        },
        logout: (state) => {
            removeCookie("member")

            return{...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const data = action.payload

            if(!data.error) {
                setCookie("member", JSON.stringify(data), 1)
            }

            return data
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