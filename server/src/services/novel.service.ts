import axios from "axios";
import * as cheerio from "cheerio";
import { convertTextToSlug } from "../utils/convertTextToSlug";
import Novel from "../models/Novel";
import { uploadThumbnailNovelByUrlHandle } from "./image.service";
import { createModelChapterHandle, getNumberChaptersInWeekHandle } from "./chapter.service";

export const createNovelHandle = async (input: any, userId: string) => {

    const idChapter = await createModelChapterHandle(input.title as string, input.slug as string)

    const newNovel = new Novel({
        ...input,
        postedBy: userId,
        chapters: idChapter._id
    });

    await newNovel.save();

    return newNovel;
};

export const createNovelStealHandle = async (url: string, userId: string) => {
    
   try {
        const response1 = await axios.get(url);
        const $1 = cheerio.load(response1.data);

        const urlImage = $1('.nh-thumb--210 img').attr('src');
        let thumbnailImage = await uploadThumbnailNovelByUrlHandle(urlImage as string);

        const dataNovel = {
            title: $1('h1.h3.mr-2>a').text(),
            thumbnail: {
                url: thumbnailImage.url || null,
                publicId: thumbnailImage.public_id || null,
            },
            slug: convertTextToSlug($1('h1.h3.mr-2>a').text()),
            description: $1('div.content').html(),
            author: $1('ul.list-unstyled.mb-4>li').eq(0).find('a').text(),
            category: $1('ul.list-unstyled.mb-4>li').eq(2).find('a').text(),
            personality: $1('ul.list-unstyled.mb-4>li').eq(3).find('a').text(),
            scene: $1('ul.list-unstyled.mb-4>li').eq(4).find('a').text(),
            classify: $1('ul.list-unstyled.mb-4>li').eq(5).find('a').text(),
            viewFrame: $1('ul.list-unstyled.mb-4>li').eq(6).find('a').text()
        }

        const newNovel = await createNovelHandle(dataNovel, userId);
        if(!newNovel) {
            return null;
        }

        return newNovel;
   } catch (error) {
        return null
   }
};

export const getNovelAndChaptersBySlugHandle = async (slug: string) => {
    const existingNovel = await Novel.findOne({ slug })
        .populate("chapters")

    return existingNovel;
};

export const getNovelBySlugHandle = async (slug: string) => {
    const existingNovel : any = await Novel.findOne({ slug })
        .populate({
            path: 'chapters',
            select: 'chapterCount chaptersList.view chaptersList.createAt',
        });

    if (!existingNovel) {
        return null;
    }

    const chaptersList = existingNovel.chapters.chaptersList;

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const numberChaptersInWeek = chaptersList.filter(
        (chapter : any) => chapter.createAt >= oneWeekAgo
    ).length;

    const views = chaptersList.reduce(
        (totalViews : any, chapter : any) => {
            return totalViews + chapter.view
        },
        0
    );

    // return {
    //     ...existingNovel.toObject(),
    //     numberChaptersInWeek,
    //     viewsNovel,
    // };

    return {
        ...existingNovel.toObject(),
        chapters: {
            views,
            chapterCount: existingNovel.chapters.chapterCount,
            numberChaptersInWeek
        }
    }
};

// return { ...existingNovel.toObject(), numberChaptersInWeek };
// const numberChaptersInWeek = await getNumberChaptersInWeekHandle(existingNovel.slug as string)
// return {...existingNovel.toObject(), numberChaptersInWeek: numberChaptersInWeek};


export const getNovelBySlugPostedByHandle = async (slug: string, postedBy: string) => {
    const existingNovel = await Novel.findOne({ slug, postedBy });
    if(!existingNovel) {
        return null
    }

    return existingNovel;
};

export const getNovelsHandle = async (pageNumber: number) => {
    const existingNovels : any = await Novel.find({})
        .sort({ createdAt: -1 })
        .limit(pageNumber*6)
        .skip((pageNumber-1) * 6)
        .select({
            title: 1,
            slug: 1,
            thumbnail: 1,
            description: { $substrCP: ["$description", 0, 130] }
        })
        .lean()
    
    if(!existingNovels) {
        return null
    }

    return existingNovels
};

export const getNovelsByUserIdHandle = async (userId: string) => {
    const existingNovels = await Novel.find({ postedBy: userId })
        .select("-content -description")
        .sort({ createdAt: -1 })

    return existingNovels || null;
};

export const getNovelByTitleHandle = async (query: string) => {
    const novels = await Novel.find({
        $or: [
            {
                title: {
                    $regex: query, $options: "i"
                }
            }
        ]
    }).select("-description -author -chapters -postedBy")
    if(!novels) {
        return null
    }

    return novels
}