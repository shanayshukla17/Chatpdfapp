# PDF Chat Application

PDF Chat Application is a web-based tool that allows users to upload PDF documents and interact with the content through a chat interface. The application extracts text from the uploaded PDFs and uses AI to generate responses based on the content.

## Features

- Upload PDF documents and extract text content
- Interact with the PDF content via a chat interface
- AI-generated responses based on the PDF content
- Suggested questions based on the uploaded PDF
- Real-time chat history with structured responses

## Technologies Used

- React
- Node.js
- Express.js
- Google Generative AI
- PDF.co API
- Axios
- Fetch API
- React Reveal (for animations)

## Prerequisites

- Node.js and npm installed on your machine
- PDF.co API key
- Google Generative AI API key

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/pdf-chat-application.git
   cd pdf-chat-application

2. **Install server dependencies:**

   cd ../client
   npm install


3. **Create a .env file in the server directory and add your API keys:**
   
   GOOGLE_GEN_AI_KEY=your-google-gen-ai-key
   PDF_CO_API_KEY=your-pdf-co-api-key


4. **Start the server:**
   cd server
   npm start

5. **Start the client:**
   cd ../client
   npm start

Usage
Open the application in your browser at http://localhost:3000.
Upload a PDF document using the upload area.
Interact with the chat interface to ask questions about the PDF content.
View suggested questions and AI-generated responses based on the uploaded PDF.


Project Structure

pdf-chat-application/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PdfDisp.js
│   │   │   ├── Chat.js
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│   └── README.md
├── server/
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── README.md
└── README.md


Code Overview
PdfDisp.js
Handles PDF file uploads and extracts text content using the PDF.co API.

Chat.js
Displays the chat interface, processes user input, and shows AI-generated responses.

index.js (Server)
Sets up the Express server, handles API requests, and integrates with Google Generative AI.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.


For any questions or suggestions, please contact [shanayshukla.7642@gmail.com].





