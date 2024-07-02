import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const MemberSignUp = lazy(() => import("../pages/member/SignUpPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path: "signup",
            element: <Suspense fallback={Loading}><MemberSignUp/></Suspense>
        }
    ]
}

export default memberRouter;