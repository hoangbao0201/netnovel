import classNames from "classnames/bind";
import styles from "./FormFeeling.module.scss";


const cx = classNames.bind(styles);

const FormFeeling = () => {
    return (
        <div className={cx("content")}>
            <div className={cx("line", "emotions")}>
                <span className={cx("title")}>Cảm xúc</span>
                <div className={cx("list-emotion")}>

                    <span className={cx("icon-emotion", "heart")}></span>
                    <span className={cx("quantity-emotion")}>9730</span>

                    <span className={cx("icon-emotion", "like")}></span>
                    <span className={cx("quantity-emotion")}>13437</span>

                    <span className={cx("icon-emotion", "funny")}></span>
                    <span className={cx("quantity-emotion")}>2892</span>

                    <span className={cx("icon-emotion", "sad")}></span>
                    <span className={cx("quantity-emotion")}>300</span>

                    <span className={cx("icon-emotion", "angry")}></span>
                    <span className={cx("quantity-emotion")}>10</span>

                    <span className={cx("icon-emotion", "attack")}></span>
                    <span className={cx("quantity-emotion")}>703</span>

                </div>
            </div>
            <div className={cx("line", "nominations")}>
                <span className={cx("title")}>Đề cử</span>
            </div>
            <div className={cx("line", "chapter-lastest")}>
                <span className={cx("title")}>Chương mới</span>
            </div>
        </div>
    );
};

export default FormFeeling;
