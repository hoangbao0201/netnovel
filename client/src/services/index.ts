import { axiosClient } from "./axiosClient"

export const getManyChapterHandle = async (pageNumber: string) => {

    if(pageNumber) {
        return await axiosClient.get(`/api/chapter?page=${pageNumber}`);
    }

    return await axiosClient.get(`/api/chapter`);
}