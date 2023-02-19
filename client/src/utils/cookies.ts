import Cookies from "js-cookie"

export const addAccessToken = (token: string) => {
    if(!token) {
        return
    }
    Cookies.set("accessToken", token)
}

export const removeAccessToken = () => {
    Cookies.remove("accessToken")
}