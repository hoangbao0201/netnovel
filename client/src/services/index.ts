import axios from "axios";
import { axiosClient } from "./axiosClient"

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