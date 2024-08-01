import { Suspense, lazy } from "react"

const Loading = <div>Loading...</div>
const OrderPage = lazy(() => import("../pages/order/OrderPage"))
const OrderListPage = lazy(() => import("../pages/order/OrderListPage"))

const orderRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><OrderPage/></Suspense>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderListPage/></Suspense>
        }
    ]
}

export default orderRouter