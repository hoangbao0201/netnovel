import { GetServerSideProps, NextPage } from "next";

import WrapperContent from "@/components/Layouts/WrapperContent";
import FormChapterDetail from "@/components/Shared/FormChapterDetail";
import { getChapterBySlugAndNumber, increaseViewChapterBySlugChapterNumber } from "@/services";
import { ChaptersType } from "@/types";
import ScrollOnTop from "@/components/Layouts/ScrollOnTop";
import dynamic from "next/dynamic";

const ScrollButton = dynamic(() => import("@/components/Layouts/ScrollOnTop"))

export interface ChapterDetailProps {
    chapter: ChaptersType
}

const ChapterDetail : NextPage<ChapterDetailProps> = ({ chapter }) => {

    console.log(chapter)

    return (
        <>
            <ScrollButton />
            <WrapperContent bgColor="#eae4d3">
                <FormChapterDetail chapter={chapter}/>
            </WrapperContent>
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async ({ query, res }) => {
    const chapterResponse = await getChapterBySlugAndNumber(query.slug as string, query.chapterNumber as string)
    increaseViewChapterBySlugChapterNumber(query.slug as string, query.chapterNumber as string)

    if(!chapterResponse) {
        return {
            props: {
                chapter: null
            }
        }
    }

    return {
        props: {
            chapter: chapterResponse.data?.chapter || null
        }
    }

}

export default ChapterDetail;