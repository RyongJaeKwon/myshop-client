import axios from "axios";
import { API_SERVER_HOST } from "./memberApi";

const rest_api_key = `34274cc085271a5f176ca15527060027`
const redirect_uri = `http://localhost:3000/member/kakao`
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`
const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    return kakaoURL
}

export const getAccessToken = async (auth_code) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: auth_code
    }

    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token
    return accessToken
}

export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/member/getkakao?accessToken=${accessToken}`)

    return res.data
}

export const kakaoSignUp = async (memberObj) => {

    const res = await axios.post(`${API_SERVER_HOST}/member/kakao/`, memberObj)

    return res.data
}