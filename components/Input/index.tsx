/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef } from 'react';
import Typinganimation from '@components/TypingAnimation';
import RightArrow from "../../public/images/svgs/right-arrow.svg";
import Mic from "../../public/images/svgs/microphone.svg";
import BotIcon from "../../public/images/svgs/purple-icon.svg";
import Typing from "react-typing-animation";
import styles from "./styles.module.scss";
import GraphCom from '@components/GraphCom';

const Input = () => {
    const [messages, setMessages] = useState([{ text: "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?", sender: "bot" }]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [graphCom, setgraphCom] = useState(false);
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

        setgraphCom(false);


        setTimeout(() => {
            setMessages((prevMessages) => {
                const botResponse = {
                    text: `I received: ${inputValue}`,
                    sender: 'bot',
                };
                return [...prevMessages.slice(0, -1), botResponse];
            });
            setgraphCom(true);
        }, 5000);
    };

    const handleSuggestion = (event) => {
        if(suggestionClick){
            return
        }
        const value = event.target.textContent;
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


        setTimeout(() => {
            setMessages((prevMessages) => {
                const botResponse = {
                    text: `I received: ${value}`,
                    sender: 'bot',
                };
                return [...prevMessages.slice(0, -1), botResponse];
            });
            setgraphCom(true);
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
                                            {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" && graphCom &&
                                                <div div className={message.component ? styles.typing : styles.bot} style={{ marginTop: "5px" }}>
                                                    <GraphCom />
                                                </div>}
                                        </div>
                                    </div>
                                    {message.text !== "Hello, I’m AxisBot! 👋 I’m your personal AI assistant. How can I help you?" &&
                                        <div className={styles.suggestionsContainer}>
                                            <p className={suggestionClick ? styles.clickedSuggestions : styles.suggestion} onClick={(e) => handleSuggestion(e)}>ABC</p>
                                            <p className={suggestionClick ? styles.clickedSuggestions : styles.suggestion} onClick={(e) => handleSuggestion(e)}>EFG</p>
                                            <p className={suggestionClick ? styles.clickedSuggestions : styles.suggestion} onClick={(e) => handleSuggestion(e)}>XYZ</p>
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
