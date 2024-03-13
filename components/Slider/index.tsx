/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import { COLORS } from 'constants/appColors';
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

    const changeValue = (e: any) => {
        const newVal = e.target.value;
        setValue(newVal);
        const progress = (newVal / e.target.max) * 100;

        e.target.style.background = `linear-gradient(to right, ${COLORS.LIGHT_PURPLE} ${progress}%, ${COLORS.BRIGHT_GRAY} ${progress}%)`;
    };

    useEffect(() => {
        const sliderInput = document.querySelector(`.${styles.slider}`) as HTMLInputElement;
        if (sliderInput) {
            const progress = (value / max) * 100;
            sliderInput.style.background = `linear-gradient(to right, ${COLORS.LIGHT_PURPLE} ${progress}%, ${COLORS.BRIGHT_GRAY} ${progress}%)`;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        const val = type === "amount" ? `${value} Lakhs` : `${value} years`
        onClick("", val)
    }

    return (
        <div>
            <div className={styles.headingWrapper}>
                <p className={styles.heading}>Select {type.charAt(0).toUpperCase() + type.slice(1)}</p>
                {type === "amount" && <p className={styles.value}>₹ {value.toLocaleString("en-IN")} Lakhs</p>}
                {type !== "amount" && <p className={styles.value}>{value} years</p>}
            </div>
            <div className={styles.sliderContainer}>
                <input type="range" max={max} min={0} value={value} step={1}
                    onChange={changeValue} className={styles.slider} />
                <div className={styles.minMax}>
                    <p>{type !== "amount" ? min === 1 ? `${min} year` : `${min} years` : `₹ ${min} Lakhs`}</p>
                    <p>{type !== "amount" ? `${max} years` : `₹ ${max} Lakhs`}</p>
                </div>
            </div>
            <button type='button' className={styles.button} onClick={handleClick}>Submit</button>
        </div>
    )
}

export default Slider