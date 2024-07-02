import React, { useState, useEffect } from 'react';
import './Pdfdisp.css';
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import axios from 'axios';

function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => prevText + text[index]);
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 40); // Adjust the speed of typing by changing the interval duration
    return () => clearInterval(intervalId);
  }, [text]);

  return <div className="typewriter-text">{displayText}</div>;
}

function PdfChat({setInitialResponse,chatHistory}) {
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async (files) => {
    if (files.length > 0) {
      const input = files[files.length-1].fileUrl;
      console.log(input);
      setUploadedFileUrl(input);
  
      try {
        setIsLoading(true);
        const data = {
          "url": input,
          "inline": true,
          "async": false
        };
  
        const response = await axios.post('https://api.pdf.co/v1/pdf/convert/to/text-simple', data, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'shanayshukla.7642@gmail.com_Ouwsgk7QtJIm9X5cklJM6kA1zYwiV1e7flAyxTtum913usLs3f4Z52Lq1uv9vu4R'
          }
        });
  
        if (response.status === 200 && response.data && response.data.body) {
          const extractedText = response.data.body;
          console.log('Extracted text:', extractedText);
          const instruction = `ONLY ANSWER QUESTIONS RELATED TO THE FOLLOWING PDF CONTENT: ${extractedText}`;
          const message='GIVE 4 QESTIONS THAT THE USER SHOULD ASK YOU FROM THE DOC GIVEN';
          // console.log('Instruction:', instruction);
          setExtractedText(extractedText);
  
          const options = {
            method: 'POST',
            body: JSON.stringify({ message:message,instruction:instruction,chatHistory:chatHistory}),
            headers: {
              'Content-Type': 'application/json'
            }
          };
  
          try {
            const response = await fetch('http://localhost:8000/gemini/system', options);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            } else {
              const data = await response.json();
              setInitialResponse(data.initialResponse);  // Update initial response
            }
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        } else {
          console.error('Error: Invalid response received from the API');
        }
      } catch (error) {
        console.error('Error fetching PDF text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pdf-div">
      <div className="main-heading">
        Talk To PDF Application
      </div>
      <UploadDropzone
        uploader={Uploader({ apiKey: "public_W142ifRGLpJgfgvwuetqW7YKRptZ"})}
        options={{ multi: true }}
        onUpdate={handleComplete}
        width="450px"
        height="375px"
      />
    </div>
  );
}

export default PdfChat;
