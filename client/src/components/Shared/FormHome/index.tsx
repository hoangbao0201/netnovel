import { NextPage } from "next";
import classNames from "classnames/bind";
import styles from "./FormHome.module.scss";

import CardsBook from "../CardsBook";

const cx = classNames.bind(styles);

export interface FormHomeProps {
}


const FormHome = () => {

    return (
        <div className={cx("content")}>
            <div className={cx("list-post")}>
                {/* <CardsBook /> */}
            </div>
        </div>
    );
};

export default FormHome;
