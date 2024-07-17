import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi"
import { useDispatch } from "react-redux"
import { setCookie } from "../../util/cookieManager"
import { login } from "../../slices/loginSlice"

const KakaoRedirectPage = () => {
    const [param] = useSearchParams()
    const auth_code = param.get("code")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getAccessToken(auth_code).then(accessToken => {
            console.log("accessToken: ", accessToken)

            getMemberWithAccessToken(accessToken).then(memberInfo => {
                console.log("memberInfo: ", memberInfo)

                if (memberInfo.id) {
                    dispatch(login(memberInfo))
                    navigate('/', {replace:true})
                    setCookie("member", JSON.stringify(memberInfo), 1)
                } else {
                    navigate('/member/kakaoSignup', {state: {memberInfo}})
                }
            })
        })
    }, [auth_code, dispatch, navigate])

    return (
        <div>
            <div>kakao Login Redirect</div>
            <div>{auth_code}</div>
        </div>
    )
}

export default KakaoRedirectPage