import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi"
import { useDispatch } from "react-redux"
import { loginAsync } from "../../slices/loginSlice"

const KakaoRedirectPage = () => {
    const [param] = useSearchParams()
    const auth_code = param.get("code")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const state = param.get("state")

    useEffect(() => {
        const performLogin = async () => {
            try {
                const accessToken = await getAccessToken(auth_code)
                console.log("accessToken: ", accessToken)
        
                const memberInfo = await getMemberWithAccessToken(accessToken)
                console.log("memberInfo: ", memberInfo)
                
                if (memberInfo.id) {
                    await dispatch(loginAsync(memberInfo))
                    const from = state || '/'
                    navigate(from, { replace: true });
                } else {
                    navigate('/member/kakaoSignup', {state: {memberInfo}})
                }
            } catch (error) {
                console.error('Error during login:', error)
            }
        }

        performLogin()

    }, [auth_code, dispatch, navigate, state])

    return (
        <div>
            <div>kakao Login Redirect</div>
            <div>{auth_code}</div>
        </div>
    )
}

export default KakaoRedirectPage