import { ReactNode } from 'react';
import classNames from 'classnames/bind'
const cx = classNames.bind(styles);

import styles from './WrapperContent.module.scss';

interface WrapperContentProps {
    children: ReactNode
    dark?: boolean | true
}

const WrapperContent = ({ children, dark } : WrapperContentProps ) => {

    return (
       <div className={cx("wrapper", `${dark || "dark"}`)}>
            <div className={cx("container")}>{children}</div>
       </div>
   )
}

export default WrapperContent