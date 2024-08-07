import { Suspense, lazy } from "react"

const Loading = <div>Loading...</div>
const TopPage = lazy(() => import("../pages/item/TopPage"))
const BottomPage = lazy(() => import("../pages/item/BottomPage"))
const OuterPage = lazy(() => import("../pages/item/OuterPage"))
const HatPage = lazy(() => import("../pages/item/HatPage"))
const ShoesPage = lazy(() => import("../pages/item/ShoesPage"))
const AccPage = lazy(() => import("../pages/item/AccPage"))
const ItemRead = lazy(() => import("../pages/item/ReadPage"))
const SearchPage = lazy(() => import("../pages/item/SearchPage"))

const itemRouter = () => {
    return [
        {
            path: "top",
            element: <Suspense fallback={Loading}><TopPage/></Suspense>
        },
        {
            path: "bottom",
            element: <Suspense fallback={Loading}><BottomPage/></Suspense>
        },
        {
            path: "outer",
            element: <Suspense fallback={Loading}><OuterPage/></Suspense>
        },
        {
            path: "hat",
            element: <Suspense fallback={Loading}><HatPage/></Suspense>
        },
        {
            path: "shoes",
            element: <Suspense fallback={Loading}><ShoesPage/></Suspense>
        },
        {
            path: "acc",
            element: <Suspense fallback={Loading}><AccPage/></Suspense>
        },
        {
            path: ":category/:id",
            element: <Suspense fallback={Loading}><ItemRead/></Suspense>
        },
        {
            path: "search",
            element: <Suspense fallback={Loading}><SearchPage/></Suspense>
        }
    ]
}

export default itemRouter