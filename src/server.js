const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

let model;

app.post('/gemini/system', async (req, res) => {
  const instruction = req.body.instruction;
  console.log('Received system instruction:', instruction);  // This should log to the console

  model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: instruction
  });

  const chatting = model.startChat({ history: req.body.chatHistory });
  const msg = req.body.message;
  const result = await chatting.sendMessage(msg);
  const response = await result.response;
  const data = await response.text();
  
  res.send({ initialResponse: data });  // Send initial response as an object
});


app.post('/gemini', async (req, res) => {
  if (!model) {
    return res.status(500).send('Model not initialized');
  }

  const chat = model.startChat({ history: req.body.history });
  const msg = req.body.message;

  const result = await chat.sendMessage(msg);
  const responseText = await result.response;
  const text = await responseText.text();

  res.send(text);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
