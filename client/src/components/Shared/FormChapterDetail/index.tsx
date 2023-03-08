import Link from "next/link";
import { NextPage } from "next";
import classNames from "classnames/bind";

import styles from "./FormChapterDetail.module.scss";
import { iconChevronLeft, iconChevronRight } from "public/icons";
import { ChapterDetailProps } from "@/pages/novel/[slug]/[chapterNumber]";
import { convertTime } from "@/utils/convertTime";
import moment from "moment";
import dynamic from "next/dynamic";
// import "moment/locale/vi";

const cx = classNames.bind(styles);

const FormChapterDetail: NextPage<ChapterDetailProps> = ({ chapter }) => {

    return (
        <div className={cx("content")}>
            <div className={cx("content-head")}>
                <div className={cx("chapter-navigation")}>
                    <Link
                        href={`/novel/${chapter.novelSlug}/chuong-${
                            chapter.chaptersList[0].chapterNumber - 1
                        }`}
                        className={cx(
                            "button",
                            "btn-prev",
                            `${
                                chapter.chaptersList[0].chapterNumber - 1 == 0
                                    ? "disabled"
                                    : ""
                            }`
                        )}
                    >
                        {iconChevronLeft} Chương trước
                    </Link>
                    <Link
                        href={`/novel/${chapter.novelSlug}/chuong-${
                            chapter.chaptersList[0].chapterNumber + 1
                        }`}
                        className={cx(
                            "button", 
                            "btn-next",
                            `${
                                chapter.chapterCount === chapter.chaptersList[0].chapterNumber
                                    ? "disabled"
                                    : ""
                            }`
                        )}
                    >
                        Chương sau {iconChevronRight}
                    </Link>
                </div>

                <div className={cx("title")}>
                    Chương {chapter.chaptersList[0].chapterNumber}:{" "}
                    {chapter.chaptersList[0].title}
                </div>

                <div className={cx("chapter-detail")}>
                    <Link href={`/novel/${chapter.novelSlug}`} className={cx("title-novel")}>{chapter.novelName}</Link>

                    <div className={cx("createAt-chapter")}>
                        {/* {convertTime(chapter.chaptersList[0].createdAt)} */}
                    </div>
                </div>

                <div
                    className={cx("content-chapter")}
                    dangerouslySetInnerHTML={{
                        __html:
                            chapter.chaptersList[0].content || "Lỗi hiển thị",
                    }}
                />
            </div>

            <div className={cx("chapter-navigation")}>
                <Link
                    href={`/novel/${chapter.novelSlug}/chuong-${
                        chapter.chaptersList[0].chapterNumber - 1
                    }`}
                    className={cx(
                        "button",
                        "btn-prev",
                        `${
                            chapter.chaptersList[0].chapterNumber - 1 == 0
                                ? "disabled"
                                : ""
                        }`
                    )}
                >
                    {iconChevronLeft} Chương trước
                </Link>
                <Link
                    href={`/novel/${chapter.novelSlug}/chuong-${
                        chapter.chaptersList[0].chapterNumber + 1
                    }`}
                    className={cx("button", "btn-next")}
                >
                    Chương sau {iconChevronRight}
                </Link>
            </div>
        </div>
    );
};

export default FormChapterDetail;
