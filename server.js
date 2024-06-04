const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST'], // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Webhook endpoint for Twilio
app.post('/whatsapp', async (req, res) => {
  const { Body, From } = req.body;
  
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: Body,
      max_tokens: 150,
    });

    const message = response.data.choices[0].text.trim();

    await twilioClient.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
      to: From,
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error: ', error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
