import Link from "next/link";
import { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./HeaderSearch.module.scss";

import useClickOutSide from "@/hook/useClickOutSide";

const cx = classNames.bind(styles);

export interface HeaderSearchProps {}

const HeaderSearch = () => {
    const refModalSearch = useRef<HTMLDivElement>(null);
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);

    const eventHiddentModalSearch = () => {
        setIsModalSearch(false);
    }

    useClickOutSide(refModalSearch, eventHiddentModalSearch);

    return (
        <div className={cx("content")}>
            <span onClick={() => setIsModalSearch(true)} className={cx("button-search")}>Tìm kiếm</span>
            <div className={cx("overlay", `${isModalSearch && "show"}`)}>

                <div ref={refModalSearch} className={cx("modal-search")}>
                    
                    <div className={cx("form")}>
                        <div className={cx("head")}>
                            <input className={cx("input-search")} placeholder="Tìm kiếm"/>
                        </div>

                        <div className={cx("modal-content")}>

                            <Link href="/">
                                <div className={cx("card")}>
                                    Vừa Thành Tiên Thần, Con Cháu Cầu Ta Xuất Sơn
                                </div>
                            </Link>
                            <Link href="/">
                                <div className={cx("card")}>
                                    Vừa Thành Tiên Thần, Con Cháu Cầu Ta Xuất Sơn
                                </div>
                            </Link>
                            <Link href="/">
                                <div className={cx("card")}>
                                    Vừa Thành Tiên Thần, Con Cháu Cầu Ta Xuất Sơn
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default HeaderSearch;
