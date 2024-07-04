import { Cookies } from "react-cookie";

const cookies = new Cookies()

export const setCookie = (name, value, day) => {
    const expire = new Date()
    expire.setUTCDate(expire.getUTCDate() + day)

    return cookies.set(name, value, {path: '/', expires:expire})
}

export const getCookie = (name) => {
    
    return cookies.get(name)
}

export const removeCookie = (name, path="/") => {

    cookies.remove(name, {path})
}