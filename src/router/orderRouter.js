import { Suspense, lazy } from "react"

const Loading = <div>Loading...</div>
const OrderPage = lazy(() => import("../pages/order/OrderPage"))
const OrderListPage = lazy(() => import("../pages/order/OrderListPage"))
const OrderDetailPage = lazy(() => import("../pages/order/OrderDetailPage"))

const orderRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><OrderPage/></Suspense>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderListPage/></Suspense>
        },
        {
            path: ":orderId",
            element: <Suspense fallback={Loading}><OrderDetailPage/></Suspense>
        }
    ]
}

export default orderRouter