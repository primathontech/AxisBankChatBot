import React from 'react';
import HeaderIcon from "@public/images/svgs/white-icon.svg";

import { APPCONSTANTS } from 'constants/AppConstant';
import styles from "./styles.module.scss"

const Header = () => (
    <div>
        <div className={styles.header}>
            <div className={styles.leftContainer}>
                <div className={styles.heading}>
                    <HeaderIcon width={42} height={42} />
                    <div>
                        <p className={styles.mainHeading}>{APPCONSTANTS.HEADING}</p>
                        <p className={styles.subHeading}>
                            <span className={styles.bullet}>&#8226;</span>
                            Always Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Header