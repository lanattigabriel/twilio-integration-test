const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Test',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491133871991'
    })
    .then(message => console.log(message.sid))
