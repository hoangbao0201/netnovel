import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";

import { getChaptersBySlugHandler } from "@/services";

import styles from "./ContentChapters.module.scss";
import { ChaptersType, ChapterType } from "@/types";
import Loading from "@/components/partials/Loading";

const cx = classNames.bind(styles);

interface ContentChaptersProps {
    slug?: string;
}

const ContentChapters = ({ slug }: ContentChaptersProps) => {

    const [bodyContent, setBodyContent] = useState<ChaptersType | null>(null)

    const getListChapters = async () => {
        const chaptersResponse = await getChaptersBySlugHandler(slug as string);
        if (chaptersResponse?.data.success) {
            console.log(chaptersResponse.data.chapters)
            setBodyContent(chaptersResponse.data.chapters)
        }
    };

    useEffect(() => {
        getListChapters();
    }, []);

    if(!bodyContent) {
        return <Loading />
    }
    else {
        if(bodyContent) {
            return (
                <div className={cx("content")}>
                    <div className={cx("head")}>Danh sách chương</div>
                    <div className={cx("list-chapters")}>
                        {bodyContent.chaptersList.map((chapter : ChapterType, index) => {
                            return (
                                <Link key={index} href={`/novel/${bodyContent.novelSlug}/chuong-${chapter.chapterNumber}`} className={cx("item-chap")}>
                                    <span className={cx("item-text")}>
                                        Chương {chapter.chapterNumber}: {chapter.title}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            );
        }
        else {
            return <div>Không có chương nào</div>
        }
    }
};

export default ContentChapters;
