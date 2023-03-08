import axios from "axios";
import * as cheerio from "cheerio";
import Chapter from "../models/Chapter";

export const getchapterByNumberHandle = async (
    slug: string,
    number: number
) => {
    const chapter = await Chapter.findOne(
        { novelSlug: slug, "chaptersList.chapterNumber": number },
        { "chaptersList.$": 1, novelName: 1, novelSlug: 1, chapterCount: 1 }
    ).lean();

    if (!chapter) {
        return null;
    }

    return chapter
};

export const getChapterBySlugHandle = async (slug: string) => {
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

export const createManyChaptersHandle = async (chapters: any) => {
    return await Chapter.insertMany(chapters);
};

export const createChapterHandle = async (slug: string, input: any) => {
    const createChapter = await Chapter.updateOne(
        { novelSlug: slug },
        {
            $inc: { chapterCount: 1 },
            $push: {
                chaptersList: {
                    ...input,
                },
            },
        }
    );

    return createChapter;
};

export const createModelChapterHandle = async (name: string, slug: string) => {
    const newChapter = new Chapter({
        novelName: name,
        novelSlug: slug,
        chapters: [],
    });
    await newChapter.save();

    return newChapter;
};

export const createChaptersStealHandle = async (novelName: string, novelSlug: string) => {
    
    try {
        let url = `https://metruyencv.com/truyen/${novelSlug}`
        const getDataChapter = async () => {
            // const chapterCount = $1('ul.list-unstyled.d-flex.mb-4 li div').first().text()
            const chapterCount = "100";
 
            for (let index = 1; index <= parseInt(chapterCount); index++) {
                const response2 = await axios.get(url + '/chuong-' + index);
                const $1 = cheerio.load(response2.data);

                const dataChapter = {
                    novelName: novelName,
                    novelSlug: novelSlug,
                    title: $1('div.h1.mb-4.font-weight-normal.nh-read__title').text().split(":")[1].trim(),
                    content: $1('div#article').html(),
                    chapterNumber: index,
                }
                const newChapter = await createChapterHandle(novelSlug, dataChapter)
                if(!newChapter) {
                    return null
                }
            }
        }
        await getDataChapter()

        return true;
    } catch (error) {
         return null
    }
 };

 export const createChapterStealHandle = async (novelSlug: string, chapterNumber: string) => {
    
    try {
        let urlChapter = `https://metruyencv.com/truyen/${novelSlug}/chuong-${chapterNumber}`
 
        const response = await axios.get(urlChapter);
        const $1 = cheerio.load(response.data);

        let title = $1('div.nh-read__title').text()
        const titleIndex = title.indexOf(":")
        const convertTitle = title.slice(titleIndex+1).trim();

        const dataChapter = {
            title: convertTitle,
            content: $1('div#article').html(),
            chapterNumber: chapterNumber,
        }

        const newChapter = await createChapterHandle(novelSlug, dataChapter)
        if(!newChapter) {
            return null
        }

        return newChapter;
    } catch (error) {
        return null
    }
};

export const getNumberChaptersInWeekHandle = async (slug: string) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

    const numberChapters = await Chapter.aggregate([
        { $match: { novelSlug: slug } },
        { $unwind: "$chaptersList" },
        {
            $match: {
                "chaptersList.createAt": {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            }
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        }
    ]);

    if (numberChapters.length === 0) {
        return 0;
    }

    return numberChapters[0].count;

}

export const increaseViewChapterHandle = async (slug: string, chapterNumber: number) => {
    const chapter = await Chapter.findOneAndUpdate(
        { novelSlug: slug, "chaptersList.chapterNumber": chapterNumber },
        {
            $inc: { "chaptersList.$.view": 1 },
        },
        { new: true }
    )

    if(!chapter) {
        null
    }

    return true
}