import Chapter from "../models/Chapter";

export const getchapterByNumberHandle = async (
    slug: string,
    number: number
) => {
    const chapter = await Chapter.findOne(
        { novelSlug: slug, "chaptersList.chapterNumber": number },
        { "chaptersList.$": 1, novelName: 1, novelSlug: 1 }
    ).lean();

    if (!chapter) {
        return null;
    }

    return chapter
};

// const result = {
//     novelName: existingChapter.novelName,
//     novelSlug: existingChapter.novelSlug,
//     chapter: {
//         chapterNumber: existingChapter.chaptersList[number-1].chapterNumber,
//         title: existingChapter.chaptersList[number-1].chapterNumber,
//         content: existingChapter.chaptersList[number-1].content,
//         view: existingChapter.chaptersList[number-1].view,
//     },
// };

export const getChapterBySlug = async (slug: string) => {
    const chapter = await Chapter.findOne({
        novelSlug: slug,
    });

    return chapter;
};

export const getManyChapterHandle = async (slug: string) => {
    const chapters = await Chapter.find({
        novelSlug: slug,
    }).select(
        "novelName novelSlug chaptersList.chapterNumber chaptersList.title chaptersList.createAt"
    );

    if (!chapters) {
        return null;
    }

    return chapters[0];
};

export const createManyChapters = async (chapters: any) => {
    return await Chapter.insertMany(chapters);
};

export const createChapterHandle = async (slug: string, input: any) => {
    const createChapter = await Chapter.updateOne(
        { novelSlug: slug },
        {
            $push: {
                chaptersList: {
                    ...input,
                },
            },
        }
    );

    return createChapter;
};

export const createModelChapters = async (name: string, slug: string) => {
    const newChapters = new Chapter({
        novelName: name,
        novelSlug: slug,
        chapters: [],
    });
    await newChapters.save();

    return newChapters;
};
