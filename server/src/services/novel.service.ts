import axios from "axios";
import * as cheerio from "cheerio";
import { convertTextToSlug } from "../utils/convertTextToSlug";
import Novel from "../models/Novel";
import { createManyChapters } from "./chapter.service";
import Chapter from "../models/Chapter";

export const createNovelHandle = async (input: any, userId: string) => {
    const newNovel = new Novel({
        ...input,
        postedBy: userId,
    });
    await newNovel.save();

    return newNovel;
};

export const createNovelStealHandle = async (url: string, userId: string) => {
    
   try {
        const response1 = await axios.get(url);
        const $1 = cheerio.load(response1.data);

        const dataNovel = {
            title: $1('h1.h3.mr-2>a').text(),
            slug: convertTextToSlug($1('h1.h3.mr-2>a').text()),
            description: $1('div.content').html(),
            author: $1('ul.list-unstyled.mb-4>li').eq(0).find('a').text(),
            category: $1('ul.list-unstyled.mb-4>li').eq(2).find('a').text(),
            personality: $1('ul.list-unstyled.mb-4>li').eq(3).find('a').text(),
            scene: $1('ul.list-unstyled.mb-4>li').eq(4).find('a').text(),
            classify: $1('ul.list-unstyled.mb-4>li').eq(5).find('a').text(),
            viewFrame: $1('ul.list-unstyled.mb-4>li').eq(6).find('a').text()
        }

        // let dataChapters:any = []
        // const getDataChapter = async () => {
        //     // const chapterCount = $1('ul.list-unstyled.d-flex.mb-4 li div').first().text()
        //     const chapterCount = "20";

        //     for (let index = 1; index <= parseInt(chapterCount); index++) {
        //         const response2 = await axios.get(url + '/chuong-' + index);
        //         const $2 = cheerio.load(response2.data);
                
        //         dataChapters.push({
        //             novelName: $1('h1.h3.mr-2>a').text(),
        //             novelSlug: convertTextToSlug($1('h1.h3.mr-2>a').text()),
        //             title: $2('div.h1.mb-4.font-weight-normal.nh-read__title').text().split(":")[1].trim(),
        //             content: $2('div#article').html(),
        //             chapterNumber: index,
        //         })
        //     }
        // }
        // await getDataChapter()

        const newNovel = await createNovelHandle(dataNovel, userId);
        if(!newNovel) {
            return null;
        }
        // const newChapters = await createManyChapters(dataChapters)
        // if(!newChapters) {
        //     return null;
        // }

        const getDataChapter = async () => {
            const chapterCount = $1('ul.list-unstyled.d-flex.mb-4 li div').first().text()
            // const chapterCount = "20";

            for (let index = 1; index <= parseInt(chapterCount); index++) {
                const response2 = await axios.get(url + '/chuong-' + index);
                const $2 = cheerio.load(response2.data);

                const newChapter = new Chapter({
                    novelName: $1('h1.h3.mr-2>a').text(),
                    novelSlug: convertTextToSlug($1('h1.h3.mr-2>a').text()),
                    title: $2('div.h1.mb-4.font-weight-normal.nh-read__title').text().split(":")[1].trim(),
                    content: $2('div#article').html(),
                    chapterNumber: index,
                })
                await newChapter.save()
            }
        }
        await getDataChapter()

        return true;
   } catch (error) {
        return null
   }
};

export const getNovelBySlugHandle = async (slug: string) => {
    const existingNovel = await Novel.findOne({ slug })
        .populate("chapters")

    return existingNovel;
};

export const getNovelsHandle = async (pageNumber: number) => {
    const existingNovel = await Novel.find({})
        // .limit(pageNumber)
        // .skip(pageNumber+2)
        // .sort({ createdAt: -1 })

    return existingNovel;
};

// {
//     slugName: "ten-truyen",
//     novelName: "ten truyen",
//     chapters: [
//         {
//             title: "name-chapter",
//             chapNumber: 1,
//         },
//         {
//             title: "name-chapter",
//             chapNumber: 3,
//         },
//         {
//             title: "name-chapter",
//             chapNumber: 4,
//         },
//         {
//             title: "name-chapter",
//             chapNumber: 5,
//         },
//     ]
// }