import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

import { useRef, useState } from "react";
import { GENRES_NT, RANK_NT } from "@/constants";
import HeaderSearch from "@/components/Shared/HeaderSearch";
import useClickOutSide from "@/hook/useClickOutSide";

export interface HeaderProps {}

const Header = () => {
    const refDropdownGenres = useRef<HTMLDivElement>(null)
    const refDropdownRank = useRef<HTMLDivElement>(null)

    const [isDropDownGenres, setIsDropDownGenres] = useState<boolean>(false);
    const [isDropDownRank, setIsDropDownRank] = useState<boolean>(false);

    const eventHiddentDropdown = () => {
        setIsDropDownGenres(false);
        setIsDropDownRank(false);
    }

    useClickOutSide(refDropdownGenres, eventHiddentDropdown)
    useClickOutSide(refDropdownRank, eventHiddentDropdown)

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("content-left")}>
                    <Link className={cx("logo")} href="/">
                        NET NOVEL
                    </Link>

                    <nav className={cx("nav")}>
                        <div onClick={() => setIsDropDownGenres(true)} className={cx("nav-button")}>Thể loại</div>
                        <div ref={refDropdownGenres} className={cx("dropdown", "category", `${isDropDownGenres && "show"}`)}>
                            <div className={cx("dropdown-content")}>
                                {GENRES_NT.map(item => {
                                    return (
                                        <Link key={item.id} href={`/${item.slug}`}>
                                            <div className={cx("dropdown-item")}>{item.value}</div>
                                        </Link>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </nav>

                    <nav className={cx("nav")}>
                        <div onClick={() => setIsDropDownRank(true)} className={cx("nav-button")}>Thể loại</div>
                        <div ref={refDropdownRank} className={cx("dropdown", "rank", `${isDropDownRank && "show"}`)}>
                            <div className={cx("dropdown-content")}>
                                {RANK_NT.map(item => {
                                    return (
                                        <Link key={item.id} href={`/${item.slug}`}>
                                            <div className={cx("dropdown-item")}>{item.value}</div>
                                        </Link>
                                    )
                                })}
                                
                            </div>
                        </div>
                    </nav>

                </div>

                <div className={cx("content-right")}>
                    <div className={cx("search")}>
                        <HeaderSearch />
                    </div>
                    <div className={cx("accout")}>
                        <Link href="/auth/login">
                            <div className={cx("button", "login")}>Đăng nhập</div>
                        </Link>
                        <Link href="/auth/register">
                            <div className={cx("button", "register")}>Đăng kí</div>
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Header;
