
import Header from '@components/Header'
import Input from '@components/Input'
import React from 'react'

const HomePage = () =>
(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh", backgroundColor: "#f8f8f8" }}>
        <Header />
        <Input />
    </div>
)

export default HomePage