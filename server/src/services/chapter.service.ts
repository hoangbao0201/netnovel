import Chapter from "../models/Chapter"


export const createChapterNovelHandle = async (input: any, novel: any) => {

    const chapter = new Chapter({
        ...input,
        novelName: novel.title,
        novelSlug: novel.slug
    })
    await chapter.save();

    if(chapter) {
        await novel.updateOne({}, {
            $int: { chapterCount: 1 }
        })
    }

    return chapter;
}

export const getchapterByNumberHandle = async (slug: string, number: number) => {

    let chapter = await Chapter.findOne({
        novelSlug: slug,
        chapterNumber: number
    })

    return chapter;
}

export const getManyChapterHandle = async (slug: string) => {

    const chapter = await Chapter.find({
        novelSlug: slug,
    }).select("-content -novelName")

    return chapter;
}