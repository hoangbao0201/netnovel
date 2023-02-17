import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";

import { getChaptersBySlugHandler } from "@/services";

import styles from "./ContentChapters.module.scss";
import { ChapterType } from "@/types";
import Loading from "@/components/partials/Loading";

const cx = classNames.bind(styles);

interface ContentChaptersProps {
    slug?: string;
}

const ContentChapters = ({ slug }: ContentChaptersProps) => {

    const [bodyContent, setBodyContent] = useState<ChapterType[] | null>(null)

    const getListChapters = async () => {
        const chaptersResponse = await getChaptersBySlugHandler(slug as string);
        if (chaptersResponse?.data.success) {
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
                        {bodyContent.map((chapter : ChapterType) => {
                            return (
                                <Link key={chapter._id} href="#" className={cx("item-chap")}>
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
