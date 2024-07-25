import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
import replySlice from "./slices/replySlice";

export default configureStore({
    reducer: {
        "loginSlice" : loginSlice,
        "cartSlice" : cartSlice,
        "replySlice" : replySlice
    }
})