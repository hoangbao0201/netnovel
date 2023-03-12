import classNames from "classnames/bind";
import styles from "./FilterItem.module.scss";

import Select from "react-select"

const cx = classNames.bind(styles);

interface FilterItemProps {
    name: string
    title: string
    options: any
    defaultValue?: Object | null
    handleOnchange: Function
}

const FilterItem = ({ name, title, defaultValue, handleOnchange, options } : FilterItemProps) => {

    const eventOnchangeDataOptions = (select: any) => {
        handleOnchange(select.id)
    }

    return (
        <div className={cx("item")}>
            <div className={cx("title")}>{title}</div>
            <Select
                name={name}
                defaultValue={ defaultValue || options[0]}
                onChange={eventOnchangeDataOptions}
                options={options}
            />
        </div>
    )
}

export default FilterItem;