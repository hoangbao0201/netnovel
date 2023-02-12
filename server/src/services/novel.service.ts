import Novel from "../models/Novel";

export const createNovelHandle = async (input: any, userId: string ) => {
    
    const newNovel = new Novel({
        ...input,
        postedBy: userId
    })
    await newNovel.save()

    return newNovel;
}

export const getNovelBySlugHandle = async (slug: string) => {
    
    const existingNovel = await Novel.findOne({ slug }) 

    return existingNovel;
}