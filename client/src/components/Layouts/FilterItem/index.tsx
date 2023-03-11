import classNames from "classnames/bind";
import styles from "./FilterItem.module.scss";

import Select from "react-select"

const cx = classNames.bind(styles);

interface FilterItemProps {
    name: string
    title: string
    options: any
}

const FilterItem = ({ name, title, options } : FilterItemProps) => {

    const eventOnchangeDataOptions = () => {

    }

    return (
        <div className={cx("item")}>
            <div className={cx("title")}>{title}</div>
            <Select
                name={name}
                defaultValue={options[0]}
                onChange={eventOnchangeDataOptions}
                options={options}
            />
        </div>
    )
}

export default FilterItem;