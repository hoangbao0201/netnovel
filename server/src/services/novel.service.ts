import axios from "axios";
import * as cheerio from "cheerio";
import { convertTextToSlug } from "../utils/convertTextToSlug";
import Novel from "../models/Novel";

export const createNovelHandle = async (input: any, userId: string) => {
    const newNovel = new Novel({
        ...input,
        postedBy: userId,
    });
    await newNovel.save();

    return newNovel;
};

export const createNovelStealHandle = async (url: string) => {
    
   try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const dataNovel = {
            title: $('h1.h3.mr-2>a').text(),
            slug: convertTextToSlug($('h1.h3.mr-2>a').text()),
            description: $('div.content').text(),
            author: $('ul.list-unstyled.mb-4>li').eq(0).find('a').text(),
            category: $('ul.list-unstyled.mb-4>li').eq(2).find('a').text(),
            personality: $('ul.list-unstyled.mb-4>li').eq(3).find('a').text(),
            scene: $('ul.list-unstyled.mb-4>li').eq(4).find('a').text(),
            classify: $('ul.list-unstyled.mb-4>li').eq(5).find('a').text(),
            viewFrame: $('ul.list-unstyled.mb-4>li').eq(6).find('a').text()
        }

        return dataNovel;
   } catch (error) {
        return null
   }
};

export const getNovelBySlugHandle = async (slug: string) => {
    const existingNovel = await Novel.findOne({ slug })

    return existingNovel;
};

export const getNovelsHandle = async (pageNumber: number) => {
    const existingNovel = await Novel.find({})
        .limit(pageNumber)
        .skip(pageNumber+5)
        .sort({ createdAt: -1 })

    return existingNovel;
};
