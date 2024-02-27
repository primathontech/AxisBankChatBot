import Header from '@components/Header'
import Input from '@components/Input'
import React from 'react'

const HomePage = () => (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100vh" }}>
        <Header />
        <Input />
    </div>
)

export default HomePage