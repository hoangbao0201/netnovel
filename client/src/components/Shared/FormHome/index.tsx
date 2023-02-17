import { NextPage } from "next";
import classNames from "classnames/bind";
import styles from "./FormHome.module.scss";

import CardsBook from "../CardsNovel";
import { NovelType } from "@/types";

const cx = classNames.bind(styles);

export interface FormHomeProps {
    novels?: NovelType[]
}


const FormHome = ({ novels } : FormHomeProps) => {

    return (
        <div className={cx("content")}>
            <div className={cx("list-post")}>
                {/* <CardsBook /> */}
                { novels ? ( novels.map((novel : any) => {
                    return <CardsBook key={novel._id} data={novel}/>
                }) ) : (<p>Không có truyện nào</p>) }
            </div>
        </div>
    );
};

export default FormHome;
