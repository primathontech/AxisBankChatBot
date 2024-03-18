import React from 'react'

import Header from '@components/Header'
import Input from '@components/Input'

import styles from "./styles.module.scss";

const HomePage = () =>
(
    <div className={styles.container}>
        <Header />
        <Input />
    </div>
)

export default HomePage