import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import memberRouter from "./memberRouter";
import itemRouter from "./itemRouter";

const Loading = <div>Loading...</div>
const Main = lazy(() => import("../pages/MainPage"))
const MemberIndex = lazy(() => import("../pages/member/IndexPage"))
const ItemIndex = lazy(() => import("../pages/item/IndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main/></Suspense>
    },
    {
        path: "member",
        element: <Suspense fallback={Loading}><MemberIndex/></Suspense>,
        children: memberRouter()
    },
    {
        path: "items",
        element: <Suspense fallback={Loading}><ItemIndex/></Suspense>,
        children: itemRouter()
    }

])

export default root;