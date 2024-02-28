/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef } from 'react';
import Typinganimation from '@components/TypingAnimation';
import RightArrow from "../../public/images/svgs/right-arrow.svg";
import Mic from "../../public/images/svgs/microphone.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";
import Typing from "react-typing-animation";
import styles from "./styles.module.scss";

const Input = () => {
    const [messages, setMessages] = useState([{ text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?", sender: "bot" }]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    // const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    // const date = new Date();
    const recognition = useRef(null);


    if (typeof window !== 'undefined' && !recognition.current) {
        recognition.current = new window.webkitSpeechRecognition();
        recognition.current.continuous = false;
        recognition.current.lang = 'en-US';

        recognition.current.onresult = (event: any) => {
            const { transcript } = event.results[0][0];
            setInputValue(transcript);
        };
    }

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

        setMessages((prevMessages: any) => {
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
                return [...prevMessages.slice(0, -1), botResponse];
            });
        }, 5000);
    };

    const toggleSpeechRecognition = () => {
        if (isListening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div>
            <div className={styles.chat}>
                {/* <p className={styles.date}>
                    {messages.length > 0 && `${daysOfWeek[date.getDay()]} 
                    ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}
                </p> */}
                <div>
                    {messages.map((message: any, index: any) => (
                        <div key={index}>
                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" &&
                                <div className={message.sender === "user" ? styles.user : styles.displayNone}>
                                    {message.text}
                                </div>}
                            {message.sender === "bot" &&
                                <div className={styles.messageContainer}>
                                    <div className={styles.botIcon}>
                                        <BotIcon />
                                    </div>
                                    <div className={message.component ? styles.typing : styles.bot}>
                                        {message.component ? message.component : <Typing wrapper="span"  speed={40}>{message.text}</Typing>}
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
                        placeholder="How may I help you"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={styles.input}
                        onKeyPress={handleKeyPress}
                    />
                    <Mic width={24} height={24} style={{ cursor: "pointer" }} onClick={toggleSpeechRecognition} />
                </div>
                <button type="button" onClick={handleSendMessage} className={styles.button}>
                    <RightArrow width={24} height={24} />
                </button>
            </div>
        </div>
    );
};

export default Input;
