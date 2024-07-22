import axios from "axios";
import { getCookie, setCookie } from "../util/cookieManager";
import { API_SERVER_HOST } from "./memberApi";
import store from "../store";
import { logout } from "../slices/loginSlice";

const apiAxios = axios.create()

apiAxios.interceptors.request.use(
    (config) => {
        const memberInfo = getCookie('member')
        if (!memberInfo) {
            return Promise.reject({
                response: {data: {error: 'REQUIRE_LOGIN'}}
            })
        }

        const {accessToken} = memberInfo
        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiAxios.interceptors.response.use(
    (response) => {
        console.log("Response interceptor response:", response);
        
        return response
    },
    async (error) => {
        console.log("Response interceptor error:", error);
        const originalRequest = error.config
        const {response} = error
        const host = API_SERVER_HOST

        if (response.data && response.data.error === 'ERROR_ACCESS_TOKEN') {
            console.log("Error response:", response.data);
            try {
                const memberInfo = getCookie('member')
                console.log("Member info:", memberInfo);

                const refreshResponse = await axios.post(`${host}/member/refresh`, {}, {
                    headers: {
                        "Authorization": `Bearer ${memberInfo.accessToken}`,
                        "X-Refresh-Token": `Bearer ${memberInfo.refreshToken}`
                    }
                })

                const {accessToken, refreshToken} = refreshResponse.data

                setCookie('member', JSON.stringify({...memberInfo, accessToken, refreshToken}), 1)

                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return apiAxios(originalRequest)
            } catch (error) {
                store.dispatch(logout())
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default apiAxios