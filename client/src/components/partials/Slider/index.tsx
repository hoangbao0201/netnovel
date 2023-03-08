import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

export interface SliderProps {}

const Slider = () => {

    return (
        <div className={cx("content")}>
            <img alt="thumbnail-slider" className={cx("image-thumbnail")} src={`/images/slider-thumbnail-${Math.floor(Math.random() * 8) + 1}.png`}/>
            <div className={cx("blur-image")}></div>
        </div>
    );
};

export default Slider;
