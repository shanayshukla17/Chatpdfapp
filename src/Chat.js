import React, { useState } from 'react';
import Zoom from 'react-reveal/Zoom';
import './Chat.css';

function Chat({ pdfText, chatHistory ,setChatHistory,initialResponse}) {
    const [inputValue, setInputValue] = useState('');
    // const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const parseResponseText = (text) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('**')) {
                return <h2 key={index}>{line.substring(2).trim()}</h2>; // Heading
            } else if (line.startsWith('*')) {
                return <h3 key={index}>{line.substring(1).trim()}</h3>; // Subheading
            } else {
                return <p key={index}>{line.trim()}</p>; // Normal text
            }
        });
    };

    const handleClick = async () => {
        console.log("Input value: ", inputValue);
        const msg = inputValue;
        const options = {
            method: 'POST',
            body: JSON.stringify({
                history: chatHistory,
                message: msg,
               // instruction: pdfText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch('http://localhost:8000/gemini', options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            console.log(data);
            setChatHistory(prevChatHistory => [...prevChatHistory, { role: "user", parts: [{ text: inputValue }] }, { role: "model", parts: [{ text: data }] }]);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }

        setInputValue("");
    };

    return (
        <div className="main_chat">
            <div className="chat-box">
                <div className="chat-show">
                {initialResponse ? <div className='chat-message model'><span>{parseResponseText(initialResponse)}</span></div> : null}

                    {chatHistory.map((entry, index) => (
                        <Zoom key={index}>
                            <div className={`chat-message ${entry.role}`}>
                                {entry.parts.map((part, partIndex) => (
                                    <span key={partIndex}>{parseResponseText(part.text)}</span>
                                ))}
                            </div>
                        </Zoom>
                    ))}
                </div>
                <div className="input_div">
                    <input
                        className="input_field"
                        value={inputValue}
                        placeholder='Hey tell me something about the PDF'
                        onChange={handleInputChange}
                    />
                    <button className="arrow" onClick={handleClick}>
                        <img src="/send.png" alt='Here' />
                    </button>
                </div>
            </div>
            {/* Display response text with proper headings */}
            <div className="chat-response">
                {parseResponseText(pdfText)}
            </div>
        </div>
    );
}

export default Chat;
