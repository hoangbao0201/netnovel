import Link from 'next/link';
import { NextPage } from 'next';
import classNames from 'classnames/bind'
import styles from './CardsBook.module.scss';

import { iconAuthor } from 'public/icons';

const cx = classNames.bind(styles);

export interface CardsBookProps {
    data?: any
}
const CardsBook : NextPage<CardsBookProps> = ({ data } : CardsBookProps) => {

    // console.log(data?.title)

    return (
       <div className={cx("wrapper")} >
            <div className={cx("container")}>
                <Link href={`/book/${data?.linkBook}` || "/"} className={cx('grid-image')}>
                    <img className={cx("thumbnail")} src={data?.image?.url || "/images/book-default.png"}/>
                </Link>
                <div className={cx("detail")}>
                    <Link className={cx("title-link")} href={`/book/${data?.linkBook}` || "/"}>
                        <h3 className={cx("title")}>
                            {data?.title || "Lỗi hiển thị"}
                        </h3>
                    </Link>
                    <div className={cx("description")} dangerouslySetInnerHTML={{
                        __html: data?.description || "Lỗi hiển thị"
                    }}/>
                    <div className={cx("detail-bottom")}>
                        <div className={cx("grid-author")}>
                            {iconAuthor} <h4 className={cx("author")}>{data?.author || "Lỗi hiển thị"}</h4>
                        </div>
                        <div className={cx("catagory")}>
                            {data?.category || "Lỗi hiển thị"}
                        </div>
                    </div>
                </div>
            </div>
       </div>
   )
}

export default CardsBook