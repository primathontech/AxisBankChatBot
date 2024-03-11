import React from 'react';
import Image from 'next/image';
import UpArrow from "@public/images/svgs/right-up-arrow.svg";
import DownArrow from "@public/images/svgs/right-down-arrow.svg";
import styles from "./styles.module.scss"

type TopComapnies = {
    data: any
}

const TopChemicalCompanies = (props: TopComapnies) => {
    const { data } = props;

    return (
        <div className={styles.container}>
            {data?.map((item: any) =>
                <div className={styles.wrapper}>
                    <div className={styles.details}>
                        <div className={styles.headingContainer}>
                            <div className={styles.headingWrapper}>
                                <Image src={item?.logo} alt="" width={32} height={16} style={{ marginTop: "4px" }} />
                                <p className={styles.heading}>{item?.name}</p>
                            </div>
                            <p className={styles.headingValue}>₹ {(item.currentValue < 0 ? -item.currentValue : item.currentValue).toLocaleString("en-IN")}</p>
                        </div>
                        <div className={styles.textContainer}>
                            <div style={{ display: "flex", alignContent: "center", gap: "4px" }}>
                                <div className={styles.stockHeading}>
                                    {item?.shortName}
                                    <span className={styles.stock}>{item?.type}</span>
                                </div>
                            </div>
                            <p className={styles.stockOverallValue} style={{ color: item?.returnValue > 0 ? "#16A34A" : "#FF0000" }}>
                                {item?.returnValue > 0 ? <UpArrow style={{ paddingTop: "3px" }} /> : <DownArrow style={{ paddingTop: "3px" }} />}&nbsp;
                                {item?.returnValue} ({item?.returnPercentage}%)
                            </p>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default TopChemicalCompanies