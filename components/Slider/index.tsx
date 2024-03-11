import React, { useState } from 'react'
import styles from "./styles.module.scss"

type SiderProps = {
    min: number,
    current: number,
    max: number,
    type: string;
    onClick: (e: any, valueOfSlider: any) => void;
}

const Slider = (props: SiderProps) => {
    const { min, current, max, type, onClick } = props;
    const [value, setValue] = useState(current);

    const changeValue = (newVal: any) => {
        setValue(newVal);
    };

    const handleClick = () => {
        const val=type==="amount"?`${value}L`:`${value} years`
        onClick("",val)
    }

    return (
        <div>
            <div className={styles.headingWrapper}>
                <p className={styles.heading}>Select {type.charAt(0).toUpperCase() + type.slice(1)}</p>
                {type === "amount" && <p className={styles.value}>₹ {value.toLocaleString("en-IN")}L</p>}
                {type !== "amount" && <p className={styles.value}>{value} years</p>}
            </div>
            <div className={styles.sliderContainer}>
                <input type="range" max={max} min={min} value={value} step={1}
                    onChange={(e) => changeValue(e.target.value)} className={styles.slider} />
                <div className={styles.minMax}>
                    <p>Minimum</p>
                    <p>Maximum</p>
                </div>
            </div>
            <button type='button' className={styles.button} onClick={handleClick}>Submit</button>
        </div>
    )
}

export default Slider