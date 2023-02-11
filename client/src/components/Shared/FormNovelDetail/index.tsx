import classNames from "classnames/bind";
import styles from "./FormNovelDetail.module.scss";

import FormDesciption from "./FormDescription";
import { NextPage } from "next";
import WrapperContent from "@/components/Layouts/WrapperContent";

const cx = classNames.bind(styles);

export interface FormNovelDetailProps {
    novel?: any;
}
const FormNovelDetail: NextPage<FormNovelDetailProps> = ({ novel }) => {

    if(!novel) {
        return null;
    }
    return (
        <>
            <div className={cx("head")}>
                <div className={cx("thumbnail")}>
                    <img
                        className={cx("image")}
                        src={novel.image?.url || "/images/novel-default.png"}
                    />
                </div>
                <div className={cx("detail")}>
                    <div className={cx("grid-name")}>
                        <h2 className={cx("title")}>{novel.title}</h2>
                    </div>
                    <div className={cx("category")}>
                        <div className={cx("item")}>{novel.author}</div>
                        <div className={cx("item")}>{novel.category}</div>
                        <div className={cx("item")}>{novel.personality}</div>
                        <div className={cx("item")}>{novel.scene}</div>
                        <div className={cx("item")}>{novel.classify}</div>
                        <div className={cx("item")}>{novel.viewFrame}</div>
                    </div>

                    <div className={cx("grid-number")}>
                        <div className={cx("detail-number", "number-chapter")}>
                            <div>312</div>
                            Chương
                        </div>
                        <div
                            className={cx(
                                "detail-number",
                                "number-chapter-week"
                            )}
                        >
                            <div>13</div>
                            Chương/tuần
                        </div>
                        <div className={cx("detail-number", "number-reads")}>
                            <div>1.6M</div>
                            Lượt đọc
                        </div>
                        <div className={cx("detail-number", "number-store")}>
                            <div>3249</div>
                            Cất giữ
                        </div>
                    </div>

                    <div className={cx("action")}>
                        <div className={cx("grid-button")}>
                            <button className={cx("button-action", "reading")}>
                                Đọc tiếp
                            </button>
                            <button className={cx("button-action", "novelmark")}>
                                Đánh dấu
                            </button>
                            <button
                                className={cx("button-action", "suggest-novel")}
                            >
                                Đề cử
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("page-content")}>
                <div className={cx("content-page")}>
                    <div className={cx("list-tab")}>
                        <button className={cx("button-tab", "active")}>
                            <div className={cx("item")}>Giới thiệu</div>
                        </button>
                        <button className={cx("button-tab")}>
                            <div className={cx("item")}>Đánh giá</div>
                        </button>
                        <button className={cx("button-tab")}>
                            <div className={cx("item")}>D.s chương</div>
                        </button>
                        <button className={cx("button-tab")}>
                            <div className={cx("item")}>Bình luận</div>
                        </button>
                        <button className={cx("button-tab")}>
                            <div className={cx("item")}>Hâm mộ</div>
                        </button>
                    </div>
                    <div className={cx("tab-content")}>
                        <FormDesciption description={novel.description} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormNovelDetail;
