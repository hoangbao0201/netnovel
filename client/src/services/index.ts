import axios from "axios";
import { UserType } from "@/types";
import { axiosClient } from "./axiosClient"
import { getAccessToken, removeAccessToken } from "@/utils/cookies";
import Cookies from "js-cookie";

export const getNovelsHandle = async (pageNumber: string) => {

    if(pageNumber) {
        return await axiosClient.get(`/api/novels?page=${pageNumber}`);
    }

    return await axiosClient.get(`/api/novels`);
}

export const getNovelBySlugHandle = async (slug: string) => {

    if(slug) {
        return await axiosClient.get(`/api/novels/${slug}`)
    }

    return null;
}

export const getChaptersBySlugHandler = async (slug: string) => {
    if(slug) {
        return await axios.get(`http://localhost:4000/api/chapters/${slug}`)
    }

    return null
}

export const getChapterBySlugAndNumber = async (slug: string, chapterNumber: string) => {
    if(!slug || !chapterNumber) {
        return null;
    }

    return await axios.get(`http://localhost:4000/api/chapters/${slug}/${chapterNumber}`)
}

export const loginUser = async (data: UserType) => {
    if(!data) {
        return null
    }

    return  await axios.post(`http://localhost:4000/api/auth/login`, data)
}
export const registerUser = async (data: UserType) => {
    if(!data) {
        return null
    }

    return  await axios.post(`http://localhost:4000/api/auth/register`, data)
}

export const connectUser = async (token : string) => {
    if(!token) {
        return null
    }

    const connectUser = await axios.get("http://localhost:4000/api/auth", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!connectUser.data.success) {
        removeAccessToken();
        return null;
    }

    return connectUser
}