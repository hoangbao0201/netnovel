import { ReactNode } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import styles from "./MainLayout.module.scss";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../../partials/Header"));
const Footer = dynamic(() => import("../../partials/Footer"));

interface MainLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const MainLayout = ({ children, showHeader, showFooter }: MainLayoutProps) => {
    return (
        <>
            {showHeader && <Header />}

            <div className={cx("content")}>{children}</div>

            {showFooter && <Footer />}

            {/* <ul className="haha">
                <li>
                    <div>1187</div>
                    <div>Chương</div>
                </li>
                <li>123</li>
            </ul> */}
        </>
    );
};

export default MainLayout;
