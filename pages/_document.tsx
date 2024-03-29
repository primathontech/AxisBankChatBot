/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@100..900&display=swap&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
                    <title>AxisChatBot</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                    <meta property="og:title" content="AxisChatBot" />
                    <meta property="og:url" content="https://axis-chatbot.primathontech.co.in/" />
                    <link rel="canonical" href="https://axis-chatbot.primathontech.co.in/"/>
                    <meta name="description" content="AxisChatBot is a free-to-use AI system for investment purpose. Use it for engaging conversations, gain insights, automate tasks, and witness the future of AI, all in one place." />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
