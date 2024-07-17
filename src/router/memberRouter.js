import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>
const Login = lazy(() => import("../pages/member/LoginPage"))
const MemberSignUp = lazy(() => import("../pages/member/SignUpPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))
const KakaoSignUp = lazy(() => import("../pages/member/KakaoSignUpPage"))

const memberRouter = () => {
    return [
        {
            path: "login",
            element: <Suspense fallback={Loading}><Login/></Suspense>
        },
        {
            path: "signup",
            element: <Suspense fallback={Loading}><MemberSignUp/></Suspense>
        },
        {
            path: "kakao",
            element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
        },
        {
            path: "kakaoSignup",
            element: <Suspense fallback={Loading}><KakaoSignUp/></Suspense>
        }
    ]
}

export default memberRouter;