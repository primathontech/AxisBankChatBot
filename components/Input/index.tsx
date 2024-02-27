/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import RightArrow from "../../public/images/svgs/right-arrow.svg"
import Mic from "../../public/images/svgs/microphone.svg";

import styles from "./styles.module.scss"

const Input = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

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
        }, 500);
    };
    return (
        <div>
            <div>
                {messages.map((message: any, index: any) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
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
                    <Mic width={24} height={24} />
                </div>
                <button type="button" onClick={handleSendMessage} className={styles.button}>
                    <RightArrow width={24} height={24} />
                </button>
            </div>
        </div>
    )
}

export default Input