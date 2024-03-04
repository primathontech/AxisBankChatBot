import React from 'react';
// import BackArrow from "../../public/images/svgs/back.svg";
import HeaderIcon from "../../public/images/svgs/white-icon.svg";
// import Language from "../../public/images/svgs/language.svg";
import styles from "./styles.module.scss"

const Header = () => (
    <div>
        <div className={styles.header}>
            <div className={styles.leftContainer}>
                {/* <BackArrow width={12} height={24} style={{ cursor: "pointer" }} /> */}
                <div className={styles.heading}>
                    <HeaderIcon width={42} height={42} />
                    <div>
                        <p className={styles.mainHeading}>AXIS Securities</p>
                        <p className={styles.subHeading}>
                            <span className={styles.bullet}>&#8226;</span>
                            Always Active
                        </p>
                    </div>
                </div>
            </div>
            {/* <Language width={24} height={24} style={{ cursor: "pointer" }}/> */}
        </div>
    </div>
)

export default Header