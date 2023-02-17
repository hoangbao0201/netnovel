import classNames from "classnames/bind";
import { NextPage } from "next";
import styles from "./FormDesciption.module.scss";
const cx = classNames.bind(styles);

export interface FormDesciptionProps {
    description?: any
}

const FormDesciption : NextPage<FormDesciptionProps>= ({ description }) => {
    return (
        <div className={cx("container")}>
            <div className={cx("description", "dev-col-8")} dangerouslySetInnerHTML={{
                __html: description
            }}/>
            <div className={cx("author", "dev-col-4")}>Author</div>
        </div>
    );
};

export default FormDesciption;
