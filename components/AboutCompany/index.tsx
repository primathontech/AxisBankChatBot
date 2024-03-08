import Image from 'next/image'
import React from 'react'
import blueStar from "@public/images/pngs/blueStar.png";
import LargeScale from "@public/images/svgs/large-scale.svg"
import Risk from "@public/images/svgs/risk.svg"
import UpArrow from "@public/images/svgs/right-up-arrow.svg"

import styles from "./styles.module.scss";

const AboutCompany = () => (
    <div className={styles.container}>
        <div className={styles.uppercontainer}>
            <div className={styles.imageContainer}>
                <Image src={blueStar} alt='' width={124} height={25} />
                <p className={styles.stockType}>Hold</p>
            </div>
            <div className={styles.riskContainer}>
                <div className={styles.risk}>
                    <LargeScale width={14} height={14} />
                    <p className={styles.riskText}>Large-cap</p>
                </div>
                <div className={styles.risk}>
                    <Risk width={18} height={9} />
                    <p className={styles.riskText}>Moderate Risk</p>
                </div>
            </div>
        </div>
        <hr style={{ borderTop: "1px solid #EEEFF1" }} />
        <div className={styles.downContainer}>
            <div className={styles.stockValueContainer}>
                <span className={styles.stockValue}>₹ 1,043</span>
                <span className={styles.returns} style={{ color: "#16A34A" }}>
                    <UpArrow style={{ paddingTop: "3px" }} />
                    &nbsp;+0.25 (0.031%)
                </span>
            </div>
            <div className={styles.stockDetails}>
                <div>
                    <p className={styles.stockDetailsHeading}>PE Ratio</p>
                    <p className={styles.stockDetailsValue}>₹ 6,000.00</p>
                </div>
                <div>
                    <p className={styles.stockDetailsHeading}>Market Cap</p>
                    <p className={styles.stockDetailsValue}>₹ 25,240.80</p>
                </div>
                <div>
                    <p className={styles.stockDetailsHeading}>1 Y Returns</p>
                    <p style={{ color: "#16A34A", display: "flex" }} className={styles.stockDetailsValue}>
                        <span style={{ width: "14px", height: "14px", paddingTop: "2px" }}>
                            <UpArrow />
                        </span>
                        320.68%
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export default AboutCompany
