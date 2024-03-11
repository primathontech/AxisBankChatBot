import React, { useState } from 'react'
import styles from "./styles.module.scss"

type SiderProps = {
    min: number,
    current: number,
    max: number,
    type: string;
}

const Slider = (props: SiderProps) => {
    const { min, current, max, type } = props;
    const [value, setValue] = useState(current);

    const changeValue = (newVal: any) => {
        setValue(newVal);
    };

    return (
        <div>
            <div className={styles.headingWrapper}>
                <p className={styles.heading}>Select {type.charAt(0).toUpperCase() + type.slice(1)}</p>
                {type === "amount" && <p className={styles.value}>₹ {value.toLocaleString("en-IN")}</p>}
                {(type === "time" || type === "age") && <p className={styles.value}>{value} years</p>}
            </div>
            <div className={styles.sliderContainer}>
                <input type="range" max={max} min={min} value={value} step={type === "amount" ? 500 : 1}
                    onChange={(e) => changeValue(e.target.value)} className={styles.slider} />
                <div className={styles.minMax}>
                    <p>Minimum</p>
                    <p>Maximum</p>
                </div>
            </div>
        </div>
    )
}

export default Slider