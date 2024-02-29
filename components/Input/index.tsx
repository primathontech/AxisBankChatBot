/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef } from 'react';
import cx from "classnames";
import Typinganimation from '@components/TypingAnimation';
import RightArrow from "../../public/images/svgs/right-arrow.svg";
import Mic from "../../public/images/svgs/microphone.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";
import Typing from "react-typing-animation";
import GraphCom from '@components/GraphCom';
import { httpPost } from '@utils/httpClient';

import styles from "./styles.module.scss";


const Input = () => {
    const [messages, setMessages] = useState([{ text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?", sender: "bot" }]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [graphCom, setgraphCom] = useState(false);
    const [apiData, setData] = useState({});
    const [suggestionClick, setSuggestionClick] = useState(false)
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

    const handleSendMessage = async () => {
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

        setgraphCom(false);

        const value = inputValue.includes(" ") ? encodeURIComponent(inputValue) : inputValue;
        const apiResponse = await httpPost(`http://52.66.196.112:8001/api/v1/agent/execute?query=${value}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
        setData(apiResponse);
        setMessages((prevMessages) => {
            const botResponse = {
                text: apiResponse.data.response,
                sender: 'bot',
            };
            return [...prevMessages.slice(0, -1), botResponse];
        });

    };

    const handleSuggestion = async (event) => {
        if (suggestionClick) {
            return
        }
        let value = event.target.textContent;
        setSuggestionClick(true)
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

        setgraphCom(false);
        value = value.includes(" ") ? encodeURIComponent(value) : value;
        const apiResponse = await httpPost(`http://52.66.196.112:8001/api/v1/agent/execute?query=${value}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
        setData(apiResponse);

        setMessages((prevMessages) => {
            const botResponse = {
                text: apiResponse.data.response,
                sender: 'bot',
            };
            return [...prevMessages.slice(0, -1), botResponse];
        });
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
        <div style={{ paddingTop: "10px" }}>
            <div className={styles.chat}>
                <div>
                    {messages.map((message: any, index: any) => (
                        <div key={index}>
                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" &&
                                <div className={message.sender === "user" && message.text ? styles.user : styles.displayNone}>
                                    {message.text}
                                </div>}
                            {message.sender === "bot" &&
                                <div className={styles.botReply}>
                                    <div className={styles.messageContainer}>
                                        <div className={styles.botIcon}>
                                            <BotIcon />
                                        </div>
                                        <div style={{ alignSelf: "center" }}>
                                            <div className={message.component ? styles.typing : styles.bot}>
                                                {message.component ? message.component : <>
                                                    <Typing wrapper="span" speed={40} onFinishedTyping={() => setgraphCom(true)}>
                                                        {message.text}
                                                    </Typing>
                                                </>}
                                            </div>
                                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" && apiData.data?.chart?.chartType !== "SmallTalk" && graphCom &&
                                                <div div className={message.component ? styles.typing : styles.bot} style={{ marginTop: "5px" }}>
                                                    <GraphCom type={apiData.data?.chart?.chartType} data={apiData.data?.chart?.chartData} />
                                                </div>}
                                        </div>
                                    </div>
                                    {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" && apiData.data?.suggestions.length > 0 &&
                                        <div className={styles.suggestionsContainer}>
                                            {apiData.data?.suggestions.map((item) =>
                                                <p className={suggestionClick ?
                                                    cx(styles.clickedSuggestions,
                                                        styles.suggestion) : styles.suggestion} onClick={(e) => handleSuggestion(e)}>{item}</p>)}
                                        </div>
                                    }
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
