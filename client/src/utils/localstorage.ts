import { addUserHandle } from "@/redux/userSlice"
import { connectUser } from "@/services"
import { UserType } from "@/types"
import Cookies from "js-cookie"
import { useDispatch } from "react-redux"
import { getAccessToken } from "./cookies"

interface userAuth {
    success?: boolean
    message?: string
    user?: UserType
}


export const removeUserAuth = () => {
    localStorage.removeItem("user-auth")
}

export const setUserAuthLS = (user : any) => {
    localStorage.setItem("user-auth", JSON.stringify(user))
}

export const getUserAuthLS = async (dispatch : any) => {

    if(typeof localStorage !== "undefined" && !!localStorage["user-auth"]) {
        const user = localStorage.getItem("user-auth");
        return JSON.parse(user as any)
    }

    const token = getAccessToken();
    if( typeof localStorage !== "undefined" && !!token ) {
        const userResponse = await connectUser(token as string)
        
        if(userResponse?.data.success) {
            setUserAuthLS(userResponse.data.user)
            dispatch(addUserHandle(userResponse.data.user));

            return userResponse.data.user;
        }
    }

    return null

}