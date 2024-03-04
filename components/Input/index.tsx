/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import cx from "classnames";
import Typinganimation from '@components/TypingAnimation';
import Typing from "react-typing-animation";
import GraphCom from '@components/GraphCom';
import { httpPost } from '@utils/httpClient';
import { TypeAnimation } from 'react-type-animation';
import { useRouter } from 'next/router';
import RightArrow from "../../public/images/svgs/right-arrow.svg";
import Mic from "../../public/images/svgs/microphone.svg";
import MicOn from "../../public/images/svgs/micOn.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";

import styles from "./styles.module.scss";

const Input = () => {
    const router = useRouter();
    const profileValue = router.query.profile;
    const demo = router.query.demo;
    const [messages, setMessages] = useState([
        {
            text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?",
            sender: "bot",
            chartType: "",
            chartData: "",
            dataType: "",
            title: "",
            graph: false,
            input: "",
        }]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [graphCom, setgraphCom] = useState(false);
    const [apiData, setData] = useState({});
    const [suggestionClick, setSuggestionClick] = useState(false)
    const [typingText, setTypingText] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const recognition = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!typingText && inputRef.current) {
            inputRef.current.focus();
        }
    }, [typingText]);


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
        try {
            const apiResponse = await httpPost(`https://robo-advisory.primathontech.co.in/api/v1/agent/execute?query=${value}&profile=${profileValue}&demo=${demo}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
            if (apiResponse.data !== null || apiResponse.Data !== null) {
                setData(apiResponse);
                setMessages((prevMessages) => {
                    const botResponse = {
                        text: apiResponse.data.response,
                        sender: 'bot',
                        chartType: apiResponse.data.chart?.chartType,
                        chartData: apiResponse.data.chart?.chartData,
                        dataType: apiResponse.data.chart?.dataType,
                        title: apiResponse.data.chart?.title,
                        input: apiResponse.data.inputs
                    };
                    return [...prevMessages.slice(0, -1), botResponse];
                });
            }
            if (apiResponse.data === null || apiResponse.Data === null) {
                setErrorMessage(apiResponse.message || apiResponse.Message);
                setError(true)
            }
        }
        catch (e) {
            setErrorMessage(e.message || e.Message);
            setError(true)
        }
    };

    const handleSuggestion = async (event) => {
        if (suggestionClick) {
            return
        }
        let value = event.target.textContent;
        setSuggestionClick(true)
        setMessages((prevMessages) => {
            const newMessage = {
                text: decodeURIComponent(value),
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
        try {
            const apiResponse = await httpPost(`https://robo-advisory.primathontech.co.in/api/v1/agent/execute?query=${value}&profile=${profileValue}&demo=${demo}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
            if (apiResponse.data !== null || apiResponse.Data !== null) {
                setData(apiResponse);
                setMessages((prevMessages) => {
                    const botResponse = {
                        text: apiResponse.data.response,
                        sender: 'bot',
                        chartType: apiResponse.data.chart?.chartType,
                        chartData: apiResponse.data.chart?.chartData,
                        dataType: apiResponse.data.chart?.dataType,
                        title: apiResponse.data.chart?.title,
                        input: apiResponse.data.inputs
                    };
                    return [...prevMessages.slice(0, -1), botResponse];
                });
            }
            if (apiResponse.data === null || apiResponse.Data === null) {
                setErrorMessage(apiResponse.message || apiResponse.Message);
                setError(true);

            }
            setSuggestionClick(false)
        } catch (e) {
            setErrorMessage(e.message || e.Message);
            setError(true);

        }
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
        <div style={{ paddingTop: "10px", position: "fixed", bottom: 20, width: "100%" }}>
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
                                        <div className={message.component ? styles.displayNone : styles.botIcon}>
                                            <BotIcon />
                                        </div>
                                        <div style={{ alignSelf: "center" }}>
                                            <div className={message.component ? styles.typing : styles.bot}>
                                                {message.component ? message.component : <>
                                                    <Typing wrapper="span" speed={30} onFinishedTyping={() => {
                                                        setgraphCom(true); setMessages((prevMessages) => {
                                                            const updatedMessages = [...prevMessages];
                                                            const lastMessageIndex = updatedMessages.length - 1;

                                                            if (lastMessageIndex >= 0 && updatedMessages[lastMessageIndex].sender === 'bot') {
                                                                // Modify the graph value in the last bot message
                                                                updatedMessages[lastMessageIndex] = {
                                                                    ...updatedMessages[lastMessageIndex],
                                                                    graph: true, // or any other value you want to set
                                                                };
                                                            }

                                                            return updatedMessages;
                                                        });


                                                    }}>
                                                        {message.text}
                                                    </Typing>
                                                </>}
                                            </div>
                                            {(((message.chartType === "pie" || message.chartType === "bar") && message.chartData !== null)
                                                || ((message.chartType === "line" || message.chartType === "line chart") && message.chartData !== null)) && message.graph &&
                                                <div className={message.component ? styles.typing : styles.bot} style={{ marginTop: "5px" }}>
                                                    <GraphCom type={message.chartType}
                                                        data={message.chartData}
                                                        dataType={(message.chartType === "pie" || message.chartType === "bar") ? "pie" : "line"}
                                                        title={message.title} />
                                                </div>}
                                        </div>
                                    </div>
                                    {apiData.data?.suggestions?.length > 0 && (message.input?.length === 0 || (typeof message.input === "string"))
                                        && graphCom && (index === messages.length - 1) &&
                                        <div className={styles.suggestionsContainer}>
                                            {apiData.data?.suggestions.map((item) =>
                                                <p className={styles.suggestion}
                                                    onClick={(e) => handleSuggestion(e)} aria-hidden>{item}</p>)}
                                        </div>
                                    }
                                    {message.input?.length > 0
                                        && graphCom && (index === messages.length - 1) && (typeof message.input !== "string") &&
                                        <div className={cx(styles.suggestionsContainer)}>
                                            {message.input?.map((item) =>
                                                <p className={cx(styles.suggestion)}
                                                    onClick={(e) => handleSuggestion(e)} aria-hidden>{item}</p>)}
                                        </div>
                                    }
                                </div>}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                {error && <p className={styles.error}>{errorMessage}
                    <span onClick={() => window.location.reload()} style={{ cursor: "pointer" }} aria-hidden>↺</span></p>}
                {!error &&
                    <>
                        <div className={styles.inputMicContainer} onClick={() => setTypingText(false)} aria-hidden>
                            {typingText && <TypeAnimation
                                sequence={[
                                    "I have 10L, what should I do with it",
                                    3000,
                                    "I want to make wealth",
                                    1000,
                                    "can I buy a Mercedes",
                                    2000,
                                    "should I save for emergency fund?",
                                    4000,
                                    "I want to travel the world , how much would I need",
                                    5000,
                                    "I have my child’s post graduation in 5 years and he wants to study in US",
                                    8000,
                                ]}
                                wrapper="span"
                                speed={20}
                                repeat={Infinity}
                                style={{ color: "#757575" }}
                            />}
                            {!typingText && <input
                                type="text"
                                placeholder={isListening ? "Speak Now" : "How may I help you"}
                                value={inputValue}
                                onChange={handleInputChange}
                                className={styles.input}
                                onKeyPress={handleKeyPress}
                                ref={inputRef}
                            />}
                            {!isListening && <Mic width={24} height={24} style={{ cursor: "pointer" }} onClick={toggleSpeechRecognition} />}
                            {isListening && <MicOn width={24} height={24} style={{ cursor: "pointer", paddingTop: "4px" }} onClick={toggleSpeechRecognition} />}
                        </div>
                        {!isListening && <button type="button" onClick={handleSendMessage} className={styles.button}>
                            <RightArrow width={24} height={24} />
                        </button>}
                    </>}
            </div>
        </div>
    );
};

export default Input;
