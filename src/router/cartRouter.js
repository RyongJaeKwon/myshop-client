import { Suspense, lazy } from "react"

const Loading = <div>Loading...</div>
const CartPage = lazy(() => import("../pages/cart/CartPage"))

const cartRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><CartPage/></Suspense>
        },
    ]
}

export default cartRouter