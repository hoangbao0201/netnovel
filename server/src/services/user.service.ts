import User from "../models/User"

export const getUserByIdHandle = async (userId : string) => {
    const existingUser = await User.findOne({ _id: userId })

    return existingUser;
}

export const getUserByAccoutHandle = async (accout : string) => {

    const value = accout.includes("@") ? { email: accout } : { username: accout }

    const existingUser = await User.findOne(value)

    return existingUser;
}