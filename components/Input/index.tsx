/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react'
import RightArrow from "../../public/images/svgs/right-arrow.svg"
import Mic from "../../public/images/svgs/microphone.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";

import styles from "./styles.module.scss"
import Typinganimation from '@components/TypingAnimation';

const Input = () => {
    const [messages, setMessages] = useState<string[{}]>([{ text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?", sender: "bot" }]);
    const [inputValue, setInputValue] = useState('');
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    const date = new Date()

    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        setMessages((prevMessages) => {
            const newMessage = {
                text: inputValue,
                sender: 'user',
            };
            return [...prevMessages, newMessage];
        });

        setInputValue('');

        setMessages((prevMessages) => {
            const botTypingMessage = {
                component: <Typinganimation />,
                sender: 'bot',
            };
            return [...prevMessages, botTypingMessage];
        });

        setTimeout(() => {
            setMessages((prevMessages) => {
                const botResponse = {
                    text: `I received: ${inputValue}`,
                    sender: 'bot',
                };
                return [...prevMessages.slice(0, -1), botResponse]; // Replace the last message (typing indication) with the actual bot response
            });
        }, 5000);
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
                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" &&
                                <div key={index} className={message.sender === "user" ? styles.user : styles.displayNone}>
                                    {message.text}
                                </div>}
                            {message.sender === "bot" &&
                                <div className={styles.messageContainer}>
                                    <div className={styles.botIcon}>
                                        <BotIcon />
                                    </div>
                                    {<div key={index} className={message.component ? styles.typing : styles.bot}>
                                        {message.component ? message.component : message.text}
                                    </div>}
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
                        onKeyPress={handleKeyPress}
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