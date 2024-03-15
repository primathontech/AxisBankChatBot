/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import cx from "classnames";
import Typinganimation from '@components/TypingAnimation';
import Typing from "react-typing-animation";
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { TypeAnimation } from 'react-type-animation';

import RightArrow from "@public/images/svgs/right-arrow.svg";
import UserImage from "@public/images/svgs/user.svg";
import Mic from "@public/images/svgs/microphone.svg";
import Suggestion from "@public/images/svgs/suggestion-arrow.svg";
import BotIcon from "@public/images/svgs/purple-icon.svg";

import GraphCom from '@components/GraphCom';
import AboutCompany from '@components/AboutCompany';
import TopChemicalCompanies from '@components/TopChemicalCompanies';
import Slider from '@components/Slider';
import { timeConverter } from '@utils/timeConverter';
import { httpPost } from '@utils/httpClient';
import { URLS } from 'constants/appUrls';
import { APPCONSTANTS } from 'constants/AppConstant';
import { COLORS } from 'constants/appColors';

import styles from "./styles.module.scss";

const Input = () => {
    const router = useRouter();
    const profileValue = router.query.profile;
    const { demo } = router.query;
    const time = timeConverter();

    const [messages, setMessages] = useState([
        {
            text: APPCONSTANTS.INITIAL_TEXT,
            sender: "bot",
            chartType: "",
            chartData: "",
            dataType: "",
            title: "",
            graph: false,
            input: "",
            chart: "",
            time,
            companyInfo: null,
            companies: null,
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
    const chatWindowRef = useRef(null);

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

    // On Enter handling
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // For sending messages
    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;
        const userTime = timeConverter();

        setMessages((prevMessages: any) => {
            const newMessage = {
                text: inputValue,
                sender: 'user',
                time: userTime,
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
            const apiResponse = await
                httpPost(`${URLS.API_URL}/execute?query=${value}&profile=${profileValue || "1"}&demo=${demo || "1"}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
            if (apiResponse.data !== null || apiResponse.data !== undefined) {
                setData(apiResponse);
                const currentime = timeConverter();

                setMessages((prevMessages: any) => {
                    const botResponse = {
                        text: apiResponse.data?.response,
                        sender: 'bot',
                        chartType: apiResponse.data?.chart?.chartType,
                        chartData: apiResponse.data?.chart?.chartData,
                        dataType: apiResponse.data?.chart?.dataType,
                        title: apiResponse.data?.chart?.title,
                        input: apiResponse.data?.inputs,
                        time: currentime,
                        companyInfo: apiResponse.data?.companyInfo,
                        companies: apiResponse.data?.companies,
                        chart: apiResponse.data?.chart
                    };
                    return [...prevMessages.slice(0, -1), botResponse];
                });
            }
            if (apiResponse.data === null || apiResponse.data === undefined) {
                setErrorMessage(apiResponse.message || apiResponse.Message);
                setError(true)
            }
        }
        catch (e) {
            setErrorMessage(e.message || e.Message);
            setError(true)
        }
    };

    // For suggestion click handler
    const handleSuggestion = async (event: any, valueOfSlider?: any) => {
        if (suggestionClick) {
            null
            return
        }
        let value;
        if (event?.target?.textContent === undefined || event === "") {
            value = valueOfSlider;
        }
        else {
            value = event?.target?.textContent;
        }

        setSuggestionClick(true)
        const userTime = timeConverter();
        setMessages((prevMessages: any) => {
            const newMessage = {
                text: decodeURIComponent(value),
                sender: 'user',
                time: userTime,
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
        value = typeof value === "number" ? value : value?.includes(" ") ? encodeURIComponent(value) : value;
        try {
            const apiResponse = await
                httpPost(`${URLS.API_URL}/execute?query=${value}&profile=${profileValue || "1"}&demo=${demo || "1"}${apiData.data ? `&request_id=${apiData.data.request_id}` : ""}`);
            if (apiResponse.data !== null || apiResponse.Data !== null) {
                setData(apiResponse);
                const currentime = timeConverter();
                setMessages((prevMessages) => {
                    const botResponse = {
                        text: apiResponse.data?.response,
                        sender: 'bot',
                        chartType: apiResponse.data?.chart?.chartType,
                        chartData: apiResponse.data?.chart?.chartData,
                        dataType: apiResponse.data?.chart?.dataType,
                        title: apiResponse.data?.chart?.title,
                        input: apiResponse.data?.inputs,
                        time: currentime,
                        companyInfo: apiResponse.data?.companyInfo,
                        companies: apiResponse.data?.companies,
                        chart: apiResponse.data?.chart
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

    // For mic support
    const toggleSpeechRecognition = () => {
        if (isListening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setIsListening(!isListening);
    };

    useEffect(() => {
        if (!typingText && inputRef.current) {
            inputRef.current.focus();
        }
    }, [typingText]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.container}>
            <div className={styles.chat} ref={chatWindowRef}>
                {messages.map((message: any, index: any) => (
                    <div key={index}>
                        {message.text !== APPCONSTANTS.INITIAL_TEXT && <>
                            <p className={styles.timeUser}>{message.sender === "user" && message.time}</p>
                            <div className={styles.userContainer}>
                                {message.sender === "user" && <div className={message.component ? styles.displayNone : styles.userIcon}>
                                    <UserImage width={32} height={32} />
                                </div>}
                                <div className={message.sender === "user" && message.text ? styles.user : styles.displayNone}>
                                    {message.text}
                                </div>
                            </div>
                        </>}
                        {message.sender === "bot" &&
                            <div className={styles.botReply}>
                                <p className={styles.time}>AI Assistant {message.time}</p>
                                <div className={styles.messageContainer}>
                                    <div className={message.component ? styles.displayNone : styles.botIcon}>
                                        <BotIcon />
                                    </div>
                                    <div style={{ alignSelf: "center" }}>
                                        {(((message.chartType === "pie" || message.chartType === "bar") &&
                                            (message.chartData !== null || message.chartData.length !== 0))
                                            || ((message.chartType === "line" || message.chartType === "line chart")
                                                && (message.chartData !== null
                                                    || message.chartData.length !== 0)))
                                            && (message?.chart !== "null" || message?.chart !== null) &&
                                            <div className={message.component
                                                ? styles.typing : styles.bot} style={{
                                                    marginBottom: "5px",
                                                    maxWidth: "max-content",
                                                    backgroundColor: `${message?.chartType === "pie" ? "" : COLORS.SNOW1}`,
                                                    paddingBottom: `${message?.chartType === "pie" ? "16px" : "26px"}`
                                                }}>
                                                <GraphCom type={message?.chartType === "pie" ? "pie" : message?.chartType === "bar" ? "bar" : "line"}
                                                    data={message?.chartData}
                                                    dataType={message?.dataType}
                                                    title={message?.title} />
                                            </div>}
                                        {message?.companyInfo !== null &&
                                            <AboutCompany data={message?.companyInfo} />}
                                        <div className={message.component ? styles.typing : (message?.companyInfo !== null && message?.companyInfo !== "null") ? styles.displayNone : styles.bot}>
                                            {message.component ? message.component : <>
                                                <Typing wrapper="span" speed={20} onFinishedTyping={() => {
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
                                                {(message.companies !== null || message.companies?.length > 0)
                                                    && message.graph
                                                    && <TopChemicalCompanies data={message?.companies} />}
                                            </>}
                                        </div>
                                    </div>
                                </div>

                                {(apiData.data?.slider !== null && apiData.data?.slider !== undefined && apiData.data?.slider !== "null")
                                    && (message.input?.length === 0 || (typeof message.input === "string"))
                                    && graphCom && (index === messages.length - 1) &&
                                    <div className={styles.sliderContainer}>
                                        <Slider
                                            current={apiData?.data?.slider?.current}
                                            max={apiData?.data?.slider?.max}
                                            min={apiData?.data?.slider?.min}
                                            type={apiData?.data?.slider?.type}
                                            onClick={handleSuggestion}
                                        />
                                    </div>
                                }

                                {apiData.data?.suggestions?.length > 0 && (message.input?.length === 0 || (typeof message.input === "string"))
                                    && graphCom && (index === messages.length - 1) &&
                                    <div className={styles.suggestionsContainer}>
                                        {apiData.data?.suggestions?.map((item: any) =>
                                            <p className={styles.suggestion}
                                                onClick={(e) => handleSuggestion(e)}
                                                aria-hidden><div><Suggestion /></div>{item}</p>)}
                                    </div>
                                }
                                {message.input?.length > 0
                                    && graphCom && (index === messages.length - 1) && (typeof message.input !== "string") &&
                                    <div className={cx(styles.suggestionsContainer)}>
                                        {message.input?.map((item: any) =>
                                            <p className={cx(styles.suggestion)}
                                                onClick={(e) => handleSuggestion(e)} aria-hidden>{item}</p>)}
                                    </div>
                                }
                            </div>}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                {error && <p className={styles.error}>{errorMessage || "Try Again!!! "}
                    <span onClick={() => window.location.reload()} style={{ cursor: "pointer" }} aria-hidden>↺</span></p>}
                {!error &&
                    <>
                        <div className={styles.inputMicContainer} onClick={() => setTypingText(false)} aria-hidden>
                            {typingText && <TypeAnimation
                                sequence={APPCONSTANTS.INPUT_DATA}
                                wrapper="span"
                                speed={20}
                                repeat={Infinity}
                                className={styles.typeAnimation}
                            />}
                            {!typingText &&
                                <input
                                    type="text"
                                    placeholder={isListening ? "Speak Now" : "How may I help you?"}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className={isListening ? cx(styles.input, styles.micOn) : styles.input}
                                    onKeyPress={handleKeyPress}
                                    ref={inputRef}
                                />}
                            {!isListening && <div><Mic width={24} height={24} style={{ cursor: "pointer", paddingTop: "2px" }}
                                onClick={toggleSpeechRecognition} /></div>}
                            {isListening && <div style={{ borderRadius: "50%", position: "absolute", right: "32px" }}
                                onClick={toggleSpeechRecognition} aria-hidden>
                                <ReactPlayer
                                    url='videos/mic.mp4'
                                    width="40px"
                                    height="40px"
                                    loop
                                    playing
                                    muted
                                    playsinline />
                            </div>}
                            {!isListening && <button type="button" onClick={handleSendMessage} className={styles.button}>
                                <RightArrow />
                            </button>}
                        </div>

                    </>}
            </div>
        </div>
    );
};

export default Input;
