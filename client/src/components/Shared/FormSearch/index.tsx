import Link from "next/link";
import classNames from "classnames/bind";
import styles from "./FormSearch.module.scss";

import Select from "react-select"
import { OPTIONS_ARRANGE_NT, OPTIONS_CATEGORY_NT, OPTIONS_CLASSIFY_NT, OPTIONS_PERSONALITY_NT, OPTIONS_SCENE_NT, OPTIONS_VIEWFRAME_NT } from "@/constants";
import { useState } from "react";
import FilterItem from "@/components/Layouts/FilterItem";

const cx = classNames.bind(styles);

const FormSearch = () => {

    const [dataOptions, setDataOptions] = useState({
        category: "",
        arrange: "",
        personality: "",
        scene: "",
        classify: "",
        viewframe: ""
    })

    const eventOnchangeDataOptions = (value: string, name: string) => {
        // setDataOptions({
        //     ...dataOptions,
        //     [e.target.name]: e.target.value
        // })
        console.log(value, name)
    }

    console.log(dataOptions)

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>

                <div className={cx("head-options")}>
                    <div className={cx("list-options")}>

                        <FilterItem 
                            name="category"
                            title="Thể loại"
                            options={OPTIONS_CATEGORY_NT}
                        />
                        <FilterItem 
                            name="arrange"
                            title="Sắp xếp"
                            options={OPTIONS_ARRANGE_NT}
                        />
                        <FilterItem 
                            name="personality"
                            title="Tính cách"
                            options={OPTIONS_PERSONALITY_NT}
                        />
                        <FilterItem 
                            name="scene"
                            title="Bối cảnh"
                            options={OPTIONS_SCENE_NT}
                        />
                        <FilterItem 
                            name="classify"
                            title="Lưu phái"
                            options={OPTIONS_CLASSIFY_NT}
                        />
                        <FilterItem 
                            name="viewframe"
                            title="Thị giác"
                            options={OPTIONS_VIEWFRAME_NT}
                        />

                    </div>
                </div>

            </div>
        </div>
    )
}

export default FormSearch