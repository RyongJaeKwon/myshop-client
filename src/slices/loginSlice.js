import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieManager"
import { getCartItemsAsync } from "./cartSlice"

const initState = {
    userId: '',
    role: ''
}

const memberCookie = () => {
    return getCookie("member")
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', async (loginParam,  {dispatch}) => {
    try {
        const data = await loginPost(loginParam);
        if (!data.error) {
            setCookie("member", JSON.stringify(data), 1);
            await dispatch(getCartItemsAsync());
            return data;
        }
    } catch (error) {
        console.error('Error loginPostAsync:', error);
    }
})

export const loginAsync = createAsyncThunk('loginAsync', async (memberInfo, {dispatch}) => {
    try {
        dispatch(login(memberInfo))
        await dispatch(getCartItemsAsync())
        return memberInfo
    } catch (error) {
        console.error('Error loginAsync: ', error)
    }
})

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: memberCookie() || initState,
    reducers: {
        login: (state, action) => {
            const data = action.payload
            setCookie("member", JSON.stringify(data), 1);

            return data
        },
        logout: (state) => {
            removeCookie("member")
            localStorage.removeItem('cartItemList');
            return{...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const data = action.payload
            setCookie("member", JSON.stringify(data), 1)

            return data
        })
        .addCase(loginPostAsync.pending, (state, action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state, action) => {
            console.log("rejected")
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            const data = action.payload
            
            return data
        })
    }
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer