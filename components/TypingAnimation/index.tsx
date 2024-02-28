import React from 'react'
import styles from "./styles.module.scss"

const Typinganimation = () => (
    <div>
        <div className={styles.container}>
            <div className={styles.col_3}>
                <div className={styles.snippet} data-title="dot-pulse">
                    <div className={styles.stage}>
                        <div className={styles.dot_pulse} />
                    </div>
                </div>
            </div>
        </div>
    </div>
)


export default Typinganimation