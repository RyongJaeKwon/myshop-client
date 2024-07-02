import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/member`

export const useridCheck = async (userId) => {

    const res = await axios.get(`${prefix}/user-id/${userId}/check`)

    return res.data
}

export const emailCheck = async (email) => {

    const res = await axios.get(`${prefix}/user-email/${email}/check`)

    return res.data
}

export const memberSignUp = async (memberObj) => {

    const res = await axios.post(`${prefix}/`, memberObj)

    return res.data
}

export const loginPost = async (loginParam) => {

    const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append("username", loginParam.userId)
    form.append("password", loginParam.password)

    const res = await axios.post(`${prefix}/login`, form, header)

    return res.data

}