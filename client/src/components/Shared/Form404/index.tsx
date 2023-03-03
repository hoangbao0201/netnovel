import classNames from "classnames/bind";
import Link from "next/link";
import { iconArrowTop } from "public/icons";
import styles from "./Form404.module.scss";

const cx = classNames.bind(styles);

export interface Form404Props {}

const Form404 = () => {
    return (
        <div className={cx("content")}>

            <img className={cx("image-404")} src="/images/404-img.png"/>
            <div className={cx("title")}>Rất tiếc!</div>
            <div className={cx("description")}>Nội dung này không tồn tại hoặc đã bị xóa</div>
            <Link className={cx("link-come-back")} href="/">
                {iconArrowTop} Trở về trang chủ
            </Link>
        </div>
    );
};

export default Form404;
