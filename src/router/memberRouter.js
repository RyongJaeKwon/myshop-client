import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const MemberAdd = lazy(() => import("../pages/member/SignUpPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><MemberAdd/></Suspense>
        }
    ]
}

export default memberRouter;