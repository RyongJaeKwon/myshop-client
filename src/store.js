import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";
import replySlice from "./slices/replySlice";
import orderSlice from "./slices/orderSlice";

export default configureStore({
    reducer: {
        "loginSlice" : loginSlice,
        "cartSlice" : cartSlice,
        "replySlice" : replySlice,
        "orderSlice" : orderSlice
    }
})