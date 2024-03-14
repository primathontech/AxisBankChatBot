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
import { URLS } from 'constants/appUrls';
import ReactPlayer from 'react-player';
import AboutCompany from '@components/AboutCompany';
import TopChemicalCompanies from '@components/TopChemicalCompanies';
import RightArrow from "../../public/images/svgs/right-arrow.svg";
import UserImage from "../../public/images/svgs/user.svg";
import Mic from "../../public/images/svgs/microphone.svg";
import Suggestion from "../../public/images/svgs/suggestion-arrow.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";
import Slider from '@components/Slider';
import { COLORS } from 'constants/appColors';
import styles from "./styles.module.scss";


const Input = () => {
    const router = useRouter();
    const profileValue = router.query.profile;
    const { demo } = router.query;
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    time = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;

    const [messages, setMessages] = useState([
        {
            text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How may I help you?",
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
        let userTime = new Date();
        let hours = userTime.getHours();
        let minutes = userTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        userTime = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;
        setMessages((prevMessages) => {
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
                let currentime = new Date();
                let hours = currentime.getHours();
                let minutes = currentime.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12;

                currentime = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;
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

    const handleSuggestion = async (event, valueOfSlider?: any) => {
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
        let userTime = new Date();
        let hours = userTime.getHours();
        let minutes = userTime.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        userTime = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;
        setMessages((prevMessages) => {
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
                let currentime = new Date();
                let hours = currentime.getHours();
                let minutes = currentime.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12;

                currentime = `${hours}:${minutes <= 9 ? `0${minutes}` : minutes} ${ampm}`;
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

    const toggleSpeechRecognition = () => {
        if (isListening) {
            recognition.current.stop();
        } else {
            recognition.current.start();
        }
        setIsListening(!isListening);
    };

    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ paddingTop: "10px", position: "fixed", bottom: 20, width: "100%" }}>
            <div className={styles.chat} ref={chatWindowRef}>
                <div>
                    {messages.map((message: any, index: any) => (
                        <div key={index}>
                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How may I help you?" && <>
                                <p className={styles.timeUser}>{message.sender === "user" && message.time}</p>
                                <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: '24px' }}>
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
                                                        || message.chartData.length !== 0))) && (message?.chart !== "null" || message?.chart !== null) &&
                                                <div className={message.component
                                                    ? styles.typing : styles.bot} style={{
                                                        marginBottom: "5px",
                                                        maxWidth: `${message?.chartType === "pie" ? "max-content" : "max-content"}`,
                                                        backgroundColor: `${message?.chartType === "pie" ? "" : COLORS.SNOW1}`,
                                                        paddingBottom: `${message?.chartType === "pie" ? "16px" : "26px"}`
                                                    }}>
                                                    <GraphCom type={message?.chartType === "pie" ? "pie" : message?.chartType === "bar" ? "bar" : "line"}
                                                        data={message?.chartData}
                                                        dataType={message?.dataType}
                                                        title={message?.title} />
                                                </div>}
                                            {message?.companyInfo !== null && <AboutCompany data={message?.companyInfo} />}
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
                                                    {(message.companies !== null || message.companies?.length > 0) && message.graph
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
            </div>
            <div className={styles.inputContainer}>
                {error && <p className={styles.error}>{errorMessage || "Try Again!!! "}
                    <span onClick={() => window.location.reload()} style={{ cursor: "pointer" }} aria-hidden>↺</span></p>}
                {!error &&
                    <>
                        <div className={styles.inputMicContainer} onClick={() => setTypingText(false)} aria-hidden>
                            {typingText && <TypeAnimation
                                sequence={[
                                    "I have 10L, what should I do with it",
                                    1000,
                                    "I want to make wealth",
                                    1000,
                                    "Can I buy a Mercedes?",
                                    1000,
                                    "Should I save for emergency fund?",
                                    2000,
                                    "I want to travel the world, how much would I need?",
                                    2000,
                                    "I have my child’s post graduation in 5 years and he wants to study in US",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={20}
                                repeat={Infinity}
                                style={{
                                    flex: "auto", fontSize: "14px",
                                    color: COLORS.SONIC_SILVER,
                                    fontFamily: "Lato",
                                    fontWeight: 400
                                }}
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
                            {!isListening && <div><Mic width={24} height={24} style={{ cursor: "pointer", paddingTop: "2px" }} onClick={toggleSpeechRecognition} /></div>}
                            {isListening && <div style={{ borderRadius: "50%", position: "absolute", right: "32px" }} onClick={toggleSpeechRecognition} aria-hidden>
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
