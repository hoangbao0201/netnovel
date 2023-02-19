import { ReactNode } from 'react';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

import styles from './WrapperContent.module.scss';

interface WrapperContentProps {
    children: ReactNode
    dark?: boolean | true
    bgColor?: string
}

const WrapperContent = ({ children, dark, bgColor } : WrapperContentProps ) => {

    return (
       <div className={cx("wrapper", `${dark || "dark"}`)}>
            <div className={cx("container")} style={{backgroundColor: bgColor}}>{children}</div>
       </div>
   )
}

export default WrapperContent