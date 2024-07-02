import './App.css';
import Chat from './Chat.js'; 
import PdfChat from './Pdfdisp.js';
import Sidebar from './Sidebar.js'
import React, { useState } from 'react';


function App() {

  const [pdfText, setPdfText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [initialResponse,setInitialResponse]=useState('');


    const handlePdfText = (text) => {
        setPdfText(text);
    };




  return (
    <>
      <div className="main-div">
        <Sidebar chatHistory={chatHistory}/>
        <PdfChat onPdfText={handlePdfText} setInitialResponse={setInitialResponse} chatHistory={chatHistory}/>
        <Chat pdfText={pdfText} chatHistory={chatHistory} setChatHistory={setChatHistory} initialResponse={initialResponse} />
      </div>
    </>
  );
}

export default App;
