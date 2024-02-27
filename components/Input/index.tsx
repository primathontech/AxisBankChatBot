/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react'
import RightArrow from "../../public/images/svgs/right-arrow.svg"
import Mic from "../../public/images/svgs/microphone.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";

import styles from "./styles.module.scss"

const Input = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const date = new Date()

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const newMessage = {
            text: inputValue,
            sender: 'user',
        };

        setMessages([...messages, newMessage]);
        setInputValue('');

        setTimeout(() => {
            const botResponse = {
                text: `I received: ${inputValue}`,
                sender: 'bot',
            };
            setMessages([...messages, botResponse]);
        }, 1000);
    };

    return (
        <div>
            <div className={styles.chat}>
                <p className={styles.date}>
                    {messages.length > 0 && `${daysOfWeek[date.getDay()]} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                </p>
                <div>
                    {messages.map((message: any, index: any) => (
                        <div>
                            {<div key={index} className={styles.user}>
                                {message.text}
                            </div>}
                            {message.sender === "bot" &&
                                <div className={styles.messageContainer}>
                                    <BotIcon />
                                    <div key={index} className={styles.bot}>
                                        {message.text}
                                    </div>
                                </div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.inputMicContainer}>
                    <input
                        type="text"
                        placeholder="How may i help you"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <Mic width={24} height={24} style={{ cursor: "pointer" }} />
                </div>
                <button type="button" onClick={handleSendMessage} className={styles.button}>
                    <RightArrow width={24} height={24} />
                </button>
            </div>
        </div>
    )
}

export default Input